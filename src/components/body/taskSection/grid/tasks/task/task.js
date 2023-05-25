import React, { useState, useEffect } from "react";
import { TaskHeader } from "./taskHeader/taskHeader";
import { Subtasks, SubtaskHeader } from "./subtask/subtask";
import { Subject, TaskName, TaskDate } from "./subjectRow/subjectRow";

/* Código referente a la información de las unidades de tarea */

export const Task = (props) => {
    const [status, setStatus] = useState(props.info.status);
    const [visibility, setVisibility] = useState("block"); // Block o none.
    const taskDate = new Date(props.info.date);

    // Comprueba si la tarea está pasada de plazo.
    useEffect(() => {
        const currentDate = new Date();

        if (taskDate < currentDate && status !== "completed") {
            setStatus("uncompleted");
        }
    }, [props.info.date, status]);

    /* Comprueba si se debería mostrar la tarea en base a las asignaturas
    visibles. */
    useEffect(() => {
        if (
            props.visibleSubjects.filter(
                (item) => item === props.info.subjectId
            )[0] === undefined
        ) {
            setVisibility("none");
            return;
        } else {
            setVisibility("block");
        }

        if (
            props.visibleTaskStatus.filter((item) => item === status)[0] === undefined
        ) {
            setVisibility("none");
            return;
        } else {
            setVisibility("block");
        }

        if (
            props.visibleMonths.filter(
                (item) => item === taskDate.getMonth() + 1
            )[0] === undefined
        ) {
            setVisibility("none");
            return;
        } else {
            setVisibility("block");
        }
    }, [
        props.visibleSubjects,
        props.visibleTaskStatus,
        props.visibleMonths,
        props.info.subjectId,
        status,
    ]);

    const handleChange = (checked) => {
        const enrolledStudents = props.info.enrolledStudents;
        const incrementRate = 1 / enrolledStudents;

        if (checked === true) {
            setStatus("completed");
            props.info.status = "completed";
            updateTask(props.info);
            props.info.successRate += incrementRate;
            props.info.workingRate -= incrementRate;
            props.info.subtasks.forEach((item) => {
                if (item.status !== "completed") {
                    item.successRate += incrementRate;
                    item.workingRate -= incrementRate;
                }
            });
            return;
        }

        setStatus("pending");
        props.info.status = "pending";
        updateTask(props.info);
        if (props.info.successRate > 0) {
            props.info.successRate -= incrementRate;
            props.info.workingRate += incrementRate;
            props.info.subtasks.forEach((item) => {
                if (item.status !== "completed") {
                    item.successRate -= incrementRate;
                    item.workingRate += incrementRate;
                }
            });
        }
    };

    /* Renderizamos el componente. */
    return (
        <div style={{ display: visibility }}>
            <TaskHeader />
            <div className="task">
                <TaskDate date={props.info.date} status={status} />
                <div className="task-info">
                    <Subject
                        info={props.info}
                        status={status}
                        onChange={(value) => handleChange(value)}
                    />
                    <TaskName title={props.info.taskName} status={status} />
                    <div className="subtask-header">
                        <SubtaskHeader />
                    </div>
                    <div className="subtask-container">
                        <Subtasks
                            subtaskArray={props.info.subtasks}
                            taskState={status}
                            enrolledStudents={props.info.enrolledStudents}
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

const updateTask = async (task) => {
    const testUsername = "oakachach";

    const res = await fetch(`/users/${testUsername}/updateTask`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(task),
    });

    if (!res.ok) {
        console.error("an error has occurred:", res.status, res.statusText);
    }
};
