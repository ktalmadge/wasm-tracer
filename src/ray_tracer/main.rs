#![allow(dead_code)]
#![allow(unused_variables, unused_mut)]

/* TO USE: UPDATE Cargo.toml TO MATCH Cargo.main.toml */

extern crate cgmath;
extern crate image;
extern crate rand;

#[macro_use]
extern crate serde_derive;

use std::fs::File;
use std::io::prelude::*;

extern crate raytracer;

use raytracer::RayTracer;

fn main() {
    let config = r#"{
  "threads": 1,
  "samples": 1,
  "use_kd_tree": true,
  "max_kd_tree_depth": 20,
  "max_reflections": 5,
  "width": 200,
  "height": 200,
  "viewport_distance": 1,
  "viewport_width": 1,
  "camera_position": [
    3,
    0,
    20
  ],
  "camera_target": [
    0,
    -3,
    0
  ],
  "camera_up": [
    0,
    1,
    0
  ],
  "lights": [
    {
      "position": [
        0,
        0,
        0
      ],
      "color": [
        255,
        255,
        255
      ],
      "intensity": 1
    }
  ],
  "objects": [
    {
      "contents": [
        "sphere 9.0 2 1 0.75",
        "sphere 9.0 0 -2 0.75",
        "sphere 9.0 -2 -5 0.75",
        "sphere 7.0 2 -5 0.75",
        "sphere 7.0 0 -2 0.75",
        "sphere 7.0 -2 1 0.75",
        "sphere 5.0 2 1 0.75",
        "sphere 5.0 0 -2 0.75",
        "sphere 5.0 -2 -5 0.75",
        "sphere 3.0 2 -5 0.75",
        "sphere 3.0 0 -2 0.75",
        "sphere 3.0 -2 1 0.75",
        "sphere 1.0 2 1 0.75",
        "sphere 1.0 0 -2 0.75",
        "sphere 1.0 -2 -5 0.75",
        "sphere -1.0 2 -5 0.75",
        "sphere -1.0 0 -2 0.75",
        "sphere -1.0 -2 1 0.75",
        "sphere -3.0 2 1 0.75",
        "sphere -3.0 0 -2 0.75",
        "sphere -3.0 -2 -5 0.75",
        "sphere -5.0 2 -5 0.75",
        "sphere -5.0 0 -2 0.75",
        "sphere -5.0 -2 1 0.75",
        "sphere -7.0 2 1 0.75",
        "sphere -7.0 0 -2 0.75",
        "sphere -7.0 -2 -5 0.75",
        "sphere -9.0 2 -5 0.75",
        "sphere -9.0 0 -2 0.75",
        "sphere -9.0 -2 1 0.75"
      ],
      "color": [
        255,
        255,
        255
      ],
      "reflectance": 0.25,
      "ambient_coefficient": 0.2,
      "specular_coefficient": 0.4,
      "specular_exponent": 20
    }
  ],
  "reinhard_key_value": 1.5,
  "reinhard_delta": 0.01
}"#;


    //let mut file = File::open("./configuration.json").unwrap();
    //let mut contents = String::new();
    //file.read_to_string(&mut contents).unwrap();


    let ray_tracer = RayTracer::new(&config);
    //ray_tracer.draw("img/scene.png");

    for x in 0..200 {
        for y in 0..200 {
            println!("{}", ray_tracer.trace_pixel(x, y));
        }
    }

    /*
    for i in 0..100 {
        println!("{}", ray_tracer.draw_pixel(i, 100));
    }
    */
}


