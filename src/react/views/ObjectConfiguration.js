import React from 'react';
import { LabelledInput, LabelledCoordInput } from '../utils/Input';

class ObjectConfiguration extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
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

  render() {
    let selected = this.props.selected_tab === 'object';
    return (
        <div className={"configuration object-configurations " + (selected ? "selected" : "")}>
          <div className="configuration-title">Object Configuration</div>
          {[...this.props.objects.values()].map(object => (
              <div className="object_configuration" key={object.id}>
                <button onClick={(() => this.props.deleteObject(object.id))}>Delete Object</button>
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
          <button onClick={this.props.addObject}>Add Object</button>
        </div>
    )
  }
}

export default ObjectConfiguration;