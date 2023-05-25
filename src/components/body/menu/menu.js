import React from "react";
import { TaskStatusList } from "./taskStatusList/taskStatusList";
import { SubjectList } from "./subjectList/subjectList";
import "./menu.css";

/* Código referente a la sección de asignaturas de la página */

export const Menu = (props) => {
    return (
        <section id="seccion-asignaturas">
            <AulasAnteriores />
            <div id="asignaturas">
                <h4>Asignaturas y estados</h4>
                <SubjectList classrooms={props.classrooms} onChange={props.onChange} />
            </div>
            <TaskStatusList onChange={props.onChange} />
        </section>
    );
};

/* Sección de aulas anteriores */
const AulasAnteriores = () => {
    return (
        <div className="center" id="aulas-anteriores">
            <a>Consulta las aulas anteriores</a>
        </div>
    );
};
