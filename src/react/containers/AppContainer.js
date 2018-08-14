import AppView from '../views/AppView';
import ConfigurationStore from '../data/configuration/ConfigurationStore';
import ConfigurationActions from '../data/configuration/ConfigurationActions';
import { Container } from 'flux/utils';

function getStores() {
  return [
    ConfigurationStore
  ];
}

function getState() {
  return {
    configuration: ConfigurationStore.getState(),
    lights: ConfigurationStore.getState().get("lights"),
    objects: ConfigurationStore.getState().get("objects"),
    selected_configuration: ConfigurationStore.getState().getIn(['react_state', 'selected_configuration']),

    selectConfiguration: ConfigurationActions.selectConfiguration,

    addLight: ConfigurationActions.addLight,
    addObject: ConfigurationActions.addObject,
    onUpdateValue: ConfigurationActions.updateValue,
    onUpdateCoordValue: ConfigurationActions.updateCoordValue
  };
}

export default Container.createFunctional(AppView, getStores, getState);