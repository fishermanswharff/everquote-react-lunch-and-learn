import React from 'react';

export default class NewListForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {}

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ newListName: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let ref = new Firebase('https://vivid-inferno-6426.firebaseio.com/lists');
    ref.push({
      name: this.state.newListName,
      timestamp: Date.now()
    });
    this.setState({ newListName: null });
  }

  render(){

    return(
      <div className='form-container'>
        <form id='new-todo-list-form' onSubmit={ this.handleSubmit } >
          <div className='form-group'>
            <input id='new-todo-list' type='text' onChange={ this.onChange } value={ this.state.newListName } required />
            <label htmlFor='new-todo-list'>new list:</label>
          </div>
          <div className='form-group'>
            <button type='submit'>Add List</button>
          </div>
        </form>
      </div>
    )
  }
}
