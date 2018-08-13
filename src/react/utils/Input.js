import React from 'react';

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
  return (
      <div className="labelled_input">
        <label className="input_label">{props.name}:</label>
        <Input {...props} />
      </div>
  );
}

function LabelledCoordInput(props){
  return (
      <div className="labelled_input coord_input">
        <label className="input_label">{props.name}:</label>
        <input
            className={props.className}
            name={props.name}
            data-value-type={props.type}
            data-index="0"
            value={props.value[0]}
            onChange={props.handleChange}
        />
        <input
            className={props.className}
            name={props.name}
            data-value-type={props.type}
            data-index="1"
            value={props.value[1]}
            onChange={props.handleChange}
        />
        <input
            className={props.className}
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