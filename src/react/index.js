import { memory } from "../../build/ray-tracer/wasm/raytracer_bg.wasm";
const raytracer = import("../../build/ray-tracer/wasm/raytracer");
import { RayTracer, Pixel } from "../../build/ray-tracer/wasm/raytracer";

raytracer.then(raytracer => {
  let configuration = `{
      "threads": 4,
      "samples": 1,
      "use_kd_tree": true,
      "max_kd_tree_depth": 20,
      "width": 300,
      "height": 300,
      "camera_position": [3, 0, 20.0],
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
            "color": [0, 150, 200],
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
              "color": [50, 50, 255],
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
              "color": [255, 50, 255],
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

  let componentToHex = function(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  let rgbToHex = function(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  console.log(configuration);

  let ray_tracer = RayTracer.new(configuration);

  //let pixel = Pixel.new(50, 50, 50);
  let pixel = ray_tracer.trace_pixel(100, 100);
  console.log(raytracer);
  console.log("TRACING: " + pixel.r() + ", " + pixel.g() + ", " + pixel.b());

  const canvas = document.getElementById('trace-target');
  canvas.width = 300;
  canvas.height = 300;

  const ctx = canvas.getContext('2d');


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  let x = 0;
  let y = 0;
  let increment_pixel = () => {
    (y++) % 300;
    if(y >= 300) {
      y = 0;
      x++;
    }

    return x < 300
  };

  let should_trace = false;

  const trace = async () => {
    do {
      let pixel = ray_tracer.trace_pixel(x, y);

      ctx.beginPath();
      ctx.fillStyle = rgbToHex(pixel.r(), pixel.g(), pixel.b());
      ctx.fillRect(
          x, y, 1, 1
      );
      ctx.stroke();

      if (y % 100 == 0) {
        await sleep(200);
      }
    } while(increment_pixel() && should_trace);
  };

  document.getElementById('toggle').onclick = (event) => {
    should_trace = !should_trace;

    if(should_trace) {
      event.target.textContent = "Stop Tracing";
      trace();
    } else {
      event.target.textContent = "Start Tracing";
    }
  }
});
