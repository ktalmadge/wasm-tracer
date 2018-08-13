import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import ConfigurationActions from './data/configuration/ConfigurationActions';

ReactDOM.render(<AppContainer/>, document.getElementById('app'));


ConfigurationActions.addLight();
ConfigurationActions.addObject();

ConfigurationActions.updateValue(
    'ambient_coefficient',
    0.2,
    'float',
    'objects',
    'id_2'
);

ConfigurationActions.updateValue(
    'specular_coefficient',
    0.4,
    'float',
    'objects',
    'id_2'
);

ConfigurationActions.updateValue(
    'specular_exponent',
    20,
    'integer',
    'objects',
    'id_2'
);

ConfigurationActions.updateValue(
    'reflectance',
    0.25,
    'float',
    'objects',
    'id_2'
);

ConfigurationActions.updateValue(
    'contents',
    `sphere 9.0 2 1 0.75
                  sphere 9.0 0 -2 0.75
                  sphere 9.0 -2 -5 0.75
                  sphere 7.0 2 -5 0.75
                  sphere 7.0 0 -2 0.75
                  sphere 7.0 -2 1 0.75
                  sphere 5.0 2 1 0.75
                  sphere 5.0 0 -2 0.75
                  sphere 5.0 -2 -5 0.75
                  sphere 3.0 2 -5 0.75
                  sphere 3.0 0 -2 0.75
                  sphere 3.0 -2 1 0.75
                  sphere 1.0 2 1 0.75
                  sphere 1.0 0 -2 0.75
                  sphere 1.0 -2 -5 0.75
                  sphere -1.0 2 -5 0.75
                  sphere -1.0 0 -2 0.75
                  sphere -1.0 -2 1 0.75
                  sphere -3.0 2 1 0.75
                  sphere -3.0 0 -2 0.75
                  sphere -3.0 -2 -5 0.75
                  sphere -5.0 2 -5 0.75
                  sphere -5.0 0 -2 0.75
                  sphere -5.0 -2 1 0.75
                  sphere -7.0 2 1 0.75
                  sphere -7.0 0 -2 0.75
                  sphere -7.0 -2 -5 0.75
                  sphere -9.0 2 -5 0.75
                  sphere -9.0 0 -2 0.75
                  sphere -9.0 -2 1 0.75`,
    'textarea',
    'objects',
    'id_2'
);