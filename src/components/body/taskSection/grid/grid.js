import React from "react";
import "./grid.css";
import { TableHeader } from "./tableHeader/tableHeader";
import { Tasks } from "./tasks/tasks";

/* Contenido referente a la tabla del listado de tareas */
export const Grid = (props) => {
  return (
    <div id="grid">
      <TableHeader
        isSemesterViewActive={props.isSemesterViewActive}
        enrollmentYear={props.currentEnrollment.year}
        enrollmentSemester={props.currentEnrollment.semester}
        onChange={props.onChange}
      />
      <Tasks
        visibleMonths={props.visibleMonths}
        visibleSubjects={props.visibleSubjects}
        visibleTaskStatus={props.visibleTaskStatus}
        classrooms={props.currentEnrollment.classrooms}
      />
    </div>
  );
};
