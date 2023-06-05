import React from "react";
import { getFormattedDate, checkInitialState } from "../task";
import { IconTray } from "../iconTray/iconTray";

export const Subject = (props) => {
    return (
        <div className={props.status + " subject"}>
            <div className="text-tray">
                <input
                    title="Marcar como completada"
                    type="checkbox"
                    defaultChecked={checkInitialState(props.task.status)}
                    onChange={(e) => props.onChange(e.target.checked)}
                />
                <a title="Ir a la página de la asignatura" className="bolder">
                    {props.task.subjectName}
                </a>
            </div>
            <IconTray success={props.rates.successRate} working={props.rates.workingRate} estimated={props.task.estimatedHours} />
        </div>
    );
};

export const TaskDate = (props) => {
    let formattedDate = getFormattedDate(props.date);
    return <div className={`task-date ${props.status}`}>{formattedDate}</div>;
};

export const TaskName = (props) => {
    return (
        <div className={`task-name ${props.status}`}>
            <a className="bolder">{props.title}</a>
        </div>
    );
};
