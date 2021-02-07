# GitHub Cards App

- Built using React Class components

- First decision to make is how many components to make and what they will do
  - This is often very difficult unless you have a full picture of the app which is rare at the beginning so start with what makes sense initially and rename/delete as needed

* Components for this app: Card and List since we are trying to represent GitHub users on cards

* Class components need to extend React.Component and must have a render function which returns the virtual DOM to render from that component
* Props and state are managed on an instance of the class using this, we don't pass them into the function
  - Title is passed into the ReactDOM.render (parent) and can be referenced as this.props.title in the class App (child)

```js
class App extends React.Component {
  render() {
    return <div className="header">{this.props.title}</div>;
  }
}

ReactDOM.render(<App title="The GitHub Cards App" />, mountNode);
```

- Adding our first component:

```js
class Card extends React.Component {
  render() {
    return (
      <div className="github-profile">
        <img src="https://placehold.it/75" />
        <div className="info">
          <div className="name">Name here...</div>
          <div className="company">Company here...</div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Card />
      </div>
    );
  }
}

ReactDOM.render(<App title="The GitHub Cards App" />, mountNode);
```

- To style React Components without an external stylesheet we can add styles inline as: style={{ margin: '1rem' }} -> Double curly braces creates an object literal inside the JSX curly bracket syntax
  - Syntax is JS not CSS (camelCase names and strings for values)
  * We can actually use JS logic in a style tag (such as conditionally changing the color based on a value returned from Math.random() for example)

* We can mix functional and class components, not necessary to use one or the other, so CardList will be functional not class based
* We make Card render dynamically by passing in props rather than hard coding the data to render, we can use the spread operator for this

```js
const testData = [
  {
    name: "Dan Abramov",
    avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
    company: "@facebook",
  },
  {
    name: "Sophie Alpert",
    avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
    company: "Humu",
  },
  {
    name: "Sebastian Markbåge",
    avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4",
    company: "Facebook",
  },
];

const CardList = (props) => (
  <div>
    // Map over the testData array and pass the profile props into each card
    render
    {testData.map((profile) => (
      <Card {...profile} />
    ))}
  </div>
);

class Card extends React.Component {
  render() {
    // This refers to an instance of the Card component (so it changes each time it is rendered depending on the props passed in)
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <CardList />
      </div>
    );
  }
}

ReactDOM.render(<App title="The GitHub Cards App" />, mountNode);
```

- Make sure components are only handling one responsibility. E.g. the Form component should not be rendered in the CardList component because the purpose of the two components is completely different
  - Instead we render it at the top level in App as a sibling to CardList component

* testData is a global variable which is not good, we don't want our components to read global variables. Instead we can pass it in as a prop on the app level so only the top level is reading a global variable

* Question of where to manage the state for card profiles? We will be searching profiles to render in the Form component which needs to force a render in the CardList component. So while the CardList is the only one that needs a render, we can't trigger a render from a sibling component (like Form and CardList), so state needs to be managed at the top level to trigger a render in the CardList
  - In class components we use constructor to manage state, constructor must call super with props in order to use the React.Component class
  * In classes the state MUST be an object, no other type will work
  * We can bypass the constructor and instead just write state = {}

```js
const testData = [
  {
    name: "Dan Abramov",
    avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
    company: "@facebook",
  },
  {
    name: "Sophie Alpert",
    avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
    company: "Humu",
  },
  {
    name: "Sebastian Markbåge",
    avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4",
    company: "Facebook",
  },
];

const CardList = (props) => (
  <div>
    {props.profiles.map((profile) => (
      <Card {...profile} />
    ))}
  </div>
);

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  render() {
    return (
      <form action="">
        <input type="text" placeholder="GitHub username" />
        <button>Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  // constructor (props) {
  //   super(props);
  //   this.state = {
  //     profiles: testData
  //   };
  // }

  state = {
    profiles: testData,
  };

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

ReactDOM.render(<App title="The GitHub Cards App" />, mountNode);
```

- In order to take input from the user in the form component we can use an onSubmit handler, this allows you to use native js form features like making fields required
- Need to use the event.preventDefault on the handleSubmit in order to prevent the page from refreshing

* We create a ref in order to get the id of the user that is searched for, this is instantiated on each render
  - Can also use controlled components which have some advantages over createRef but requires more code. We do this by creating state to track whatever we are passing into the search field
  * In order to use this we need to create an onChange handler, otherwise we can't type into the input field
    - onChange gets run with every character we type into the field so the state is constantly updated
    * This is useful instead of a ref if we need to provide feedback with each character such as a tweet

```js
class Form extends React.Component {
  // userNameInput = React.createRef();
  state = { userName: "" };
  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.userNameInput.current.value);
    console.log(this.state.userName);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="GitHub username"
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
          // ref={this.userNameInput}
          required
        />
        <button>Add card</button>
      </form>
    );
  }
}
```

- We can now call information from the GitHub api using axios
- We want to pass the data retrieved from the form to update the state of the profiles in the App component, but we can't pass data from child (Form) to parent (App)
  - What we can do is pass a function reference as a prop from the App component and update the state using that function in the Form component. This will allow the app state to update

* Final code:

```js
// gaearon, sophiebits, sebmarkbage, bvaughn

const CardList = (props) => (
  <div>
    {props.profiles.map((profile) => (
      <Card key={profile.id} {...profile} />
    ))}
  </div>
);

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = { userName: "" };
  handleSubmit = async (event) => {
    event.preventDefault();

    const resp = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );
    this.props.onSubmit(resp.data);
    this.setState({ userName: "" });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
          placeholder="GitHub username"
          required
        />
        <button>Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: [],
  };

  addNewProfile = (profileData) => {
    this.setState((prevState) => ({
      profiles: [...prevState.profiles, profileData],
    }));
  };

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

ReactDOM.render(<App title="The GitHub Cards App" />, mountNode);
```

- We did not do any error handling, need to consider invalid input and network problems, see [beyond the basics book](jscomplete.com/react-beyond-basics) for more on this

* We also could extract the code further so each component is only handling one type of logic
