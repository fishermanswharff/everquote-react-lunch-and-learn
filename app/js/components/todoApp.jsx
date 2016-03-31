import React from 'react';

export default class TodoApp extends React.Component {
  constructor(props){
    super(props);

    // instead of getInitialState() we set the initial state in the constructor
    this.state = {};
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

  // turns your javascript into html
  render(){
    return(
      <div id='todoApp'>
        <p>Hello World!</p>
      </div>
    )
  }
}
