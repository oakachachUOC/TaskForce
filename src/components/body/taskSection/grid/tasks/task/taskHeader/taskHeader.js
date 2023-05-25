import React from "react";

export const TaskHeader = () => {
    return (
        <div className="task-header">
            <TaskDateTitle />
            <SubjectTitle />
            <TaskNameTitle />
        </div>
    );
};

const TaskDateTitle = () => {
    return <div className="task-date-title">Fecha de entrega</div>;
};

const SubjectTitle = () => {
    return <div className="subject-title">Nombre de la asignatura</div>;
};
const TaskNameTitle = () => {
    return <div className="task-name-title">Nombre de la entrega</div>;
};
