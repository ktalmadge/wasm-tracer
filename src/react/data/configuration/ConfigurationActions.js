import ConfigurationActionTypes from './ConfigurationActionTypes';
import Dispatcher from '../Dispatcher';

const ConfigurationActions = {
  selectTab(option) {
    Dispatcher.dispatch({
      type: ConfigurationActionTypes.SELECT_TAB,
      option: option
    })
  },

  requestScene(scene) {
    Dispatcher.dispatch({
      type: ConfigurationActionTypes.REQUEST_SCENE,
      scene: scene
    })
  },
  loadScene(configuration) {
    Dispatcher.dispatch({
      type: ConfigurationActionTypes.LOAD_SCENE,
      configuration: configuration
    })
  },

  showInfo(message) {
    Dispatcher.dispatch({
      type: ConfigurationActionTypes.SHOW_INFO,
      message: message
    })
  },
  showError(message) {
    Dispatcher.dispatch({
      type: ConfigurationActionTypes.SHOW_ERROR,
      message: message
    })
  },


  addLight() {
    Dispatcher.dispatch({
      type: ConfigurationActionTypes.ADD_LIGHT
    })
  },
  deleteLight(id){
    Dispatcher.dispatch({
      type: ConfigurationActionTypes.DELETE_LIGHT,
      id: id
    })
  },

  addObject() {
    Dispatcher.dispatch({
      type: ConfigurationActionTypes.ADD_OBJECT
    })
  },
  deleteObject(id){
    Dispatcher.dispatch({
      type: ConfigurationActionTypes.DELETE_OBJECT,
      id: id
    })
  },

  updateValue(name, value, value_type, substate, id) {
    Dispatcher.dispatch({
      type: ConfigurationActionTypes.UPDATE_VALUE,
      name: name,
      value: value,
      value_type: value_type,
      substate: substate,
      id: id
    })
  },
  updateCoordValue(name, value, value_type, index, substate, id) {
    Dispatcher.dispatch({
      type: ConfigurationActionTypes.UPDATE_COORD_VALUE,
      name: name,
      value: value,
      value_type: value_type,
      index: index,
      substate: substate,
      id: id
    })
  }
};

export default ConfigurationActions;