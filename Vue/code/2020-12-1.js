let obj = {
    name: 'obj',
    age: 23,
    data: {
        gender: '男'
    }
}

// function defineReactive(obj, key, val) {
//     Object.defineProperty(obj, key, {
//         enumerable: true,
//         configurable: true,
//         get() {
//             console.log(`get: ${obj.name}[${key}]`);
//             return val;
//         },
//         set(newVal) {
//             console.log(`set：${obj.name}[${key}]`);
//             val = newVal;
//         }
//     });
// }
// defineReactive(obj, 'data', obj['data']);
// obj.data.gender = '女';
// console.log(Object.prototype.toString.call(obj));
let property = Object.getOwnPropertyDescriptor(obj, 'name')
console.log(property.set);
console.log(property.get);
console.log( (! undefined|| undefined));
// console.log(Array.isArray({0: 1, length: 1}));