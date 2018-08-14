import ConfigurationActionTypes from './ConfigurationActionTypes';
import Dispatcher from '../Dispatcher';

const ConfigurationActions = {
  selectConfiguration(option) {
    Dispatcher.dispatch({
      type: ConfigurationActionTypes.SELECT_CONFIGURATION,
      option: option
    })
  },

  addLight() {
    Dispatcher.dispatch({
      type: ConfigurationActionTypes.ADD_LIGHT
    })
  },
  addObject() {
    Dispatcher.dispatch({
      type: ConfigurationActionTypes.ADD_OBJECT
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