class QuerySelector {
  static applyToClass(klass, f) {
    [].forEach.call(document.querySelectorAll("." + klass), (element) => {
      f(element);
    });
  }
}

export default QuerySelector;