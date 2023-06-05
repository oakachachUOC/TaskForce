import React from "react";
import "./tableHeader.css";

export const TableHeader = (props) => {
  console.log(props);
  const currentMonth = new Date().getMonth() + 1;
  const isSelected = (value) => (value === currentMonth ? true : false);

  const handleChange = (monthNumber) => {
    props.onChange("month", monthNumber, true);
  };

  if (props.session.enrollmentSemester === 1) {
    return (
      <div id="table-header">
        <select
          onChange={(e) =>
            handleChange(e.target.options[e.target.selectedIndex].value)
          }
          disabled={props.session.isSemesterViewActive}
          name="month-selector"
          id="month-selector"
        >
          <option
            value="3"
            selected={isSelected(3)}
          >{`Marzo ${props.session.enrollmentYear}`}</option>
          <option
            value="4"
            selected={isSelected(4)}
          >{`Abril ${props.session.enrollmentYear}`}</option>
          <option
            value="5"
            selected={isSelected(5)}
          >{`Mayo ${props.session.enrollmentYear}`}</option>
          <option
            value="6"
            selected={isSelected(6)}
          >{`Junio ${props.session.enrollmentYear}`}</option>
          <option
            selected={isSelected(7)}
            value="7"
          >{`Julio ${props.session.enrollmentYear}`}</option>
          <option
            value="8"
            selected={isSelected(8)}
          >{`Agosto ${props.session.enrollmentYear}`}</option>
        </select>
      </div>
    );
  } else {
    return (
      <div id="table-header">
        <select name="month-selector" id="month-selector">
          <option
            value="9"
            selected={isSelected(9)}
          >{`Septiembre ${props.session.enrollmentYear}`}</option>
          <option
            value="10"
            selected={isSelected(10)}
          >{`Octubre ${props.session.enrollmentYear}`}</option>
          <option
            value="11"
            selected={isSelected(11)}
          >{`Noviembre ${props.session.enrollmentYear}`}</option>
          <option
            value="12"
            selected={isSelected(12)}
          >{`Diciembre ${props.session.enrollmentYear}`}</option>
          <option
            value="1"
            selected={isSelected(1)}
          >{`Enero ${props.session.enrollmentYear}`}</option>
          <option
            value="2"
            selected={isSelected(2)}
          >{`Febrero ${props.session.enrollmentYear}`}</option>
        </select>
      </div>
    );
  }
};

const getMonthByDate = (date) => {
  switch (date.getMonth()) {
    case 0:
      return "Enero";
    case 1:
      return "Febrero";
    case 2:
      return "Marzo";
    case 3:
      return "Abril";
    case 4:
      return "Mayo";
    case 5:
      return "Junio";
    case 6:
      return "Julio";
    case 7:
      return "Agosto";
    case 8:
      return "Septiembre";
    case 9:
      return "Octubre";
    case 10:
      return "Noviembre";
    case 11:
      return "Diciembre";
    default:
      return "Month not found";
  }
};
