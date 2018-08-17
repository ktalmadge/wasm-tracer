import Immutable from 'immutable';

import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import React from "react";

import Configuration from './Configuration';
import ConfigurationActions from './ConfigurationActions';
import ConfigurationActionTypes from './ConfigurationActionTypes';

import Light from './Light';
import SceneObject from './SceneObject';

import Sanitizer from '../../utils/Sanitizer';
import Id from '../../utils/Id';

class ConfigurationStore extends ReduceStore {
  constructor(){
    super(Dispatcher);
  }

  getInitialState(){
    return new Configuration();
  }

  updateAll(state, new_values) {
    return state.withMutations(s => {
      for(const [key, value] of Object.entries(new_values)) {
        s.set(key, value)
      }
    });
  }

  setInfo(state, message) {
    return state.set('react_state', this.updateAll(state.get('react_state'), {info: message, error: ''}));

  }

  setError(state, message) {
    return state.set('react_state', this.updateAll(state.get('react_state'), {error: message, info: ''}));
  }

  reduce(state, action){
    switch(action.type){
      case ConfigurationActionTypes.SHOW_INFO:
        return this.setInfo(state, action.message);
      case ConfigurationActionTypes.SHOW_ERROR:
        return this.setError(state, action.message);

      case ConfigurationActionTypes.SELECT_TAB:
        return this.setInfo(
            state.setIn(['react_state', 'selected_tab'], action.option),
            ''
        );

      case ConfigurationActionTypes.REQUEST_SCENE:
        fetch("/scenes/" + action.scene + '.json')
            .then(result => result.json())
            .then(configuration => {
                  ConfigurationActions.loadScene(configuration);
                }
            ).catch((error) => ConfigurationActions.showError(error.message) );
        return state;
      case ConfigurationActionTypes.LOAD_SCENE:
        try {
          let configuration = action.configuration;
          let lights = configuration.lights;
          let objects = configuration.objects;

          let new_lights = {};
          lights.forEach(light_configuration => {
            let light_id = Id.next();
            light_configuration.id = light_id;
            new_lights[light_id] = new Light(light_configuration);
          });
          configuration.lights = Immutable.OrderedMap(new_lights);

          let new_objects = {};
          objects.forEach(object_configuration => {
            let object_id = Id.next();
            object_configuration.id = object_id;
            object_configuration.contents = object_configuration.contents.join("\n");
            new_objects[object_id] = new SceneObject(object_configuration);
          });
          configuration.objects = Immutable.OrderedMap(new_objects);

          return this.setInfo(
              state.set('tracer_configuration', Immutable.Map(configuration)),
              'Successfully loaded scene'
          );
        } catch(error) {
          return this.setError(state, error);
        }

      case ConfigurationActionTypes.ADD_LIGHT:
        let light_id = Id.next();
        return state.setIn(['tracer_configuration', 'lights', light_id], new Light({id: light_id}));
      case ConfigurationActionTypes.DELETE_LIGHT:
        return state.removeIn(['tracer_configuration', 'lights', action.id]);


      case ConfigurationActionTypes.ADD_OBJECT:
        let object_id = Id.next();
        return state.setIn(['tracer_configuration', 'objects', object_id], new SceneObject({id: object_id}));
      case ConfigurationActionTypes.DELETE_OBJECT:
        return state.removeIn(['tracer_configuration', 'objects', action.id]);


      case ConfigurationActionTypes.UPDATE_VALUE:
        if(action.substate === undefined) {
          if(action.value_type === 'boolean'){
            action.value = !(action.value === true || action.value === 'true')
          }
          return state.setIn(['tracer_configuration', action.name], Sanitizer.s(action.value, action.value_type));
        } else {
          return state.setIn(['tracer_configuration', action.substate, action.id, action.name], Sanitizer.s(action.value, action.value_type));
        }
      case ConfigurationActionTypes.UPDATE_COORD_VALUE:
        if(action.substate === undefined) {
          let coord = state.getIn(['tracer_configuration', action.name]);
          let new_coord = [coord[0], coord[1], coord[2]];
          new_coord[action.index] = Sanitizer.s(action.value, action.value_type);

          return state.setIn(['tracer_configuration', action.name], new_coord);
        } else {
          let coord = state.getIn(['tracer_configuration', action.substate, action.id, action.name]);
          let new_coord = [coord[0], coord[1], coord[2]];
          new_coord[action.index] = Sanitizer.s(action.value, action.value_type);

          return state.setIn(['tracer_configuration', action.substate, action.id, action.name], new_coord);
        }
      default:
        return state;
    }
  }
}

export default new ConfigurationStore();