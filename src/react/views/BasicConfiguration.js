import React from 'react';
import { LabelledInput, LabelledCoordInput } from '../utils/Input';

class BasicConfiguration extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onUpdateValue(event.target.name, event.target.value, event.target.dataset.valueType);
  }

  render() {
    let selected = this.props.selected_tab === 'basic';
    return (
        <div className={"configuration basic-configurations " + (selected ? "selected" : "")} >
          <div className="configuration-title">Basic Configuration</div>
          <LabelledInput name="width" value={this.props.configuration.get("width")} type="integer" className="number" handleChange={this.handleChange} {...this.props} />
          <LabelledInput name="height" value={this.props.configuration.get("height")} type="integer" className="number" handleChange={this.handleChange} {...this.props} />
          <LabelledInput name="samples" value={this.props.configuration.get("samples")} type="integer" className="number" handleChange={this.handleChange} {...this.props} />
          <LabelledInput name="max_reflections" value={this.props.configuration.get("max_reflections")} type="integer" className="number" handleChange={this.handleChange} {...this.props} />
          <LabelledInput name="use_kd_tree" label="Use KD Tree" value={this.props.configuration.get("use_kd_tree")} type="boolean" className="number" handleChange={this.handleChange} {...this.props} />
          <LabelledInput name="max_kd_tree_depth" label="Max KD Tree Depth" value={this.props.configuration.get("max_kd_tree_depth")} type="integer" className="number" handleChange={this.handleChange} {...this.props} />
        </div>
    )
  }
}

export default BasicConfiguration;