import React from 'react';
import BaseComponent from './base.jsx';


export default class TodoListItem extends BaseComponent {
  constructor(props){
    super(props);
    this.state = {
      done: this.props.data.done,
      text: this.props.data.text,
      timestamp: this.props.data.timestamp,
      project: this.props.data.project,
      id: this.props.id
    }

    this.bind('handleChecked', 'onItemDoneUpdate', 'convertTimestamp', 'editTodoListItemText', 'updateItemText', 'onItemTextUpdate');
  }

  createMarkup(string){
    return { __html: string }
  }

  handleChecked(event){
    event.preventDefault();
    var doneRef = new Firebase(`https://vivid-inferno-6426.firebaseio.com/todos/${this.props.data.project}/${this.props.id}/done`);
    doneRef.set(!this.state.done, this.onItemDoneUpdate);
  }

  onItemDoneUpdate(error){
    if(error){
      this.setState({ ajaxFail: true });
    } else {
      this.setState({ ajaxSuccess: true });
    }
  }

  render(){
    return (
      <li className='todo-list-item'>
        <label className={labelClasses}>
          <input
            type="checkbox"
            value={this.state.done}
            checked={this.state.done}
            onChange={this.handleChecked}
            defaultChecked={this.state.done}
            defaultValue={this.state.done}
          />
          <span
            contentEditable
            onClick={this.editTodoListItemText}
            onFocus={this.editTodoListItemText}
            className={textClasses}
            dangerouslySetInnerHTML={this.createMarkup(this.state.text)}
          ></span>
          <div className='todo-list-item-metadata'>
            <span className='timestamp'>{this.convertTimestamp(this.state.timestamp)}</span>
            <span className={ajaxClasses}><i className={iconClasses}></i></span>
          </div>
        </label>
      </li>
    )
  }
}
