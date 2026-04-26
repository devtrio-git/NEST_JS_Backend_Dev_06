// function Logger(n: string) { // Decorator Factory
//   return function (contructor: any) { // Decorator
//     const p = new contructor();
//     p.setName(n)
//     console.log(p.name);

//   }
// }



// @Logger("Sarim")
// class Teacher {
//   name = "";
//   constructor() { }

//   setName(n: string) {
//     this.name = n
//   }
// }


// // @Logger()
// // class Student {
// //   name = "";
// //   constructor() { }
// // }



// // Generics
// function merged<U extends object, V extends object>(obj1: U, obj2: V): U & V {
//   return { ...obj1, ...obj2 }
// }

// let new_obj = merged({ name: "Sarim" }, { id: 10 });
// console.log(new_obj.name);

// // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// // type guards 

// interface Bird {
//   fly: boolean
// }

// interface Animal {
//   run: boolean
// }


// function fun(n: Animal | Bird) {
//   if ("fly" in n) {
//     console.log(n.fly);
//   }
//   if ("run" in n) {
//     console.log(n.run);
//   }
// }

// fun({ fly: true } as Bird);

// // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// type numStr = number | string;

// function sum(agr1: number, agr2: number): number;
// function sum(agr1: string, agr2: string): string;
// function sum(agr1: numStr, agr2: numStr) {
//   if (typeof agr1 === 'number' && typeof agr2 === "number") {
//     return agr1 + agr2;
//   } else
//     if (typeof agr1 === 'string' && typeof agr2 === "string") {
//       return agr1 + agr2;
//     } else {
//       return new Error("Invalid Types");
//     }
// }

// let val = sum(10, 10);
// let val2 = sum("a", "b");

// console.log(val.toFixed(2));
// console.log(val2.charAt(0));


// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

class Users {
  public name = 'yasir';
  constructor() {
    console.log("Initialize User Class");
  }
}

const user = new Users();

class Posts {
  constructor(private readonly user: Users) {
    console.log(this.user.name);
    console.log("Initialize Post Class");
  }
}

class Blogs {
  constructor(private readonly user: Users) {
    console.log(this.user.name);
    console.log("Initialize Blog Class");
  }
}

const post1 = new Posts(user);
const blog1 = new Blogs(user);

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx



// inherit abs class .........
abstract class Bird {
  protected constructor() { }

  abstract getName(): string;
  fly() {
    return `${this.getName()} is flying`;
  }
}

class Crow extends Bird {
  constructor() {
    super();
  }
  getName(): string {
    return "Crow";
  }
}

class Owl extends Bird {
  constructor() {
    super();
  }

  getName(): string {
    return "Owl";
  }
}

let c1 = new Crow();
let o1 = new Owl();


console.log(c1.fly(), o1.fly());
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

abstract class ImpBird {
  abstract getName(): string;
}

class Crow1 implements ImpBird {
  getName(): string {
    return "Crow";
  }
}

class Owl1 implements ImpBird {
  getName(): string {
    return "Owl";
  }
}

let c11 = new Crow1();
let o11 = new Owl1();
console.log(c11.getName());
console.log(o11.getName());

