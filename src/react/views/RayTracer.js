import React from 'react';
import ConfigurationActions from '../data/configuration/ConfigurationActions';

class RayTracer extends React.Component {
  constructor(props) {
    super(props);

    let tracer_import = import('../ray_tracer/RayTracerComponent');
    tracer_import.then(tracer_class => {
      this.ray_tracer = new tracer_class.default(
          document.getElementById('trace-target')
      );
    });

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

  // Prepare configuration to pass to raytracer
  formattedConfiguration(){
    let json = JSON.parse(JSON.stringify(this.props.configuration));

    // Remove React ID information from objects and lights
    ['lights', 'objects'].map(collection => {
      let formatted_collection = [];
      for(let id in json[collection]){
        let element = json[collection][id];
        delete element.id;

        // Split object contents into array of lines
        if(collection === 'objects'){
          element.contents = element.contents.split("\n").map(line => line.trim());
        }

        formatted_collection.push(element)
      }

      json[collection] = formatted_collection;
    });

    return this.parseNumbers(json);
  }

  saveConfiguration(_event) {
    this.ray_tracer.updateConfiguration(
        this.formattedConfiguration(),
        () => {
          ConfigurationActions.showInfo('Configuration saved');
        },
        ((error) => {
          ConfigurationActions.showError("Error: " + error.message);
        })
    );

    let target = document.getElementById('canvas-target');
    target.style.minHeight = '100vh';
    //target.scrollIntoView({block: 'start', behavior: 'smooth'});

    let toggle_button = document.getElementById('toggle');
    toggle_button.textContent = "Start Tracing";

    toggle_button.onclick = (event) => {
      this.ray_tracer.should_trace = !this.ray_tracer.should_trace;

      if(this.ray_tracer.should_trace) {
        event.target.textContent = "Stop Tracing";
        this.ray_tracer.draw();
      } else {
        event.target.textContent = "Start Tracing";
      }
    };
  }

  render() {
    return (
        <div id="canvas-target" className="tracer-container">
          <div className="tracer-controls-container">
            <div className="tracer-controls-wrapper">
              <button id="save-configuration" onClick={this.saveConfiguration}>Save Configuration</button>
              <button id="toggle">Start Tracing</button>
            </div>
          </div>
          <div className="canvas-container">
            <div className="canvas-wrapper">
              <canvas id="trace-target" height="100px" width="100px"></canvas>
            </div>
          </div>
          <div id="progress" className="progress"></div>
        </div>
    )
  }
}

export default RayTracer;