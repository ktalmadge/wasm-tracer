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
    state: ConfigurationStore.getState().get("react_state"),
    configuration: ConfigurationStore.getState().get("tracer_configuration"),
    lights: ConfigurationStore.getState().getIn(["tracer_configuration", "lights"]),
    objects: ConfigurationStore.getState().getIn(["tracer_configuration", "objects"]),
    selected_tab: ConfigurationStore.getState().getIn(['react_state', 'selected_tab']),

    selectTab: ConfigurationActions.selectTab,

    loadScene: ConfigurationActions.requestScene,

    showError: ConfigurationActions.showError,
    showInfo: ConfigurationActions.showInfo,

    addLight: ConfigurationActions.addLight,
    deleteLight: ConfigurationActions.deleteLight,

    addObject: ConfigurationActions.addObject,
    deleteObject: ConfigurationActions.deleteObject,

    onUpdateValue: ConfigurationActions.updateValue,
    onUpdateCoordValue: ConfigurationActions.updateCoordValue
  };
}

export default Container.createFunctional(AppView, getStores, getState);