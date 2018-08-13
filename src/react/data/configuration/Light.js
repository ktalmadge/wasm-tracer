import Immutable from 'immutable';

const Light = Immutable.Record(
    {
      id: '',
      position: [0.0, 0.0, 0.0],
      color: [255, 255, 255],
      intensity: 1.0
    }
);

export default Light;