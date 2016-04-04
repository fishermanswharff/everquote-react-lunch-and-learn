import React from 'react';
import Firebase from 'firebase';

export default class MenuItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      numTasks: 0
    }

    this.getChildren = this.getChildren.bind(this);
  }

  getChildren(){
    let ref = new Firebase(`https://vivid-inferno-6426.firebaseio.com/todos/${this.props.firebaseKey}`);
    ref.once('value', (snapshot) => {
      var count = 0;
      var tasks = snapshot.val();
      for(var i in tasks)
        if(!tasks[i].done) count++;
      this.setState({numTasks: count});
    });
  }

  componentDidMount(){
    this.getChildren();
  }

  render(){
    return (
      <li key={this.props.data.name}>
        <a>{this.props.data.name}</a>
        <span>{this.state.numTasks}</span>
      </li>
    )
  }
}
