import { memory } from "../../../build/ray-tracer/wasm/raytracer_bg.wasm";
import { RayTracer } from "../../../build/ray-tracer/wasm/raytracer";

const raytracer_wasm = import("../../../build/ray-tracer/wasm/raytracer");

class RayTracerComponent {
  constructor(configuration, canvas) {
    raytracer_wasm.then(raytracer => {
      this.raytracer = RayTracer.new(JSON.stringify(configuration));
    });
    this.x = 0;
    this.y = 0;
    this.totalDrawn = 0;
    this.should_trace = false;
    this.canvas = canvas;
    this.canvas.width = configuration.width;
    this.canvas.height = configuration.height;
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

  async draw() {
    const progress = document.getElementById('progress');
    const ctx = this.canvas.getContext('2d');
    do {
      progress.innerText = this.progress_percentage() + "%";
      let pixel = this.raytracer.trace_pixel(this.x, this.y);
      ctx.fillStyle = this.rgbToHex(pixel.r(), pixel.g(), pixel.b());
      ctx.fillRect(
          this.x, this.y, 1, 1
      );

      if(this.y % this.canvas.height === 0) {
        await new Promise(resolve => setTimeout(resolve, 1));
      }
    } while (this.next_pixel() && this.should_trace);
  }
}

export default RayTracerComponent;