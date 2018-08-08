#![feature(use_extern_macros)]

extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

extern crate cgmath;
extern crate image;
extern crate rand;

#[macro_use]
extern crate serde_derive;

mod camera;
mod color;
mod intersection;
mod kd_tree;
mod light;
mod object;
mod ray;
mod reader;
mod scene;
mod tone;

use self::color::Color;
use self::scene::configuration::Configuration;
use self::kd_tree::KdTree;
use self::object::*;
use self::scene::Scene;

use std::thread;
use std::path::Path;
use std::sync::Arc;
use std::fmt;

use std::panic;

use image::{ImageBuffer, Rgba};

#[wasm_bindgen]
extern {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

fn console_log(string: &str) {
    let out: &str = &["RUST: ", &string].join("");
    log(out)
}

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ($($t:tt)*) => (console_log(&format!($($t)*)))
}

#[wasm_bindgen]
pub struct Pixel {
    r: u8,
    g: u8,
    b: u8
}

#[wasm_bindgen]
impl Pixel {
    #[wasm_bindgen(constructor)]
    pub fn new(r: u8, g: u8, b: u8) -> Pixel {
        Pixel { r, g, b }
    }
    pub fn r(&self) -> u8 { self.r }
    pub fn g(&self) -> u8 { self.g }
    pub fn b(&self) -> u8 { self.b }
}

impl fmt::Display for Pixel {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {}, {})", self.r, self.g, self.b)?;
        Ok(())
    }
}


#[wasm_bindgen]
pub struct RayTracer {
    configuration: Configuration,
    scene: Scene
}

#[wasm_bindgen]
impl RayTracer {

    #[wasm_bindgen(constructor)]
    pub fn new(configuration: &str) -> RayTracer {
        let configuration: Configuration = Configuration::parse_configuration(configuration);

        let width: usize = configuration.width;
        let height: usize = configuration.height;

        /*  Initialize KD tree */
        let mut shapes: Vec<Shape> = Vec::new();
        for object_definition in &configuration.objects {
            shapes.append(&mut (object_definition.read_shapes()));
        }

        let kd_tree: KdTree = KdTree::new(&shapes, configuration.max_kd_tree_depth);
        let arc_tree: Arc<KdTree> = Arc::new(kd_tree);
        let scene: Scene = Scene::new(&configuration, arc_tree);

        RayTracer {
            configuration,
            scene
        }
    }

    /*
    pub fn save_image(&self, filename: &str, color_buffer: &[Vec<Color>], width: usize, height: usize) {
        let mut image_buffer: ImageBuffer<Rgba<u8>, Vec<u8>> =
            ImageBuffer::new(width as u32, height as u32);

        for x in 0..width {
            for y in 0..height {
                image_buffer.put_pixel(x as u32, y as u32, color_buffer[x][y].to_rgba());
            }
        }

        image_buffer.save(Path::new(filename)).unwrap();
    }

    pub fn combine_scenes(
        &self,
        color_buffer: &mut Vec<Vec<Color>>,
        scenes: Vec<(usize, Scene)>,
        threads: usize,
    ) {
        for (thread_number, scene) in scenes {
            for (x, y) in scene.draw_iterator(threads, thread_number) {
                color_buffer[x][y] = scene.get_pixel(x, y);
            }
        }
    }
*/
    pub fn trace_pixel(&self, x: usize, y: usize) -> Pixel {
        //log!("TRACING: {}, {}", x, y);

        let color: Rgba<u8> = self.scene.sample(x, y).to_rgba();

        Pixel {
            r: color[0],
            g: color[1],
            b: color[2]
        }
    }

    /*
    pub fn draw(&self, out_file: &str) {
        let threads: usize = self.configuration.threads;
        let width: usize = self.configuration.width;
        let height: usize = self.configuration.height;

        let mut thread_handles: Vec<thread::JoinHandle<_>> = Vec::with_capacity(threads);

        /*  Initialize KD tree */
        let mut shapes: Vec<Shape> = Vec::new();
        for object_definition in &self.configuration.objects {
            shapes.append(&mut (object_definition.read_shapes()));
        }

        let kd_tree: KdTree = KdTree::new(&shapes, self.configuration.max_kd_tree_depth);
        let arc_tree: Arc<KdTree> = Arc::new(kd_tree);

        for i in 0..threads {
            let mut scene: Scene = Scene::new(&self.configuration, Arc::clone(&arc_tree));

            thread_handles.push(thread::spawn(move || {
                scene.partial_draw(threads, i);
                (i, scene)
            }));
        }

        // Collect results from each thread into one color buffer
        let mut scenes: Vec<(usize, Scene)> = Vec::with_capacity(threads);
        for thread_handle in thread_handles {
            scenes.push(thread_handle.join().unwrap());
        }

        let mut color_buffer: Vec<Vec<Color>> = vec![vec![Color::new(0f64, 0f64, 0f64); height]; width];
        self.combine_scenes(&mut color_buffer, scenes, threads);

        // Tone correction
        tone::reinhard_tone_correction(
            &mut color_buffer,
            self.configuration.width as usize,
            self.configuration.height as usize,
            self.configuration.reinhard_key_value,
            self.configuration.reinhard_delta,
        );

        // Save the image
        self.save_image(
            out_file,
            &color_buffer,
            self.configuration.width,
            self.configuration.height,
        );
    }
    */
}