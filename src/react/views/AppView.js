import React from 'react';
import './stylesheets/app.scss';

import ConfigurationActions from '../data/configuration/ConfigurationActions'

import Scenes from './Scenes';
import CameraConfiguration from './CameraConfiguration';
import BasicConfiguration from './BasicConfiguration';
import LightConfiguration from './LightConfiguration';
import ObjectConfiguration from './ObjectConfiguration';
import RayTracer from './RayTracer';
import Navigation from './Navigation';

function hideNotification(){
  ConfigurationActions.showInfo('');
}

function InfoNotification(props) {
  return (
      <div className="info-notification" onClick={hideNotification}>
        {props.state.get("info")}
      </div>
  )
}

function ErrorNotification(props) {
  return (
      <div className="error-notification" onClick={hideNotification}>
        {props.state.get("error")}
      </div>
  )
}

function NotificationContainer(props) {
  if(props.state.get("info") || props.state.get("info")) {
    return (
        <div className="notification-container">
          <div className="notification">
            <InfoNotification {...props} />
            <ErrorNotification {...props} />
          </div>
        </div>
    )
  } else {
    return (
        <div className="notification-container" />
    )
  }
}

function AppView(props) {
  return (
      <div className="app-container">
        <NotificationContainer {...props} />
        <div className="configuration-container">
          <div className="configuration-form-and-nav">
            <Navigation {...props} />
            <div className="configuration-form">
              <Scenes {...props} />
              <BasicConfiguration {...props} />
              <CameraConfiguration {...props} />
              <LightConfiguration {...props} />
              <ObjectConfiguration {...props} />
            </div>
          </div>
        </div>
        <RayTracer {...props}/>
      </div>
  )
}

export default AppView;