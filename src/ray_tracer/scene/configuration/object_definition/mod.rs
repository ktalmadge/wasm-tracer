extern crate cgmath;

extern crate serde;
extern crate serde_json;

use color::Color;
use object::Shape;
use object::material::Material;
use reader::Reader;

#[derive(Serialize, Deserialize)]
pub struct ObjectDefinition {
    //pub filename: String,
    pub contents: Vec<String>,
    pub color: Vec<u8>,
    pub reflectance: f64,
    pub ambient_coefficient: f64,
    pub specular_coefficient: f64,
    pub specular_exponent: f64,
}

impl ObjectDefinition {
    pub fn read_shapes(&self) -> Vec<Shape> {
        let mut r: Reader = Reader::new();
        let material: Material = Material::new(
            self.parsed_color(),
            self.reflectance,
            self.ambient_coefficient,
            self.specular_coefficient,
            self.specular_exponent,
        );
        //r.read_file(&(self.filename), material).unwrap();
        r.read_config(&(self.contents), material).unwrap();
        r.shapes
    }

    fn parsed_color(&self) -> Color {
        Color::from_rgb(self.color[0], self.color[1], self.color[2])
    }
}
