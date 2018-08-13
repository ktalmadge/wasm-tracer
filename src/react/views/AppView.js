import React from 'react';
import './stylesheets/app.css';

import CameraConfiguration from './CameraConfiguration';
import MiscConfiguration from './MiscConfiguration';
import LightConfiguration from './LightConfiguration';
import ObjectConfiguration from './ObjectConfiguration';
import RayTracer from './RayTracer';

function AppView(props) {
  return <div>
    <CameraConfiguration {...props} />
    <MiscConfiguration {...props} />
    <LightConfiguration {...props} />
    <ObjectConfiguration {...props} />
    <RayTracer {...props}/>
  </div>
}

export default AppView;