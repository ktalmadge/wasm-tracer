import React from 'react';
import '../utils/StringExtensions';

function NavButton(props) {
  let selected = props.selected_configuration === props.option;
  return (
      <button
          className={"nav-button " + (selected ? "selected" : "")}
          onClick={() => {props.selectConfiguration(props.option)} }
      >
        {props.label}
      </button>
  )
}

class Navigation extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <div className="navigation-container">
          <NavButton option="basic" label="Basic Configuration" {...this.props} />
          <NavButton option="camera" label="Camera" {...this.props} />
          <NavButton option="light" label="Lights" {...this.props} />
          <NavButton option="object" label="Objects" {...this.props} />
        </div>
    )
  }
}

export default Navigation;