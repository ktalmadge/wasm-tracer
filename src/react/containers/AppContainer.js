import AppView from '../views/AppView';
import Store from '../data/Store';
import { Container } from 'flux/utils';

function getStores() {
  return [
    Store
  ];
}

function getState() {
  return {};
}

export default Container.createFunctional(AppView, getStores, getState);