extern crate cgmath;

use self::cgmath::*;

pub mod material;
pub mod sphere;
pub mod triangle;

use ray::Ray;
use self::sphere::Sphere;
use self::triangle::Triangle;

#[derive(Copy, Clone, PartialEq)]
pub enum Shape {
    Triangle(Triangle),
    Sphere(Sphere),
}

impl Shape {
    pub fn normal(
        &self,
        intersection: Vector3<f64>,
        incoming_vector: Vector3<f64>,
    ) -> Vector3<f64> {
        match *self {
            Shape::Triangle(triangle) => triangle.normal(intersection, incoming_vector),
            Shape::Sphere(sphere) => sphere.normal(intersection, incoming_vector),
        }
    }

    pub fn intersect(&self, ray: &Ray) -> Option<Vector3<f64>> {
        match *self {
            Shape::Triangle(triangle) => triangle.intersect(ray),
            Shape::Sphere(sphere) => sphere.intersect(ray),
        }
    }

    pub fn material(&self) -> material::Material {
        match *self {
            Shape::Triangle(triangle) => triangle.material,
            Shape::Sphere(sphere) => sphere.material,
        }
    }

    pub fn min_extent(&self) -> Vector3<f64> {
        match *self {
            Shape::Triangle(triangle) => triangle.min_extent(),
            Shape::Sphere(sphere) => sphere.min_extent(),
        }
    }

    pub fn max_extent(&self) -> Vector3<f64> {
        match *self {
            Shape::Triangle(triangle) => triangle.max_extent(),
            Shape::Sphere(sphere) => sphere.max_extent(),
        }
    }

    pub fn midpoint(&self) -> Vector3<f64> {
        match *self {
            Shape::Triangle(triangle) => triangle.midpoint(),
            Shape::Sphere(sphere) => sphere.midpoint(),
        }
    }
}
