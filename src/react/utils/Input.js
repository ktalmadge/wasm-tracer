import React from 'react';
import './StringExtensions';

function Input(props){
  if(props.type === "textarea") {
    return (
        <textarea
            className={props.className}
            name={props.name}
            data-value-type={props.type}
            value={props.value}
            onChange={props.handleChange}
        />
    )
  } else if(props.type === 'boolean') {
    return(
      <input
          type='checkbox'
          className={props.className}
          name={props.name}
          data-value-type={props.type}
          checked={props.value}
          value={props.value}
          onChange={props.handleChange}
      />
    )
  } else {
    return (
        <input
            className={props.className}
            name={props.name}
            data-value-type={props.type}
            value={props.value}
            onChange={props.handleChange}
        />
    )
  }
}

function LabelledInput(props){
  let label =
      (props.label === undefined) ? props.name.capitalize() : props.label;
  return (
      <div className={props.className + "-labelled-input labelled-input"}>
        <label className={props.className + "-label input-label"}>{label}</label>
        <Input {...props} />
      </div>
  );
}

function LabelledCoordInput(props){
  let label =
      (props.label === undefined) ? props.name.capitalize() : props.label;
  let input_class = "coord-input " + props.className;
  return (
      <div className={props.className + "-labelled-input labelled-input"}>
        <label className={props.className + "-label input-label"}>{label}</label>
        <input
            className={input_class}
            name={props.name}
            data-value-type={props.type}
            data-index="0"
            value={props.value[0]}
            onChange={props.handleChange}
        />
        <input
            className={input_class}
            name={props.name}
            data-value-type={props.type}
            data-index="1"
            value={props.value[1]}
            onChange={props.handleChange}
        />
        <input
            className={input_class}
            name={props.name}
            data-value-type={props.type}
            data-index="2"
            value={props.value[2]}
            onChange={props.handleChange}
        />
      </div>
  )
}

export { Input, LabelledInput, LabelledCoordInput };