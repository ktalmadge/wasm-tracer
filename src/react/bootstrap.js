// Currently WebAssembly modules cannot be synchronously imported in the main
// chunk: https://github.com/webpack/webpack/issues/6615
//
// By dynamically importing, webpack will split it into a separate chunk
// automatically, where synchronous imports of WebAssembly is allowed.
let tracer_import = import('./ray_tracer/ray_tracer_component');
tracer_import.then(tracer_class => {
  let ray_tracer = new tracer_class.default(document.getElementById('trace-target'));
  document.getElementById('toggle').onclick = (event) => {
    ray_tracer.should_trace = !ray_tracer.should_trace;

    if(ray_tracer.should_trace) {
      event.target.textContent = "Stop Tracing";
      ray_tracer.draw();
    } else {
      event.target.textContent = "Start Tracing";
    }
  };
});