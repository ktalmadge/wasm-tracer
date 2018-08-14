import { memory } from "../../../build/ray-tracer/wasm/raytracer_bg.wasm";
import { RayTracer } from "../../../build/ray-tracer/wasm/raytracer";

const raytracer_wasm = import("../../../build/ray-tracer/wasm/raytracer");

class RayTracerComponent {
  constructor(canvas){
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }

  updateConfiguration(configuration, onError) {
    raytracer_wasm.then(raytracer => {
      try {
        this.raytracer = RayTracer.new(JSON.stringify(configuration));
      } catch(error) {
        if(onError !== undefined){
          onError(error)
        }
      }
    });

    if(this.canvas.width !== configuration.width,
        this.canvas.height !== configuration.height) {
      this.canvas.width = configuration.width;
      this.canvas.height = configuration.height;
      this.context.fillStyle = 'black';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.x = 0;
    this.y = 0;
    this.totalDrawn = 0;
    this.should_trace = false;
    this.canvas.className = "ready";
    this.configuration = configuration;
  };

  componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  };

  next_pixel() {
    if(this.y++ >= this.canvas.height) {
      this.y = 0;
      this.x++;
    }

    this.totalDrawn++;

    return this.x < this.canvas.width;
  }

  progress_percentage(){
    return (
        Math.min(
            100,
            ((this.totalDrawn + 1) / (this.canvas.width * this.canvas.height))
            * 100
        )
    ).toFixed(1);
  }

  async draw() {
    const progress = document.getElementById('progress');
    do {
      progress.innerText = this.progress_percentage() + "%";
      let pixel = this.raytracer.trace_pixel(this.x, this.y);
      this.context.fillStyle = this.rgbToHex(pixel.r(), pixel.g(), pixel.b());
      this.context.fillRect(
          this.x, this.y, 1, 1
      );

      if((this.y + 1) % this.canvas.height === 0) {
        await new Promise(resolve => setTimeout(resolve, 1));
      }
    } while (this.next_pixel() && this.should_trace);
  }
}

export default RayTracerComponent;