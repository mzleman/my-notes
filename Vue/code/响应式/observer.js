
// const Dep = require('./dep');
let DEPINDEX = -1;
class Dep {
    constructor() {
        this.id = ++DEPINDEX;
        this.subs = []; 
    }
    addSub(watcher) {
        this.subs.push(watcher);
    }
    removeSub(watcher) {
        const index = this.subs.findIndex(watcher);
        if(index != -1) {
            this.subs.splice(index, 1);
        }
    }
    depend() {
        this.addSub(Dep.target);
    }
    notify() {
        this.subs.forEach( watcher => {
            watcher.update();
        } )
    }
}


function observe(value) {
    if(Object.prototype.toString.call(value) !== '[object Object]') {
        return;
    }
    const ob = new Observer(value);
    // value.__ob__ = ob;
    Object.defineProperty(value, '__ob__', {
        configurable: true,
        value: ob,
        enumerable: false,
    })
    return ob;
}


function defineReactive(obj, key, val) {
    let dep = new Dep();
    let childOb = observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            if(Dep.target) {
                dep.depend();
                if(childOb) {
                    childOb.dep.depend();
                }
            }
            return val;
        },
        set(newVal) {
            if(newVal === val) {
                return;
            }
            childOb = observe(newVal);
            val = newVal;
            dep.notify();
        }
    }); 
}
class Observer {
    constructor(value) {
        this.value = value;
        this.dep = new Dep();
        this.walk();
    }
    walk() {
        const obj = this.value;
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key]);
        })
    }
}


function parsePath(path) {
    const segments = path.split('.');
    return function (obj) {
        const fn = (pre, cur) => {
          return pre[cur];
        }
        return segments.reduce(fn, obj);
    }
}
class Watcher {
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
        // this.update();
    }
    get() {
      Dep.target = this;
      const value = this.getter.call(this.vm, this.vm);
      Dep.target = undefined;
      return value;
    }
    update() {
        const oldValue = this.value;
        // this.value = this.getter.call(this.vm, this.vm);
        this.value = this.get();
        this.callback.call(this.vm, this.value, oldValue);
    }
}

let data = {
    title: 'xxx',
    info: {
        student: {
            name: 'mz',
            age: 23
        }
    }
}

let vm = {
    data
}

observe(data);
function printf(newVal, oldVal) {
    console.log('watcher 更新: ', oldVal, ' => ', newVal);
}
function updateBox(newVal, oldVal) {
    const box1 = document.getElementById('box1');
    newVal = typeof newVal === 'object'? JSON.stringify(newVal) : newVal;
    oldVal = typeof oldVal === 'object'? JSON.stringify(oldVal) : oldVal;
    box1.innerHTML = `
        <h2>${newVal}</h2>
        <p>watcher 更新:  ${oldVal}  => ${newVal}</p>
    `
}


let w =  new Watcher(vm, 'data.info', printf);
box.innerHTML = w.value;
// new Watcher(vm, 'data.info.student', printf);
console.log(data);