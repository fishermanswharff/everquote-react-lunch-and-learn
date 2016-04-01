# Getting Started

**Dependencies:**
Make sure you have node and npm installed (npm comes installed with node).
[Node via download][node-download] *OR* Node via Homebrew: `brew install node` (requires Homebrew)

To see if you have node and npm:
```bash
$ node -v
v5.0.0 # should see something like this
$ npm -v
3.8.3 # should see something like this
```

**Installing**
```bash
$ git clone git@github.com:fishermanswharff/everquote-react-lunch-and-learn.git
$ cd everquote-react-lunch-and-learn
$ npm install
$ gulp serve
```

**Helpful but not required**
* [React Dev Tools][react-chrome-tools]: Chrome extension provides a devTool for exploring/debugging your react components
* [Vulcan by Firebase][firebase-vulcan]: Chrome extension allows you to view and manipulate your firebase data

# Step 1: Hello World

1. `import`ing your modules
1. rendering your first component
1. component lifecycle
1. passing props from parents to children
1. thinking in react
  * Step 1: break the UI into a component hierarchy
  * Step 2: Build a static version in React
  * Step 3: Identify the minimal (but complete) representation of UI state
  * Step 4: Identify where your state should live

# Step 2: Retrieving and displaying data

1. Getting data from firebase at the appropriate time in the component lifecycle
1. `setState()` on the component
1. passing props from children to parents

# Step 3: Posting data through a form

1. Build a form in react
1. Post data to the Firebase endpoint
1. Update the UI when the data changes

# Step 4: Routing

1. setting up the routes
1. wiring things up
1. Rendering our first routes
1. classnames

# Step 5: Refactoring

1. Firebase module
1. Base Component


# Helpful links:

* [MDN Javascript Classes documentation][mdn-es6-classes]
* [MDN ES6 Promises][mdn-es6-promises]
* [MDN ES6 Rest Parameters][mdn-es6-restparams]
* [React Homepage][react-home-link]
* [React Docs][react-docs-link]
* [Firebase Docs][firebase-js-docs]
* [Jasmine Docs][jasmine-docs]
* [Beginner’s Guide to Webpack][webpack-medium-post]
* [Gulp: Getting Started][gulp-getting-started]
* [Refactoring React Components to ES6 Classes][refactoring-react-es6]

[mdn-es6-classes]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
[react-home-link]: https://facebook.github.io/react/index.html
[react-docs-link]: https://facebook.github.io/react/docs/getting-started.html
[jasmine-docs]: http://jasmine.github.io/2.4/introduction.html
[firebase-js-docs]: https://www.firebase.com/docs/web/api/
[webpack-medium-post]: https://medium.com/@dabit3/beginner-s-guide-to-webpack-b1f1a3638460
[gulp-getting-started]: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
[node-download]: https://nodejs.org/en/download/
[mdn-es6-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[react-chrome-tools]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en
[firebase-vulcan]: https://chrome.google.com/webstore/detail/vulcan-by-firebase/oippbnlmebalopjbkemajgfbglcjhnbl?hl=en
[refactoring-react-es6]: http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
[mdn-es6-restparams]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
