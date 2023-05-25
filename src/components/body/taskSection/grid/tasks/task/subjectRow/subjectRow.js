import React from "react";
import { getFormattedDate, checkInitialState } from "../task";
import { IconTray } from "../iconTray/iconTray";

export const Subject = ({ info, status, onChange }) => {
    return (
        <div className={status + " subject"}>
            <div className="text-tray">
                <input
                    title="Marcar como completada"
                    type="checkbox"
                    defaultChecked={checkInitialState(info.status)}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <a title="Ir a la página de la asignatura" className="bolder">
                    {info.subjectName}
                </a>
            </div>
            <IconTray success={0} working={0} estimated={info.estimatedHours} />
        </div>
    );
};

export const TaskDate = ({ date, status }) => {
    let formattedDate = getFormattedDate(date);
    return <div className={`task-date ${status}`}>{formattedDate}</div>;
};

export const TaskName = ({ title, status }) => {
    return (
        <div className={`task-name ${status}`}>
            <a className="bolder">{title}</a>
        </div>
    );
};
