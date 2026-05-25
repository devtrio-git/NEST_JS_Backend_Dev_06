# TypeScript Practice Questions

1.  **Variables & Scoping**
    -   **Question:** Write a code block using `{}`. Inside it, declare a variable using `var` and another using `let`. Try to access both outside the block. What happens and why?

2.  **Basic Type Annotations**
    -   **Question:** Declare a variable named `courseName` of type `string` and assign it a value. Then, try assigning a number to it and observe the error.

3.  **Union Types & Arrays**
    -   **Question:** Create an array named `mixedData` that can hold both `string` and `number` types. Initialize it with values `["TypeScript", 2024, "NestJS", 5]`.

4.  **Custom Types & Optional Properties**
    -   **Question:** Define a custom type alias `Product` with properties: `id` (number), `title` (string), and an optional `price` (number). Create a valid object of this type without the `price`.

5.  **Intersection Types**
    -   **Question:** You have two types: `Admin = { role: string }` and `User = { name: string }`. Create a new type `SuperUser` that is an intersection of both. Create an object adhering to `SuperUser`.

6.  **Functions & Arrow Syntax**
    -   **Question:** Convert the following function to an arrow function explicitly specifying argument and return types:
        ```typescript
        function multiply(a: number, b: number): number {
            return a * b;
        }
        ```

7.  **Interfaces & Inheritance**
    -   **Question:** Define an interface `IVehicle` with a method `drive()`. Then create a class `Car` that implements `IVehicle`. Add a private property `speed` to the class and a method to get its value.

8.  **Classes & Static Methods**
    -   **Question:** Create a class `MathUtils` with a **static** method `calculateArea(radius: number)` that returns the area of a circle. Call this method without creating an instance of the class.

9.  **Generics**
    -   **Question:** Write a generic function `wrapper<T>(value: T)` that simply returns an object `{ data: value }`. Test it with a string and a number.

10. **Function Overloading**
    -   **Question:** Write function overloads for a function named `combine`.
        *   Signature 1: Accepts two strings and returns a string.
        *   Signature 2: Accepts two numbers and returns a number.
        *   Implementation: Checks types and performs distinct logic (concatenation vs addition).
