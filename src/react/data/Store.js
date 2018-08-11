import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import Dispatcher from './Dispatcher';
import React from "react";

class Store extends ReduceStore {
  constructor(){
    super(Dispatcher);
  }

  getInitialState(){
    return Immutable.OrderedMap();
  }

  reduce(state, action){
    return state;
  }
}

export default new Store();