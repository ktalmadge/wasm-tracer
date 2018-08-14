import React from 'react';
import './stylesheets/app.scss';

import CameraConfiguration from './CameraConfiguration';
import BasicConfiguration from './BasicConfiguration';
import LightConfiguration from './LightConfiguration';
import ObjectConfiguration from './ObjectConfiguration';
import RayTracer from './RayTracer';
import Navigation from './Navigation';

function AppView(props) {
  return (
      <div id="app">
        <div className="app-container">
          <Navigation {...props} />
          <div className="configuration_container">
            <BasicConfiguration {...props} />
            <CameraConfiguration {...props} />
            <LightConfiguration {...props} />
            <ObjectConfiguration {...props} />
          </div>
          <RayTracer {...props}/>
        </div>
      </div>
  )
}

export default AppView;