import React from 'react';
import BaseComponent from './base.jsx';
import classnames from 'classnames';

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

  convertTimestamp(timestamp){
    var date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if(minutes < 10){
      var string = '0' + minutes;
      minutes = string;
    }
    return hours + ':' + minutes + ' ' + month + '/' + day;
  }

  editTodoListItemText(event){
    event.preventDefault();
    event.target.addEventListener('keyup', this.updateItemText);
  }

  updateItemText(event){
    this.setState({ inProgress: true });
    let textRef = new Firebase(`https://vivid-inferno-6426.firebaseio.com/todos/${this.props.data.project}/${this.props.id}/text`);
    textRef.set(event.target.textContent, this.onItemTextUpdate)
  }

  onItemTextUpdate(error){
    if(error){
      this.setState({ itemUpdated: false, ajaxFail: true, inProgress: false });
    } else {
      this.setState({itemUpdated: true, ajaxSuccess: true, inProgress: false})
    }
  }

  onItemDoneUpdate(error){
    if(error){
      this.setState({ ajaxFail: true });
    } else {
      this.setState({ ajaxSuccess: true });
    }
  }

  componentDidMount(){
    var itemRef = new Firebase(`https://vivid-inferno-6426.firebaseio.com/todos/${this.props.data.project}/${this.props.id}`);
    itemRef.on('child_changed', (snapshot) => {
      this.setState({ [snapshot.key()]: snapshot.val() });
    })
  }

  render(){

    let textClasses = classnames('label', {
      'done-true': this.state.done == true,
    });

    let labelClasses = classnames({
      'checked': this.state.done == true,
      'text-updated': this.state.itemUpdated,
    });

    let ajaxClasses = classnames('ajax-status', {
      'success': this.state.ajaxSuccess,
      'fail': this.state.ajaxFail,
      'in-progress': this.state.inProgress
    })

    let iconClasses = classnames('fa', {
      'fa-check': this.state.ajaxSuccess,
      'fa-close': this.state.ajaxFail,
      'fa-cog fa-spin': this.state.inProgress
    });

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
