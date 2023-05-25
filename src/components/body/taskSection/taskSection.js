import React from "react";
import "./taskSection.css";
import { Grid } from "./grid/grid";
import { TaskView } from "./taskView/taskView";

/* Contenido referente a la sección de tareas de la página */

export const TaskSection = (props) => {
    return (
        <section id="seccion-tareas">
            <h1>Tareas</h1>
            <div className="flex-row" id="mensual-semestral">
                <TaskView
                    isSemesterViewActive={props.isSemesterViewActive}
                    onChange={props.onChange}
                />
            </div>
            <Grid
                isSemesterViewActive={props.isSemesterViewActive}
                visibleMonths={props.visibleMonths}
                visibleSubjects={props.visibleSubjects}
                visibleTaskStatus={props.visibleTaskStatus}
                currentEnrollment={props.currentEnrollment}
                onChange={props.onChange}
            />
        </section>
    );
};
