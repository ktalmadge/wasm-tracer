import Immutable from 'immutable';

const Configuration = Immutable.Record(
  {
    threads: 1,
    samples: 1,
    use_kd_tree: true,
    max_kd_tree_depth: 20,
    max_reflections: 5,

    width: 200,
    height: 200,
    viewport_distance: 1.0,
    viewport_width: 1.0,
    camera_position: [3.0, 0.0, 20.0],
    camera_target: [0.0, -3.0, 0.0],
    camera_up: [0.0, 1.0, 0.0],

    lights: Immutable.OrderedMap(),
    objects: Immutable.OrderedMap(),

    reinhard_key_value: 1.5,
    reinhard_delta: 0.01
  }
);

export default Configuration;