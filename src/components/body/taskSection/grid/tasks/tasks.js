import React from "react";
import "./tasks.css";
import { Task } from "./task/task";

export const Tasks = (props) => {
  const final = [];
  const classrooms = props.session.currentEnrollment.classrooms;

  for (let classroom in classrooms) {
    const tasks = classrooms[classroom].tasks;

    for (let task in tasks) {
      final.push(
        <li key={tasks[task].id}>
          <Task
            session={{
              username: props.session.username,
              year: props.session.year,
              semester: props.session.semester,
              task: tasks[task],
              visibleMonths: props.session.visibleMonths,
              visibleSubjects: props.session.visibleSubjects,
              visibleTaskStatus: props.session.visibleTaskStatus
            }}
          />
        </li>
      );
    }
  }

  return (
    <>
      <ul style={{ listStyleType: "none", paddingLeft: "0" }}>{final}</ul>
    </>
  );
};
