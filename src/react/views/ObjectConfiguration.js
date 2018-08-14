import React from 'react';
import { LabelledInput, LabelledCoordInput } from '../utils/Input';

class ObjectConfiguration extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.addObject = this.addObject.bind(this);
  }

  handleChange(id, event) {
    this.props.onUpdateValue(
        event.target.name,
        event.target.value,
        event.target.dataset.valueType,
        'objects',
        id
    );
  }

  handleCoordChange(id, event) {
    this.props.onUpdateCoordValue(
        event.target.name,
        event.target.value,
        event.target.dataset.valueType,
        event.target.dataset.index,
        'objects',
        id
    );
  }

  addObject(event) {
    this.props.addObject();
  }

  render() {
    let selected = this.props.selected_configuration === 'object';
    return (
        <div className={"configuration object-configurations " + (selected ? "selected" : "")}>
          <div className="configuration_title">Object Configuration</div>
          {[...this.props.objects.values()].reverse().map(object => (
              <div className="object_configuration" key={object.id}>
                <LabelledCoordInput
                    name="color"
                    value={object.color}
                    type="integer"
                    className="number"
                    handleChange={(event) => { this.handleCoordChange(object.id, event) }}
                    {...this.props}
                />
                <LabelledInput
                    name="ambient_coefficient"
                    value={object.ambient_coefficient}
                    type="float"
                    className="number"
                    handleChange={(event) => { this.handleChange(object.id, event) }}
                    {...this.props}
                />
                <LabelledInput
                    name="specular_coefficient"
                    value={object.specular_coefficient}
                    type="float"
                    className="number"
                    handleChange={(event) => { this.handleChange(object.id, event) }}
                    {...this.props}
                />
                <LabelledInput
                    name="specular_exponent"
                    value={object.specular_exponent}
                    type="integer"
                    className="number"
                    handleChange={(event) => { this.handleChange(object.id, event) }}
                    {...this.props}
                />
                <LabelledInput
                    name="reflectance"
                    value={object.reflectance}
                    type="float"
                    className="number"
                    handleChange={(event) => { this.handleChange(object.id, event) }}
                    {...this.props}
                />
                <LabelledInput
                    name="contents"
                    value={object.contents}
                    type="textarea"
                    className="textarea"
                    handleChange={(event) => { this.handleChange(object.id, event) }}
                    {...this.props}
                />
              </div>
          ))}
          <button onClick={this.addObject}>Add Object</button>
        </div>
    )
  }
}

export default ObjectConfiguration;