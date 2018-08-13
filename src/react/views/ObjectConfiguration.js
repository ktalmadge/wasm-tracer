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
    return (
        <div className="configuration object_configurations">
          <button onClick={this.addObject}>Add Object</button>
          {[...this.props.objects.values()].reverse().map(object => (
              <li key={object.id}>
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
              </li>
          ))}
        </div>
    )
  }
}

export default ObjectConfiguration;