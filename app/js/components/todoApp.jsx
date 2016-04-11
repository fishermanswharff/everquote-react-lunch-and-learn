import BaseComponent from './base.jsx';
import React from 'react';
import Menu from './menu.jsx';
import NewListForm from './newListForm.jsx';

export default class TodoApp extends BaseComponent {
  constructor(props){
    super(props);
    this.state = {
      message: 'hello world'
    }

    // this.handleMenuClicked = this.handleMenuClicked.bind(this);
    this.bind('handleMenuClicked');
  }

  handleMenuClicked(e){
    console.log(this, 'click the menu!!!', e);
  }

  render(){
    return(
      <div id='todo-app' className='todo-app-main-container'>
        <Menu onListClicked={this.handleMenuClicked}/>
        <NewListForm />
        {this.props.children}
      </div>
    )
  }
}
