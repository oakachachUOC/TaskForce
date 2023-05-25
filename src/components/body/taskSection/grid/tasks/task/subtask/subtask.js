import React, { useState, useEffect } from "react";
import { IconTray } from "../iconTray/iconTray";
import { checkInitialState, getFormattedDate } from "../task";

export const Subtasks = ({ subtaskArray, taskState, enrolledStudents }) => {
    const final = [];

    for (let subtask in subtaskArray) {
        final.push(
            <li key={subtaskArray[subtask].id}>
                <Subtask
                    subtaskInfo={subtaskArray[subtask]}
                    taskState={taskState}
                    enrolledStudents={enrolledStudents}
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

const Subtask = ({ subtaskInfo, taskState, enrolledStudents }) => {
    const [status, setStatus] = useState(
        taskState === "completed" ? taskState : subtaskInfo.status
    );
    const [checked, setChecked] = useState(checkInitialState(status));

    const [isDisabled, setDisabled] = useState(checkIfTaskIsCompleted(taskState));

    /* Cuando marcamos o desmarcamos la tarea. */
    const handleChange = (value) => {
        setChecked(value);
        const incrementRate = 1 / enrolledStudents;

        if (value === true) {
            setStatus("completed");
            subtaskInfo.status = "completed";
            updateSubtask(subtaskInfo);
            subtaskInfo.successRate += incrementRate;
            subtaskInfo.workingRate -= incrementRate;
            return;
        }
        setStatus("pending");
        subtaskInfo.status = "pending";
        updateSubtask(subtaskInfo);
        subtaskInfo.successRate -= incrementRate;
        subtaskInfo.workingRate += incrementRate;
    };

    // Cuando cambia el taskState o el status de la propia subtarea.
    useEffect(() => {
        if (taskState === "completed") {
            setStatus("completed");
            setChecked(true);
            setDisabled(true);
            return;
        }
        setStatus(subtaskInfo.status);
        setChecked(subtaskInfo.status === "completed" ? true : false);
        setDisabled(false);
    }, [taskState, subtaskInfo.status]);

    /* Cuando cambia la fecha de la subtarea. */
    useEffect(() => {
        const currentDate = new Date();
        const taskDate = new Date(subtaskInfo.date);

        if (taskDate < currentDate && status !== "completed") {
            setStatus("uncompleted");
        }
    }, [subtaskInfo.date, status]);

    /* Renderizamos el componente. */
    return (
        <div className="subtask-info">
            <SubtaskDate status={status} date={subtaskInfo.date} />
            <div className={status + " subtask"}>
                <input
                    title="Marcar como completada"
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => handleChange(e.target.checked)}
                    disabled={isDisabled}
                />
                <a title="Ver detalles de la tarea" className="bolder">
                    {subtaskInfo.name}
                </a>
                <IconTray
                    success={0}
                    working={0}
                    estimated={subtaskInfo.estimatedHours}
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

const updateSubtask = async (subtask) => {
    const testUsername = "oakachach";

    const res = await fetch(`/users/${testUsername}/updateSubtask`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(subtask),
    });

    if (!res.ok) {
        console.error("an error has occurred:", res.status, res.statusText);
    }
};
