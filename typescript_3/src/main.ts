
interface IUser {
  id: number;
  name: string;
  email?: string
  dob: string
}

let user: IUser = {
  id: 23,
  name: "Malik",
  email: "malik@gmail.com",
  dob: "08/12/2000"
}


console.log(user);

interface IApiResponse {
  status: number;
  message: string;
}

interface IUserApiResponse extends IApiResponse {
  data: IUser[]
}

let payload: IUserApiResponse = {
  status: 200,
  message: "All users fetched",
  data: [user]
}

console.log(payload);



class User {
  id: number;
  name: string;
  private email: string;
  protected dob: string


  constructor(data: IUser) {
    this.id = data.id;
    this.email = data.email ?? "";
    this.name = data.name
    this.dob = data.dob
  }

  getEmail() {
    return this.email
  }

  // getDoB() {
  //  return this.dob
  // }

}

let u = new User(user);
console.log(u.getEmail());



class Teacher extends User {
  readonly salary: number

  constructor(s: number, u: IUser) {
    super(u)
    this.salary = s;
  }

  getDoB() {
    return this.dob
  }

}


const t = new Teacher(100000, user);
t.getDoB()
console.log(t, 'teacher');

class Car {
  constructor(public readonly model: string) { };

  static TransformCarData(c: number): string {
    return c.toString();
  }
}

let data = 2020;
let transform_data = Car.TransformCarData(data);

let car = new Car(transform_data);
console.log(car.model);
