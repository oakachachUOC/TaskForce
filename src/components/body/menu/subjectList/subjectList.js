import "./subjectList.css";
import React, { useState } from "react";

/* Listado de asignaturas matriculadas */
export const SubjectList = (props) => {
    const final = [];
    const asignaturas = props.classrooms;

    for (let asignatura in asignaturas) {
        final.push(
            <li key={asignatura}>
                <Asignatura info={asignaturas[asignatura]} onChange={props.onChange} />
            </li>
        );
    }
    return (
        <div className="contenedor-asignaturas-tipologia">
            <div className="bolder contenedor-titulo-asignaturas-tipologia">
                Asignaturas
            </div>
            <ul style={{ listStyleType: "none", paddingLeft: "0" }}>{final}</ul>
        </div>
    );
};

/* Unidad de asignatura del listado */
const Asignatura = (props) => {
    const [checked, setChecked] = useState(true);

    const handleChange = (value) => {
        props.onChange("asignatura", props.info.subjectId, value);
        setChecked(!checked);
    };

    return (
        <div className="asignatura">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => handleChange(e.target.checked)}
            />
            <div
                className="inline"
                style={{
                    backgroundColor: props.info.color
                }}
            ></div>
            <a title={props.info.subjectId}>{props.info.subjectName}</a>
        </div>
    );
};
