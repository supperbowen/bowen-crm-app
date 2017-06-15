import mkProp from './mk-prop';

export default function mixin(target, source) {
  if (!source || !target) {
    return;
  }
  for (let prop in source) {
    var config = {
      get() {
        return source[prop];
      },
      set(value) {
        source[prop] = value;
      }
    }

    mkProp(target, prop, config);
  }
}
