import React, { useState } from "react";
import "./taskView.css";

/* Botonera para cambiar la vista de las tareas */
export const TaskView = (props) => {
    // Si hacemos clic en una, que haga un trigger en la función.
    const [isSemesterlyViewChecked, setIsSemesterlyViewChecked] = useState("");
    const [isMonthlyViewChecked, setIsMonthlyViewChecked] =
        useState("active-view");

    const handleChange = (name) => {
        props.onChange("taskView", name, true);

        if (name === "Mensual") {
            setIsMonthlyViewChecked("active-view");
            setIsSemesterlyViewChecked("");
        } else {
            setIsMonthlyViewChecked("");
            setIsSemesterlyViewChecked("active-view");
        }
    };

    return (
        <>
            <div className="tareas-vista">
                <a onClick={(e) => handleChange(e.target.outerText)}>
                    <h4
                        id="monthly-view"
                        className={isMonthlyViewChecked}
                        title="Ver vista mensual"
                    >
                        Mensual
                    </h4>
                </a>
            </div>
            <div className="tareas-vista">
                <a onClick={(e) => handleChange(e.target.outerText)}>
                    <h4
                        id="semesterly-view"
                        className={isSemesterlyViewChecked}
                        title="Ver vista semestral"
                    >
                        Semestral
                    </h4>
                </a>
            </div>
        </>
    );
};
