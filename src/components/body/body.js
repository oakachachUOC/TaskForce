import React, { useState } from "react";
import { Menu } from "./menu/menu";
import "./body.css";
import { taskStatusCollection } from "./taskStatusCollection";
import { TaskSection } from "./taskSection/taskSection";

/* Código referente al cuerpo de la página */
export const Body = (props) => {
  const [visibleSubjects, setVisibleSubjects] = useState(
    Object.keys(props.session.currentEnrollment.classrooms).map(
      (item) => props.session.currentEnrollment.classrooms[item].subjectId
    )
  );
  const [visibleTaskStatus, setVisibleTaskStatus] = useState(
    Object.keys(taskStatusCollection)
      .map((item) => taskStatusCollection[item].name)
      .filter((item) => item !== "completed")
  );

  const [visibleMonths, setVisibleMonths] = useState([
    new Date().getMonth() + 1,
  ]);
  const [isSemesterViewActive, setisSemesterViewActive] = useState(false);

  const handleChange = (type, id, value) => {
    switch (type) {
      case "asignatura":
        if (value === false) {
          setVisibleSubjects(visibleSubjects.filter((item) => item !== id));
        } else {
          setVisibleSubjects([...visibleSubjects, id]);
        }
        break;
      case "tipologia":
        if (value === false) {
          setVisibleTaskStatus(visibleTaskStatus.filter((item) => item !== id));
        } else {
          setVisibleTaskStatus([...visibleTaskStatus, id]);
        }
        break;
      case "taskView":
        if (id === "Mensual") {
          setVisibleMonths([new Date().getMonth() + 1]);
          setisSemesterViewActive(false);
        } else {
          setVisibleMonths(
            props.session.currentEnrollment.semester === 1
              ? [3, 4, 5, 6, 7, 8]
              : [9, 10, 11, 12, 1, 2]
          );
          setisSemesterViewActive(true);
        }
        break;
      case "month":
        setVisibleMonths([Number(id)]);
        break;
      default:
        return;
    }
  };

  return (
    <div id="contenido">
      <div id="tareas-asignaturas">
        <TaskSection
          session={{
            username: props.session.username,
            year: props.session.year,
            semester: props.session.semester,
            currentEnrollment: props.session.currentEnrollment,
            isSemesterViewActive: isSemesterViewActive,
            visibleSubjects: visibleSubjects,
            visibleTaskStatus: visibleTaskStatus,
            visibleMonths: visibleMonths
          }}
          onChange={(type, id, value) => handleChange(type, id, value)}
        />
        <Menu
          classrooms={ 
            props.session.currentEnrollment.classrooms
          }
          onChange={(type, id, value) => handleChange(type, id, value)}
        />
      </div>
    </div>
  );
};
