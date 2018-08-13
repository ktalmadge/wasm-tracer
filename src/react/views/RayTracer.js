import React from 'react';
import ConfigurationStore from "../data/configuration/ConfigurationStore";

class RayTracer extends React.Component {
  constructor(props) {
    super(props);

    this.saveConfiguration = this.saveConfiguration.bind(this);
  }

  // Ray tracer doesn't like string numericals - must ensure numbers are not strings
  parseNumbers(input){
    if(Array.isArray(input)){
      return input.map(element => this.parseNumbers(element));
    } else if(typeof input === 'object') {
      for (let key in input) {
        if (!input.hasOwnProperty(key)){ continue; }
        input[key] = this.parseNumbers(input[key]);
      }

      return input;
    } else {
      let number = parseFloat(input);
      return isNaN(number) ? input : number;
    }
  }

  formattedConfiguration(){
    let json = JSON.parse(JSON.stringify(this.props.configuration));

    // Remove React ID information from objects and lights
    ['lights', 'objects'].map(collection => {
      let formatted_collection = [];
      for(let id in json[collection]){
        let element = json[collection][id];
        delete element.id;

        if(collection === 'objects') {
          element.contents = element.contents.split("\n").map(line => line.trim());
        }

        formatted_collection.push(element)
      }

      json[collection] = formatted_collection;
    });

    return this.parseNumbers(json);
  }

  saveConfiguration(event) {
    let tracer_import = import('../ray_tracer/RayTracerComponent');
    tracer_import.then(tracer_class => {
      let ray_tracer = new tracer_class.default(
          this.formattedConfiguration(),
          document.getElementById('trace-target')
      );
      document.getElementById('toggle').onclick = (event) => {
        ray_tracer.should_trace = !ray_tracer.should_trace;

        if(ray_tracer.should_trace) {
          event.target.textContent = "Stop Tracing";
          ray_tracer.draw();
        } else {
          event.target.textContent = "Start Tracing";
        }
      };
    });
  }

  render() {
    return (
        <div className="configuration camera_configuration">
          <button id="save-configuration" onClick={this.saveConfiguration}>Save Configuration</button>
          <canvas id="trace-target"></canvas>
          <div id="progress"></div>
          <button id="toggle">Start Tracing</button>
        </div>
    )
  }
}

export default RayTracer;