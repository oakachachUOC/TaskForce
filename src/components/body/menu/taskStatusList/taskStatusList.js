import './taskStatusList.css'
import React, { useState } from 'react'
import { taskStatusCollection } from '../../taskStatusCollection'

export const TaskStatusList = (props) => {
    const final = []

    for (let item in taskStatusCollection) {
        final.push(
            <li key={taskStatusCollection[item].name}>
                <Tipologia
                    tipologia={taskStatusCollection[item]}
                    onChange={props.onChange}
                />
            </li>
        )
    }
    return (
        <div className="contenedor-asignaturas-tipologia">
            <div className="bolder contenedor-titulo-asignaturas-tipologia">
                Estado de la tarea
            </div>
            <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>{final}</ul>
        </div>
    )
}

const Tipologia = (props) => {
    const [checked, setChecked] = useState(
        props.tipologia.name === 'completed' ? false : true
    )

    const handleChange = (value) => {
        props.onChange('tipologia', props.tipologia.name, value)
        setChecked(!checked)
    }

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
                    backgroundColor: props.tipologia.color,
                    border: '1px solid #000078',
                }}
            ></div>
            <a title={props.tipologia.title}>{props.tipologia.title}</a>
        </div>
    )
}
