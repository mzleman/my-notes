//   const Dep = require('./dep');
  
  function parsePath(path) {
      const segments = path.split('.');
      return function (obj) {
          const fn = (pre, cur) => {
            return pre[cur];
          }
          return segments.reduce(fn, obj);
      }
  }
  export default class Watcher {
      constructor(vm, expOrFn, callback) {
          this.vm = vm;
          this.expOrFn = expOrFn;
          this.callback = callback;
          if (typeof expOrFn === 'string') {
            this.getter = parsePath(expOrFn);
          } else if (typeof expOrFn === 'function') {
              console.error('expOrFn is a function');
          }
          this.value = this.get();
      }
      get() {
        Dep.target = this;
        const value = this.getter.call(this.vm, this.vm);
        Dep.target = undefined;
        return value;
      }
      update() {
          const oldValue = this.value;
          this.value = this.getter.call(this.vm, this.vm);
          this.callback.call(this.vm, this.value, oldValue);
      }
  }