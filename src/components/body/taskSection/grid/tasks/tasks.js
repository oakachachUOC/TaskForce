import React from "react";
import "./tasks.css";
import { Task } from "./task/task";

export const Tasks = (props) => {
  const final = [];
  const classrooms = props.classrooms;

  for (let classroom in classrooms) {
    const tasks = classrooms[classroom].tasks;

    for (let task in tasks) {
      final.push(
        <li key={tasks[task].id}>
          <Task
            visibleMonths={props.visibleMonths}
            visibleSubjects={props.visibleSubjects}
            visibleTaskStatus={props.visibleTaskStatus}
            info={tasks[task]}
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
