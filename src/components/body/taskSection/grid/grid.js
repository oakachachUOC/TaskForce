import React from "react";
import "./grid.css";
import { TableHeader } from "./tableHeader/tableHeader";
import { Tasks } from "./tasks/tasks";

/* Contenido referente a la tabla del listado de tareas */
export const Grid = (props) => {

  return (
    <div id="grid">
      <TableHeader
        session={{
          isSemesterViewActive: props.session.isSemesterViewActive,
          enrollmentYear: props.session.currentEnrollment.year,
          enrollmentSemester: props.session.currentEnrollment.semester
        }}
        onChange={props.onChange}
      />
      <Tasks
        session={props.session}
      />
    </div>
  );
};
