import React from 'react';
import BaseComponent from './base.jsx';
import TodoListItem from './todoListItem.jsx';

export default class TodoList extends BaseComponent {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      newItemText: ''
    };

    this.bind('createItem', 'newItemSubmit', 'newItemChange', 'loadListsFromServer');
  }

  loadListsFromServer(){
    this.setState({items: []});
    var listitems = [];
    var firebaseRef = new Firebase(`https://vivid-inferno-6426.firebaseio.com/todos/${this.props.params.listId}`);
    firebaseRef.on('child_added', (snapshot, prev) => {
      listitems.push({key: snapshot.key(), item: snapshot.val()});
      this.setState({ items: listitems });
    });
  }

  componentDidMount(){
    this.loadListsFromServer();
  }

  componentDidUpdate(prevProps){
    let oldId = prevProps.params.listId;
    let newId = this.props.params.listId;
    if(newId !== oldId) this.loadListsFromServer();
  }

  createItem(object, index, array){
    return <TodoListItem key={object.key} data={object.item} id={object.key} />
  }

  newItemSubmit(e){
    console.log(e);
  }

  newItemChange(e){
    console.log(e);
  }

  render(){
    return(
      <section className='todo-list-container'>
        <ul className='todo-list'>
          { this.state.items.map(this.createItem) }
        </ul>
        <div className='form-container'>
          <form id='new-list-item' onSubmit={this.newItemSubmit}>
            <div className='form-group'>
              <input id='new-list-item' type='text' onChange={this.newItemChange} value={this.state.newItemText} required/>
              <label htmlFor='new-list-item'>Add Item</label>
            </div>
            <div className='form-group'>
              <button type='submit'>Add Item</button>
            </div>
          </form>
        </div>
      </section>
    )
  }
}
