import React, { useState, useEffect } from "react";
import { IconTray } from "../iconTray/iconTray";
import { checkInitialState, getFormattedDate } from "../task";

export const Subtasks = (props) => {
    const final = [];

    for (let subtask in props.session.subtaskArray) {
        final.push(
            <li key={props.session.subtaskArray[subtask].id}>
                <Subtask
                    session={{
                        username: props.session.username,
                        year: props.session.year,
                        semester: props.session.semester,
                        subtask: props.session.subtaskArray[subtask],
                        taskState: props.session.taskState,
                        enrolledStudents: props.session.enrolledStudents
                    }}
                />
            </li>
        );
    }

    return (
        <>
            <ul style={{ listStyleType: "none", paddingLeft: "0" }}>{final}</ul>
        </>
    );
};

export const SubtaskHeader = () => {
    return (
        <>
            <div className="subtask-date-title">Fecha recom.</div>
            <div className={"subtask-title"}>Subtareas</div>
        </>
    );
};

const Subtask = (props) => {
    const [status, setStatus] = useState(
        props.session.taskState === "completed" ? props.session.taskState : props.session.subtask.status
    );
    const [checked, setChecked] = useState(checkInitialState(status));
    const [isDisabled, setDisabled] = useState(checkIfTaskIsCompleted(props.session.taskState));
    const [studentsWorkingOnSubtask, setStudentsWorkingOnSubtask] = useState(0);
    const [studentsCompletingSubtask, setStudentsCompletingSubtask] = useState(0);
    const [successRate, setSuccessRate] = useState(0);
    const [workingRate, setWorkingRate] = useState(0);
    const incrementRate = 1 / props.session.enrolledStudents;

    // Percentage calculation.
    const handleChange = (value) => {
        setChecked(value);
        
        if (value === true) {
            setStatus("completed");
            props.session.subtask.status = "completed";
            updateSubtask(props.session);
            setSuccessRate(successRate + incrementRate);
            setWorkingRate(workingRate - incrementRate);
            // props.session.subtask.successRate += incrementRate;
            // props.session.subtask.workingRate -= incrementRate;
            return;
        }
        setStatus("pending");
        props.session.subtask.status = "pending";
        updateSubtask(props.session);
        setSuccessRate(successRate - incrementRate);
        setWorkingRate(workingRate + incrementRate);
        // props.session.subtask.successRate -= incrementRate;
        // props.session.subtask.workingRate += incrementRate;
    };

    // Cuando cambia el taskState o el status de la propia subtarea.
    useEffect(() => {
        if (props.session.taskState === "completed") {
            setStatus("completed");
            setChecked(true);
            setDisabled(true);
            return;
        }
        setStatus(props.session.subtask.status);
        setChecked(props.session.subtask.status === "completed" ? true : false);
        setDisabled(false);
    }, [props.session.taskState, props.session.subtask.status]);

    /* Cuando cambia la fecha de la subtarea. */
    useEffect(() => {
        const currentDate = new Date();
        const taskDate = new Date(props.session.subtask.date);

        if (taskDate < currentDate && status !== "completed") {
            setStatus("uncompleted");
        }
    }, [props.session.subtask.date, status]);

    // Loading percentages when the component is rendered.
    useEffect(() => {
        const getStudentsWorkingOnSubtask = async (subtask) => {
            fetch(
                `/users/studentsWorkingOnSubtask/${subtask.year}/${subtask.semester}/${subtask.subtaskId}`
            ).then(res => res.json()).then((data) => {
                setStudentsWorkingOnSubtask(data.total);
                setStudentsCompletingSubtask(props.session.enrolledStudents - studentsWorkingOnSubtask);
                setSuccessRate(studentsCompletingSubtask / props.session.enrolledStudents);
                setWorkingRate(studentsWorkingOnSubtask / props.session.enrolledStudents);
                // console.log(subtask);
                // console.log(data.total);
            });
            
        }

        const getpercentages = async () => {
            const subtask = {
                year: props.session.year,
                semester: props.session.semester,
                subtaskId: props.session.subtask.subtaskId
            }

            getStudentsWorkingOnSubtask(subtask);
        }
        getpercentages();
        
    }, [props.session.enrolledStudents,
        props.session.semester,
        props.session.year,
        props.session.subtask.subtaskId,
        successRate,
        workingRate,
        studentsWorkingOnSubtask,
        studentsCompletingSubtask]);

    /* Renderizamos el componente. */
    return (
        <div className="subtask-info">
            <SubtaskDate status={status} date={props.session.subtask.date} />
            <div className={status + " subtask"}>
                <input
                    title="Marcar como completada"
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => handleChange(e.target.checked)}
                    disabled={isDisabled}
                />
                <a title="Ver detalles de la tarea" className="bolder">
                    {props.session.subtask.name}
                </a>
                <IconTray
                    success={successRate}
                    working={workingRate}
                    estimated={props.session.subtask.estimatedHours}
                />
            </div>
        </div>
    );
};

const SubtaskDate = ({ status, date }) => {
    let formattedDate = getFormattedDate(date);
    return <div className={status + " subtask-date"}>{formattedDate}</div>;
};

const checkIfTaskIsCompleted = (taskState) => {
    return taskState === "completed" ? true : false;
};

const updateSubtask = async (session) => {
    const res = await fetch(`/users/${session.username}/updateSubtask`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(session.subtask),
    });

    if (!res.ok) {
        console.error("an error has occurred:", res.status, res.statusText);
    }
};
