# React: The Big Picture

## Why React?

1. Flexibility:

- Library not a framework (like Angular and Ember) e.g. it's less opinionated
- Originally just for web apps, now used for static sites, mobile, desktop apps, server-rendered frameworks like Next.js, and VR
- Renderer is separate from React (react-dom, react-native, or react-vr) so react is more versatile
- Can be used with existing apps in specific places in the page

2. Developer experience:

- Very few concepts to master so don't need the docs much
- JSX combines HTML and JS and compiles to JS, don't need to learn new syntax
- Each component works on its own
- Error messages are detailed
- Create-React-App makes getting started easier

3. Corporate Investment:

- Created and maintained by FB
- Changes can be integrated to existing projects using a script (codemod), breaking changes are less likely because of the impact on FB so stability long term is likely

4. Community:

- 3rd most starred repo on GitHub
- Over 6 million downloads/week
- Reactiflux and Stack Overflow have lots of community input
- Easy to get answers when trying to solve a problem
- Lots of free component libraries

5. Performance:

- Virtual DOM to avoid updating the DOM and causing performance drain
- Only update DOM when components are updated
- Performance optimizations rarely needed

6. Testability:

- Design is friendly to automated testing
- Little to no config required, run in memory via Node, reliable tests for individual components, write and update quickly
- Components don't have side effects so easy to test
- Many testing frameworks available (usually Jest is used), can use any JS frameworks

## Tradeoffs

1. Framework vs. Library

- React === Library
- Frameworks like Angular and Ember offer clear opinions, less decision fatigue, less setup overhead, and more consistency
- Libraries like React are lightweight and can be added to existing apps in small places (like replacing one component on a page), you can pick what you need, choose the best tech for your project, and popular boilerplates like CRA are an option
  - Angular comes with a lot of options built in, but React gives you the option to choose and pull in only the pieces you need

2. Concise vs. Explicit

- Angular uses two-way binding which is concise, requires less coding and is automatically kept in sync
- React uses one-way binding which is explicit, requires more code but allows for more control over what happens and is easy to debug because you can see what is happening

3. Template-centric vs. JavaScript-centric

- React is JS-centric so you get autocomplete support and error messages if you use a variable that doesn't exist
  - This doesn't happen with other frameworks
- React can use JS functions like map (if you know JS you can use React)
- Templates require less JS knowledge, avoid confusion with JS binding, rule of least power (only support a subset of expressions to avoid misues)
- JS-centric React requires less framework-specific syntax so takes less time to learn, fewer concepts to learn, less code, easy to read and debug, encourages improving JS skills so skills transfer

4. Separate Template vs. Single File

- MVC: Model (JS), View (HTML), Controller (JS) vs React Component (JS and JSX)
  - With React each component is a separate file instead of one file containing the logic for one type of functionality, markup and logic are in the same file (separation of concerns are considered differently, functionality is a separate concern rather than technology)
- Separating functionality makes for easy management (don't need to go to separate files to update one thing) and allows for cleaner, more testable code and complex UIs

5. Standard vs. Non-Standard

- React is non-standard (along with Angular, Vue, and Ember)
- Standard involves templates (inert, reusable markup), custom elements, shadow DOM (encapsulated styling), and imports (bundle HTML, CSS, and JS)
  - Standard hasn't been embraced by dev community, instead people use frameworks and libraries
- Web components aren't used much because of lack of browser support (need polyfills), don't enable anything new (can do the same with a framework/library), JS libraries keep innovating (unlike web components), and they only run in the browser not on mobile or other devices

6. Community vs. Corporate Backing

- React is open source but backed by FB (corporate) so is driven by FB's needs so there is a full-time dev staff, over 1000 community contributors

## Why Not React?

1. HTML and JSX Differ

- JSX is similar but not the same as HTML since it also incorporates JS
- Converting isn't hard, can use find/replace, online compiler, or htmltojsx on npm

2. Build Step Required

- When compiling you need to run build but this is common for many languages and frameworks
- Build minifies code, transpiles, and test/lint code
- Babel and TS can both be used to compile JSX code
- CRA comes with built in build tools, no config required

3. Version Conflicts

- Can't run two versions of React so need to be careful that components all use the same version
- React Router also requires a compatible version
- These problems can be avoided by running FB codemods to update to new version, this automates everything
- To avoid conflicts when working as a team: standardize a version, upgrade react when upgrading libraries, upgrade as a team

4. Outdated Resources

- React has evolved since 2013 from class-based to functional components
  - Some content online is outdated
- Some features have been extracted from React core to keep React small and easy to import

5. Decision Fatigue

- Many options to do the same thing because React is un-opinionated
- Dev environment:
  - Many boilerplates available (CRA, Next.js, Gatsby, etc.), CRA is recommended because it includes everything you need
  - React Router and Redux are related but not included
- Classes or functions:
  - Can accomplish same with both but Functions are preferred for modern development for debugging and concise code
- PropTypes, TypeScript, or Flow:
  - PropTypes only checks types at runtime and during development
    - Recommended, easy to get started, no config, and easy to learn
  - TypeScript checks at compile time so can find out earlier about potential problems
    - Easy to get started if you know TS
  - Flow infers types when running code and checks whenever you run flow (it's a separate process)
- State:
  - React, Flux, Redux, or MobX
  - React handles state fine on its own, external libraries are optional
    - Recommended to start
  - Flux released by FB, uses centralized state
  - Redux most popular, centralized state but more elegant than Flux, easier to manage
  - MobX uses observable state, lightweight alternative, uses less code than redux
- Styling:
  - Works with CSS, SASS, LESS, etc. so start with what you know
  - There are many options available to explore later
