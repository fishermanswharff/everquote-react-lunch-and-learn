import React from 'react';
import Menu from './menu.jsx';
import NewListForm from './newListForm.jsx';

// import BaseComponent from './base.jsx';
/*

  JASON NOTES:
  ———————————————————————————————————

  Step 1: Hello World
  ———————————————————————————————————
  import react
  write app.jsx
  write todoApp.jsx

  Step 2: Retrieving/Displaying Data
  ———————————————————————————————————
  write menu.jsx
  write menuitem.jsx
  get data from firebase
  set state
  pass props from children to parents

  Step 3: Posting data
  ———————————————————————————————————
  Build newListForm
  render it in todoapp
  

  On Step 4: Routes
  ———————————————————————————————————
  write the routes file
  import them into the app.jsx
  build the todoList component
  build the todolistitem component
  setup classnames

  On Step 5: Refactor
  ———————————————————————————————————
  On refactor import BaseComponent and update inheritance
  comment out the bind() calls

  build out a Firebase module, import it, then use that instead of making all the new calls
    methods you'll need:
      get()
      post()
*/


export default class TodoApp extends React.Component {

  // every class needs a constructor method.
  //
  // JASON NOTE: context should be passed in on Step 4
  constructor(props, context){
    // invoke the React construction for props
    super(props, context);

    // instead of getInitialState() we set the initial state in the constructor
    this.state = {};

    this.handleMenuClicked = this.handleMenuClicked.bind(this);
  }

  // Lifecycle methods


  // Mounting
  // ———————————————————————————————————
  componentWillMount() {
    /*
      Invoked once, both on the client and server,
      immediately before the initial rendering occurs
      If you call setState within this method, render()
      will see the updated state and will be executed
      only once despite the state change.
    */
  }

  componentDidMount() {
    /*
      Invoked once, only on the client (not on the server),
      immediately after the initial rendering occurs.
      At this point in the lifecycle, you can access any
      refs to your children (e.g., to access the underlying
      DOM representation).
    */
  }

  // Updating
  // ———————————————————————————————————
  componentWillReceiveProps(){
    /*
      Invoked when a component is receiving new props.
      This method is not called for the initial render.
    */
  }

  shouldComponentUpdate(){
    /*
      Invoked before rendering when new props or state are
      being received. This method is not called for the
      initial render or when forceUpdate is used.
    */
    return true;
  }

  componentWillUpdate(){
    /*
      Invoked immediately before rendering when new props
      or state are being received. This method is not called
      for the initial render.
    */
  }

  componentDidUpdate(prevProps) {
    /*
      Invoked immediately after the component's updates are
      flushed to the DOM. This method is not called for the initial render.
    */
  }

  // Unmounting
  // ———————————————————————————————————
  componentWillUnmount(){
    /*
      Invoked immediately before a component is unmounted from the DOM.
    */
  }

  handleMenuClicked(e) {
    console.log('clicked the menu', e);
  }

  // turns your javascript/jsx into html
  render(){
    return(
      <div id='todo-app' className='todo-app-main-container'>
        <Menu myFirstProp='hello world' onListClicked={this.handleMenuClicked} />
        <NewListForm />
        {this.props.children}
      </div>
    )
  }
}

TodoApp.propTypes = {
  stringProperty: React.PropTypes.string
}

TodoApp.defaultProps = {
  stringProperty: 'hello world'
}

TodoApp.contextTypes = {
  router: React.PropTypes.object.isRequired
}

