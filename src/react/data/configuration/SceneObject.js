import Immutable from 'immutable';

const SceneObject = Immutable.Record(
    {
      id: '',
      contents: '',
      color: [255, 255, 255],
      reflectance: 0.0,
      ambient_coefficient: 0.0,
      specular_coefficient: 0.0,
      specular_exponent: 1
    }
);

export default SceneObject;