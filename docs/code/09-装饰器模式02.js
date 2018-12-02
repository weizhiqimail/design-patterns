class Person {
  constructor() {
    this.first = 'A';
    this.last = 'B';
  }

  @readonly
  name() {
    return `${this.first} ${this.last}`;
  }

}

function readonly(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

let p = new Person();
console.log(p.name());
// error
// p.name = function () {
//   return '111';
// };
// console.log(p.name());

function log(target, name, descriptor) {
  let oldValue = descriptor.value;
  console.log(target);
  console.log(name);
  console.log(descriptor);
  descriptor.value = function () {
    console.log(`Calling ${name} with `, arguments);
    return oldValue.apply(this, arguments);
  };
  return descriptor;
}

class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

const math = new Math();
const result = math.add(1, 8);
console.log('result, ', result);
