import React from "react";
import {
    Checkmark,
    Stopwatch,
    Time,
    Help,
} from "../../../../../../images/images";

/* Código referente al listado de iconos de cada tarea */

export const IconTray = ({ success, working, estimated }) => {
    return (
        <div className="icon-tray">
            <span
                title="Porcentaje de alumnos que han superado la tarea"
                className="icon-tray-element"
            >
                <Checkmark />
                <p>{`${Math.round(success * 100)}%`}</p>
            </span>
            <span
                title="Porcentaje de alumnos que están trabajando en la tarea"
                className="icon-tray-element"
            >
                <Stopwatch />
                <p>{`${Math.round(working * 100)}%`}</p>
            </span>
            <span
                title="Tiempo estimado para completar la tarea"
                className="icon-tray-element"
            >
                <Time />
                <p>{`${estimated}h.`}</p>
            </span>
            <span title="Pedir ayuda" className="icon-tray-element">
                <a>
                    <Help />
                </a>
            </span>
        </div>
    );
};
