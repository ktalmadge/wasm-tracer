import React from 'react';
import { LabelledInput, LabelledCoordInput } from '../utils/Input';

class LightConfiguration extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
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

  render() {
    let selected = this.props.selected_tab === 'light';
    return (
        <div className={"configuration light-configurations " + (selected ? "selected" : "")}>
          <div className="configuration-title">Light Configuration</div>
          {[...this.props.lights.values()].map(light => (
              <div className="light_configuration" key={light.id}>
                <button onClick={(() => this.props.deleteLight(light.id))}>Delete Light</button>
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
          <button onClick={this.props.addLight}>Add Light</button>
        </div>
    )
  }
}

export default LightConfiguration;