import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import React from "react";

import Configuration from './Configuration';
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

  reduce(state, action){
    switch(action.type){
      case ConfigurationActionTypes.ADD_LIGHT:
        let light_id = Id.next();
        return state.setIn(['lights', light_id], new Light({id: light_id}));
      case ConfigurationActionTypes.ADD_OBJECT:
        let object_id = Id.next();
        return state.setIn(['objects', object_id], new SceneObject({id: object_id}));
      case ConfigurationActionTypes.UPDATE_VALUE:
        if(action.substate === undefined) {
          if(action.value_type === 'boolean'){
            action.value = !(action.value === true || action.value === 'true')
          }
          return state.set(action.name, Sanitizer.s(action.value, action.value_type));
        } else {
          return state.setIn([action.substate, action.id, action.name], Sanitizer.s(action.value, action.value_type));
        }
      case ConfigurationActionTypes.UPDATE_COORD_VALUE:
        if(action.substate === undefined) {
          let coord = state.get(action.name);
          let new_coord = [coord[0], coord[1], coord[2]];
          new_coord[action.index] = Sanitizer.s(action.value, action.value_type);

          return state.set(action.name, new_coord);
        } else {
          let coord = state.getIn([action.substate, action.id, action.name]);
          let new_coord = [coord[0], coord[1], coord[2]];
          new_coord[action.index] = Sanitizer.s(action.value, action.value_type);

          return state.setIn([action.substate, action.id, action.name], new_coord);
        }
      default:
        return state;
    }
  }
}

export default new ConfigurationStore();