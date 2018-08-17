import React from 'react';
import { LabelledInput, LabelledCoordInput } from '../utils/Input';

class CameraConfiguration extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleCoordChange = this.handleCoordChange.bind(this);
  }

  handleChange(event) {
    this.props.onUpdateValue(event.target.name, event.target.value, event.target.dataset.valueType);
  }

  handleCoordChange(event) {
    this.props.onUpdateCoordValue(event.target.name, event.target.value, event.target.dataset.valueType, event.target.dataset.index);
  }

  render() {
    let selected = this.props.selected_tab === 'camera';
    return (
        <div className={"configuration camera-configurations " + (selected ? "selected" : "")}>
          <div className="configuration-title">Camera Configuration</div>

          <LabelledCoordInput name="camera_position" value={this.props.configuration.get("camera_position")} type="float" className="number" handleChange={this.handleCoordChange} {...this.props} />
          <LabelledCoordInput name="camera_target" value={this.props.configuration.get("camera_target")} type="float" className="number" handleChange={this.handleCoordChange} {...this.props} />
          <LabelledCoordInput name="camera_up" value={this.props.configuration.get("camera_up")} type="float" className="number" handleChange={this.handleCoordChange} {...this.props} />
          <LabelledInput name="viewport_width" value={this.props.configuration.get("viewport_width")} type="float" className="number" handleChange={this.handleChange} {...this.props} />
          <LabelledInput name="viewport_distance" value={this.props.configuration.get("viewport_distance")} type="float" className="number" handleChange={this.handleChange} {...this.props} />
        </div>
    )
  }
}

export default CameraConfiguration;