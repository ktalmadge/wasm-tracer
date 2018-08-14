import React from 'react';
import { LabelledInput, LabelledCoordInput } from '../utils/Input';

class LightConfiguration extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.addLight = this.addLight.bind(this);
  }

  handleChange(id, event) {
    this.props.onUpdateValue(
        event.target.name,
        event.target.value,
        event.target.dataset.valueType,
        'lights',
        id
    );
  }

  handleCoordChange(id, event) {
    this.props.onUpdateCoordValue(
        event.target.name,
        event.target.value,
        event.target.dataset.valueType,
        event.target.dataset.index,
        'lights',
        id
    );
  }

  addLight(event) {
    this.props.addLight();
  }

  render() {
    let selected = this.props.selected_configuration === 'light';
    return (
        <div className={"configuration light-configurations " + (selected ? "selected" : "")}>
          <div className="configuration_title">Light Configuration</div>
          {[...this.props.lights.values()].reverse().map(light => (
              <div className="light_configuration" key={light.id}>
                <LabelledCoordInput
                    name="position"
                    value={light.position}
                    type="float"
                    className="number"
                    handleChange={(event) => { this.handleCoordChange(light.id, event) }}
                    {...this.props}
                />
                <LabelledCoordInput
                    name="color"
                    value={light.color}
                    type="integer"
                    className="number"
                    handleChange={(event) => { this.handleCoordChange(light.id, event) }}
                    {...this.props}
                />
                <LabelledInput
                    name="intensity"
                    value={light.intensity}
                    type="float"
                    className="number"
                    handleChange={(event) => { this.handleChange(light.id, event) }}
                    {...this.props}
                />
              </div>
          ))}
          <button onClick={this.addLight}>Add Light</button>
        </div>
    )
  }
}

export default LightConfiguration;