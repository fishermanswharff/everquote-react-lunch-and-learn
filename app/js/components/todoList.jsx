import React from 'react';
import TodoListItem from './todoListItem.jsx'

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newItemText: ''
    };

    this.loadListFromServer = this.loadListFromServer.bind(this);
    this.createItem = this.createItem.bind(this);
    this.newItemSubmit = this.newItemSubmit.bind(this);
    this.newItemChange = this.newItemChange.bind(this);

    console.log(this, 'hello world');
  }

  createItem(object,index,array) {
    return <TodoListItem key={object.key} data={object.item} id={object.key} />
  }

  loadListFromServer() {
    this.setState({ items: [] });
    var listitems = [];
    var firebaseRef = new Firebase(`https://vivid-inferno-6426.firebaseio.com/todos/${this.props.params.listId}`);
    var todos = firebaseRef.on('child_added', (snapshot, prev) => {
      listitems.push({key: snapshot.key(), item: snapshot.val()});
      this.setState({ items: listitems });
      return snapshot;
    });
  }

  componentDidMount() {
    this.loadListFromServer();
    var listRef = new Firebase(`https://vivid-inferno-6426.firebaseio.com/todos/${this.props.params.listId}`);
    listRef.on('child_removed', (datasnapshot) => {
      this.loadListFromServer();
    }, (errorObject) => {
      console.log(errorObject);
    });
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.params.listId;
    let newId = this.props.params.listId;
    if (newId !== oldId) this.loadListFromServer();
  }

  componentWillUnmount() {
    var listRef = new Firebase(`https://vivid-inferno-6426.firebaseio.com/todos/${this.props.params.listId}`);
    listRef.off();
  }

  newItemSubmit(e) {
    e.preventDefault();
    var todoRef = new Firebase(`https://vivid-inferno-6426.firebaseio.com/todos/${this.props.params.listId}`);
    var promise = todoRef.push({
      done: false,
      project: this.props.params.listId,
      text: this.state.newItemText,
      timestamp: Date.now()
    }, (error) => {
      if(error){
        console.log('sync failed :(');
      } else {
        this.setState({newItemText: null});
      }
    });

    promise.then(function(val){
      console.log(val.key(), val);
    });
  }

  newItemChange(e) {
    this.setState({ newItemText: e.target.value });
  }

  render() {
    return (
      <section className='todo-list-container'>
        <header></header>
        <ul className='todo-list'>
          { this.state.items.map(this.createItem) }
        </ul>
        <div className='form-container'>
          <form id='new-list-item' onSubmit={ this.newItemSubmit }>
            <div className='form-group'>
              <input id='new-list-item' type='text' onChange={ this.newItemChange } value={ this.state.newItemText } required/>
              <label htmlFor='new-list-item'>new todo:</label>
            </div>
            <div className='form-group'>
              <button type='submit'>Add Item</button>
            </div>
          </form>
        </div>
        <form onSubmit={ this.archiveDoneItems } >
          <input type='submit' value='Remove Done Items' />
        </form>
      </section>
    )
  }
}