var ensure = {
  ensureObject(target, defaultVal) {
    defaultVal = defaultVal || {};
    return target || defaultVal;
  },
  ensureMethod(target, defaultMethod) {
    defaultMethod = defaultMethod || function () {};
    return target || defaultMethod;
  }
}

export default ensure;
