import { memory } from "../../../build/ray-tracer/wasm/raytracer_bg.wasm";
import { RayTracer } from "../../../build/ray-tracer/wasm/raytracer";

const raytracer_wasm = import("../../../build/ray-tracer/wasm/raytracer");

class RayTracerComponent {
  constructor(canvas) {
    this.raytracer = raytracer_wasm.then(raytracer => {
      return RayTracer.new(this.configuration());
    });
    this.x = 0;
    this.y = 0;
    this.totalDrawn = 0;
    this.should_trace = false;
    this.canvas = canvas;
    this.canvas.width = 100;
    this.canvas.height = 100;
  }

  componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  };

  next_pixel() {
    (this.y++) % this.canvas.height;
    if(this.y >= this.canvas.width) {
      this.y = 0;
      this.x++;
    }

    this.totalDrawn++;

    return this.x < this.canvas.width;
  }

  progress_percentage(){
    return (((this.totalDrawn + 1)/ (this.canvas.width * this.canvas.height)) * 100).toFixed(1);
  }

  draw_with_wait(raytracer) {
    return (async () => {
      const progress = document.getElementById('progress');
      console.log("PROGRESS: " + progress);
      const ctx = this.canvas.getContext('2d');
      do {
        progress.innerText = this.progress_percentage() + "%";
        let pixel = raytracer.trace_pixel(this.x, this.y);
        ctx.fillStyle = this.rgbToHex(pixel.r(), pixel.g(), pixel.b());
        ctx.fillRect(
            this.x, this.y, 1, 1
        );

        if(this.y % 100 === 0) {
          var wait = ms => new Promise((r, j) => setTimeout(r, ms));
          await wait(1);
        }
      } while (this.next_pixel() && this.should_trace);
    });
  }

  draw(){
    let f = this.raytracer.then(raytracer => {
      return this.draw_with_wait(raytracer);
    });

    f.then(asd => {asd()});
  }

  configuration() {
    return `{
      "threads": 1,
      "samples": 1,
      "use_kd_tree": true,
      "max_kd_tree_depth": 20,
      "width": 100,
      "height": 100,
      "camera_position": [0.5, 10, 25.0],
      "camera_target": [0.0, -3.0, 0.0],
      "camera_up": [0.0, 1.0, 0.0],
      "viewport_distance": 1.0,
      "viewport_width": 1.0,
        "lights": [
          {
            "position": [100, 0, 100.0],
            "intensity": 3,
            "color": [255, 255, 255]
          },
          {
            "position": [-100, 0, 100.0],
            "intensity": 5,
            "color": [255, 255, 255]
          }
        ],
      "objects": [
          {
            "color": [150, 150, 150],
            "reflectance": 0.5,
            "ambient_coefficient": 0.2,
            "specular_coefficient": 0.4,
            "specular_exponent": 20,
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
              ]
          },
          {
              "color": [255, 255, 255],
              "reflectance": 0.2,
              "ambient_coefficient": 0.2,
              "specular_coefficient": 0.4,
              "specular_exponent": 20,
              "contents": [
                  "g floor",
                  "v -50.0 -5 60.0    # Front left",
                  "v -50.0 -5 -25.0   # Back left",
                  "v 50.0 -5 -25.0    # Back right",
                  "v 50.0 -5 60.0     # Front right",
                  "f 3 2 1",
                  "f 1 4 3"
              ]
          },
          {
              "color": [50, 50, 50],
              "reflectance": 0.2,
              "ambient_coefficient": 0.2,
              "specular_coefficient": 0.4,
              "specular_exponent": 20,
              "contents": [
                  "g ceiling",
                  "v -50.0 55 -25.0    # Front left",
                  "v -50.0 55 60.0     # Back left",
                  "v 50.0 55 60.0      # Back right",
                  "v 50.0 55 -25.0     # Front right",
                  "f 3 2 1",
                  "f 1 4 3"
              ]
          },
          {
            "color": [200, 200, 200],
            "reflectance": 0.0,
            "ambient_coefficient": 0.2,
            "specular_coefficient": 0.4,
            "specular_exponent": 20,
              "contents": [
                  "g back wall",
                  "v -50 -5 -25    # 1 Bottom left",
                  "v -50 55 -25   # 2 Top left",
                  "v 50 55 -25    # 3 Top right",
                  "v 50 -5 -25     # 4 Bottom right",
                  "g left wall",
                  "v -50 -5 60     # 5 Bottom left",
                  "v -50 55 60    # 6 Top left",
                  "v -50 55 -25   # 7 Top right",
                  "v -50 -5 -25    # 8 Bottom right",
                  "g right wall",
                  "v 50 -5 -25     # 9  Bottom left",
                  "v 50 55 -25    # 10 Top left",
                  "v 50 55 60     # 11 Top right",
                  "v 50 -5 60      # 12 Bottom right",
                  "g front wall",
                  "v 50 -5 60    # 13 Bottom left",
                  "v 50 55 60   # 14 Top left",
                  "v -50 55 60  # 15 Top right",
                  "v -50 -5 60   # 16 Bottom right",
                  "f 1 2 3",
                  "f 3 4 1",
                  "f 5 6 7",
                  "f 7 8 5",
                  "f 9 10 11",
                  "f 11 12 9",
                  "f 13 14 15",
                  "f 15 16 13"
              ]
          }
      ],
    "max_reflections": 5,
    "reinhard_key_value": 1.88,
    "reinhard_delta": 0.01
  }
`;
  }
}

export default RayTracerComponent;