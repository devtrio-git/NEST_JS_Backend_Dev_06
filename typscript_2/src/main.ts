// Handling Primitive Types
// string, number, Boolean, null, undefined, any


let x = "Hello";
// x = "10";
// console.log(x);




// assign multi type
let y: string | number = 'World';
y = 20;

console.log(x + y);






// list/array 
let arr: string[] = ["A", "B", "C"];
console.log(arr);

// mix allowed
let arr2: (string | number | boolean)[] = ["A", "B", "C", 29, true];
console.log(arr2);

// ither all strings OR all numbers

let arr3: string[] | number[] = [3, 5, 2];
console.log(arr3);



// object

let obj: { id: number, name: string, salary: number } = {
  id: 2,
  name: "Irfan",
  salary: 33333333,
}

// obj.salary = true;

// console.log(obj);


// customer type like type User = {}, with optional params

type User = {
  id: number,
  phone: number,
  name: string,
  isStudent?: boolean
}

let user1: User = {
  id: 22,
  phone: 342342342234,
  name: 'Burhan',
  isStudent: true
}

let user2: User = {
  id: 22,
  phone: 342342342234,
  name: "Owais"
}

console.log(user1, user2.isStudent);

type numStr = number | string;


let z: numStr = 23;
z = "malik";

console.log(z);



// Union Types (|) — “OR” Types
// in Types, Func Arg sample..
// type UserRole = "ADMIN" | "USER";







// Intersection Types (&) — “AND” Types
// type Staff = Person & Employee;

type Student = {
  name: string,
  id: number
}


type Teacher = {
  name: string,
  salary: number
}


type SeniorStudent = Student & Teacher;
type StudentOrTeacher = Student | Teacher;
type OnlySeniorStudent = Student


let s_std: SeniorStudent = {
  id: 23,
  name: "Ashar",
  salary: 22232323,
}

let s_std2: OnlySeniorStudent = {
  id: 23,
  name: "Ashar",
}


let new_std: StudentOrTeacher = {
  id: 23,
  name: "Ashar",
  salary: 22232323,
}
console.log(s_std, s_std2, new_std);





// simple func
// array func

function sum(n1: number, n2: number): number {
  return n1 + n2;
}

console.log(sum(23, 23));


const sub = (n1: number, n2: number): number => n1 - n2
console.log(sub(20, 10));




// Enums
// enum Direction {
//   Up = 1,
//   Down,
//   Left,
//   Right,
// }

enum Role {
  Admin = "Admin",
  User = "User"
}

let user_type: Role = Role.User;
console.log(user_type);


// Sample code
// NEST_JS use arrow func inside decoradors
// @OneToMany(() => Post, post => post.user)
// posts: Post[];


