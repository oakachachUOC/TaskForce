import React, { useState, useEffect } from "react";
import { TaskHeader } from "./taskHeader/taskHeader";
import { Subtasks, SubtaskHeader } from "./subtask/subtask";
import { Subject, TaskName, TaskDate } from "./subjectRow/subjectRow";

/* Código referente a la información de las unidades de tarea */

export const Task = (props) => {
    const [status, setStatus] = useState(props.session.task.status);
    const [visibility, setVisibility] = useState("block"); // Block o none.
    const [enrolledStudents, setEnrolledStudents] = useState(1);
    const [studentsWorkingOnTask, setStudentsWorkingOnTask] = useState(0);
    const [studentsCompletingTask, setStudentsCompletingTask] = useState(0);
    const [successRate, setSuccessRate] = useState(0);
    const [workingRate, setWorkingRate] = useState(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const taskDate = new Date(props.session.task.date);

    // Out-of-time task checker.
    useEffect(() => {
        const currentDate = new Date();

        if (taskDate < currentDate && status !== "completed") {
            setStatus("uncompleted");
        }
    }, [props.session.task.date, status, taskDate]);

    // Filter and task visibility checks.
    useEffect(() => {
        if (
            props.session.visibleSubjects.filter(
                (item) => item === props.session.task.subjectId
            )[0] === undefined
        ) {
            setVisibility("none");
            return;
        } else {
            setVisibility("block");
        }

        if (
            props.session.visibleTaskStatus.filter((item) => item === status)[0] === undefined
        ) {
            setVisibility("none");
            return;
        } else {
            setVisibility("block");
        }

        if (
            props.session.visibleMonths.filter(
                (item) => item === taskDate.getMonth() + 1
            )[0] === undefined
        ) {
            setVisibility("none");
            return;
        } else {
            setVisibility("block");
        }
    }, [
        props.session.visibleSubjects,
        props.session.visibleTaskStatus,
        props.session.visibleMonths,
        props.session.task.subjectId,
        status,
        taskDate
    ]);

    // Loading percentages when the component is rendered for the first time.
    useEffect(() => {
        const getEnrolledStudents = async (subject) => {
            fetch(
                `/users/enrolledStudents/${subject.year}/${subject.semester}/${subject.subjectId}`
            ).then(res => res.json()).then((data) => {
                setEnrolledStudents(data.total);
            });
        }

        const getStudentsWorkingOnTask = async (task) => {
            fetch(
                `/users/studentsWorkingOnTask/${task.year}/${task.semester}/${task.taskId}`
            ).then(res => res.json()).then((data) => {
                setStudentsWorkingOnTask(data.total);
                setStudentsCompletingTask(enrolledStudents - studentsWorkingOnTask);
                setSuccessRate(studentsCompletingTask / enrolledStudents);
                setWorkingRate(studentsWorkingOnTask / enrolledStudents);
            });           
        }

        const getPercentages = async () => {
            const subject = {
                year: props.session.year,
                semester: props.session.semester,
                subjectId: props.session.task.subjectId
            }
            const task = {
                year: props.session.year,
                semester: props.session.semester,
                taskId: props.session.task.taskId
            }

            await getEnrolledStudents(subject);
            await getStudentsWorkingOnTask(task);
        }

        getPercentages();
    }, [props.session.task, props.session.year, props.session.semester, enrolledStudents, studentsWorkingOnTask, studentsCompletingTask]);

    // TODO: Percentage calculation.
    const handleChange = async (checked) => {
        const incrementRate = 1 / enrolledStudents;

        if (checked === true) {
            setStatus("completed");
            props.session.task.status = "completed";
            await updateTask(props.session);
            setSuccessRate(successRate + incrementRate);
            setWorkingRate(workingRate - incrementRate);

            // props.info.successRate += incrementRate;
            // props.info.workingRate -= incrementRate;
            // props.info.subtasks.forEach((item) => {
            //     if (item.status !== "completed") {
            //         item.successRate += incrementRate;
            //         item.workingRate -= incrementRate;
            //     }
            // });
            return;
        }

        setStatus("pending");
        props.session.task.status = "pending";
        await updateTask(props.session);
        setSuccessRate(successRate - incrementRate);
        setWorkingRate(workingRate + incrementRate);
        // const enrolledStudents = await getEnrolledStudents(props.info);
        // console.log(enrolledStudents);
        // const incrementRate = 1 / enrolledStudents;
        // props.info.successRate = await getSuccessRate(props.info);
        // props.info.workingRate = await getWorkingRate(props.info);

        // if (props.info.successRate > 0) {
        //     props.info.successRate -= incrementRate;
        //     props.info.workingRate += incrementRate;
        //     props.info.subtasks.forEach((item) => {
        //         if (item.status !== "completed") {
        //             item.successRate -= incrementRate;
        //             item.workingRate += incrementRate;
        //         }
        //     });
        // }
    };

    /* Render of the component */
    return (
        <div style={{ display: visibility }}>
            <TaskHeader />
            <div className="task">
                <TaskDate date={props.session.task.date} status={status} />
                <div className="task-info">
                    <Subject
                        task={props.session.task}
                        status={status}
                        rates={{
                            successRate: successRate,
                            workingRate: workingRate
                        }}
                        onChange={(value) => handleChange(value)}
                    />
                    <TaskName title={props.session.task.taskName} status={status} />
                    <div className="subtask-header">
                        <SubtaskHeader />
                    </div>
                    <div className="subtask-container">
                        <Subtasks
                            session={{
                                username: props.session.username,
                                year: props.session.year,
                                semester: props.session.semester,
                                subtaskArray: props.session.task.subtasks,
                                taskState: status,
                                enrolledStudents: enrolledStudents
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getFormattedDate = (date) => {
    let newDate = new Date(date);

    return `${newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate()
        }/${newDate.getMonth() + 1 < 10
            ? "0" + (newDate.getMonth() + 1)
            : newDate.getMonth() + 1
        }/${newDate.getFullYear()}`;
};

export const checkInitialState = (initialStatus) => {
    let checked = false;
    initialStatus === "completed" ? (checked = true) : (checked = false);

    return checked;
};

const updateTask = async (session) => {
    console.log(session.task);

    const res = await fetch(`/users/${session.username}/updateTask`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(session.task),
    });

    if (!res.ok) {
        console.error("an error has occurred:", res.status, res.statusText);
    }
};

const getEnrolledStudents = async (subject) => {
    const response = await fetch(
        `/users/enrolledStudents/${subject.year}/${subject.semester}/${subject.subjectId}`
    );

    try {
        const result = await response.json();
        return result.total;
    } catch {
        return 0;
    }
}

const getStudentsWorkingOnTask = async (task) => {
    const response = await fetch(
        `/users/studentsWorkingOnTask/${task.year}/${task.semester}/${task.taskid}`
    );

    try {
        const result = await response.json();
        return result.total;
    } catch {
        return 0;
    }
}

// const getWorkingRate = async (task) => {
//     return 0;
// }