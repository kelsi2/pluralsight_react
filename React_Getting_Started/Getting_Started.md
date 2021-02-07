# Getting Started With React

## The Basics

- Fundamental Concepts:

  1. Components

  - Basically JS functions (input (props, state) -> output (UI))
    - Props are immutable, state can be updated
  - Reusable and composable
  - Invoked like a regular HTML element (<Component />)
  - Can manage private state unlike pure functions (hold data that can change over component lifetime)
  - Can be function or class components (functions preferred but classes can be more powerful)

  2. Reactive Updates

  - When state (input) changes, so does UI (output)
  - React will react to the changes without us managing anything (hence the name React)
  - Updates are taken to the browser

  3. Virtual views in memory

  - Generate HTML using JS
  - No HTML template language so views can be kept in memory to avoid re-rendering
  - Tree reconciliation (virtual DOM)

- Using jscomplete.com/playground
  - MountNode can be retrieved by document.getElementById('mountNode').innerHTML = 'Hello!';
    - This will be displayed in the preview

* JSX is not executed by HTML but by a JSX compiler to run in the browser (this creates React.createElement tags to send to the DOM)

  - We can write what looks like HTML and don't need to worry about what the compiler is doing behind the scenes

  * The same thing happens when we render a component like <Hello />

* UseState hook uses two things: state object (getter) and updater function (setter)

  - Can be any type (string, number, array, object, etc.)

  * We are destructuring the array to create variables and setting an initial state for the state object (const [counter, setCounter] = useState(0);)

* onClick event handler receives a functionRef in curly braces (e.g. the name of the func without parenthesis, we aren't invoking it just providing a pointer to the function)

  - We can also provide an inline arrow function definition, such as () => console.log(Math.random()), inside the onClick event instead of writing it separately (not invoking the function but defining it and passing it to the onClick prop)

  * Final onClick looks like this: onClick={() => setCounter(counter + 1)} so counter gets updated each time the button is clicked
  * All we are doing here is managing state of the variable, we don't need to do anything to reflect this in the browser, react does this automatically for us

* Best practices:

  - Wrap return in () and break components into multiple lines for easy reading

  * onClick functions should be extracted rather than handled inline (needs to be defined within the component to use the state we are managing but should be above the return)
    - Call this handleClick
  * Functionality should be split across components (e.g. we are using one component to render the button and another to manage the state)
    - To render multiple components we can place them in an array (e.g. [<Button />, <Display />]) -> This is best if all elements in a component are coming from the same place in a dynamic way, not ideal for this case
    * Better option is to make the two elements the children of another React element then render that (e.g. <React.Fragment> <Button /> <Display /> </React.Fragment>) -> React.Fragment can be condensed to <>
      - This should be done in a component rather than in the render itself

* In order for state to be accessible to more than one component we need to manage it in the parent component (in this case App) so it can be passed down to the children

  - Props allow components to be reusable and dynamic (in our example rather than incrementing 1, we can pass an increment value prop and increment by that)

* [Final code for this example](jscomplete.com/playground/rgs1.6)

* The benefit of tree reconciliation in React (rendering JS rather than HTML) has to do with not the initial rendering but what happens as we make changes
* Given the following code we are rendering the dom every second:

```r
const render = () => {
    document.getElementById('mountNode').innerHTML = `
    <div>
      Hello HTML
      <input />
      <pre>${(new Date).toLocaleTimeString()}</pre>
    </div>
  `;

    ReactDOM.render(
      React.createElement(
        'div',
        null,
        'Hello React',
        React.createElement('input', null),
        React.createElement('pre', null, (new Date).toLocaleTimeString())
      ),
      document.getElementById('mountNode2'),
    );
  }

setInterval(render, 1000);
```

- As the render occurs the HTML state of the input field disappears but the React state stays across the renders because only the timestamp is being re-rendered, not the whole dom (it only renders the thing being changed, the rest is rendered from memory)
  - This can be done with HTML as well but takes a lot of adjustments where React does this for us automatically with no extra effort

## Modern JS Crash Course

### Variables and Block Scopes

- Block scope is created with curly braces including if and for statements
  - If var variables are defined in block scope they are available globally, not just inside the scope
  - This is why we use let instead of var, this creates a scope that is limited to that block instead of globally

* Function scope is different from block scope (if using var inside a function this will not be available outside of the function scope)

* Can also create nested block scope, as long as we are using let or const variables defined in a nested block will only be available within that block, not in the other levels

* Const strings and numbers (scalar values) are immutable, but const arrays and objects are still mutable! The reference is constant but the values are not
  - Const is always preferred over let unless the value is likely to change. When using const with scalar values we have a guarantee that the value hasn't changed without needing to parse the code between the references. This is not true for let

### Arrow Functions

- Preferred over function for shorter syntax and more predictable behaviour with closures
  - Arrow function doesn't care who called it but a regular function does (e.g. this is bound to the caller of the function in a standard function, but in an arrow function this is bound to the scope of the function itself, not the caller)
    - This can cause problems in a regular function if the caller is unclear as this can end up bound to the global window object
    - In arrow functions this is bound to the value at the time of calling which makes it great for delayed execution where the value may change

* Arrow functions can also be simplified by removing curly braces and parentheses for simple functions

### Object Literals

- Objects can be defined as a const without needing to say new Object...
  - We can just lay out exactly what we expect it to look like with keys and values
  - With object literals you can also define functions with short syntax like f1: () {} or f2: () => {}
  * Dynamic properties can be defined as [mystery], this can then be extracted when the value is assigned (e.g we can say const mystery = 'answer', answer is then the key that takes the place of the dynamic key [mystery])

### Destructuring and Rest/Spread

- You can extract properties like so: const { PI, E, SQRT2 } = Math;
  - This will pull all three properties out of the object into the global scope (rather than saying Math.PI, you can just say PI)
  * Useful when you need to use a few properties out of a large object

* In terms of React we can destructure when importing from 'react' so we can just say something like useState() rather than React.useState()
* For functions you can use destructuring to pass in keys from an object:

```js
const circle = {
  label: "circlex",
  radius: 2,
};

const circleArea = ({ radius }, { precision = 2 } = {}) =>
  (PI * radius * radius).toFixed(precision);

console.log(circleArea(circle));
```

- Rather than importing the full circle object and saying circle.radius, we can just pull the property we need

* We can also assign a default value with destructuring as seen with precision above (if we supply a different value for precision when calling the function that value will be used instead)

  - Adding the = {} makes the precision property optional, we don't need to pass anything in when we call the function

* Destructuring can also be used for arrays (see useState in React)

```js
const [first, second, , fourth] = [10, 20, 30, 40];
```

- Double commas are used to skip destructuring the third value into a variable

* The rest operator is used to filter values or split an array

```js
const [first, ...restOfItems] = [10, 20, 30, 40];

console.log(first); //10
console.log(restOfItems); //[20, 30, 40]

const data = {
  temp1: "001",
  temp2: "002",
  firstName: "John",
  lastName: "Doe",
};

// This will create a new object called person which will contain only firstName and lastName, we are filtering temp1 and temp2 from the data object using rest
const { temp1, temp2, ...person } = data;

// Using spread to copy the restOfItems array, this will create a shallow copy of the original array so anything used on the spread array will also affect the original
const newArray = [...restOfItems];

// Spread can also be used for objects
const newObject = {
  ...person,
};
```

### Template Strings

- Back ticks allows for dynamic input using ${}

### Classes

- Classes are templates/blueprints that can be extended when defining new classes, this will copy the properties and methods from the original class into the new one

* Objects can be instantiated using the new keyword (these will have access to all properties and methods in the class)

### Promises and Async/Await

- Deliver data later in the program (asynchronously)
  - Promises use .then to act on whatever data we receive
  - json can be used to parse the data, this is also done asynchronously
  - Promises get messy especially when we need to use looping logic, there is a lot of nesting to deal with

```js
const fetchData = () +> {
  fetch('https://api.github.com').then(resp => {
    resp.json().then(data => {
      console.log(data)
    })
  })
}
```

- Async/Await is a more modern and clean way to handle fetching data

```js
const fetchData = async() => {
  const resp = await fetch('https://api.github.com);

  const data = await resp.json();

  console.log(data);
}

fetchData();
```

- Using this we are awaiting the response then the process can run
