import React from 'react';
import Firebase from 'firebase';
import { Link } from 'react-router';

export default class MenuItem extends React.Component {
  constructor(props){
    super(props);

    this.getChildren = this.getChildren.bind(this);
    this.state = {
      numTasks: 0
    }
  }

  getChildren(){
    let ref = new Firebase(`https://vivid-inferno-6426.firebaseio.com/todos/${this.props.firebaseKey}`);
    ref.once('value', (datasnapshot) => {
      var count = 0;
      var tasks = datasnapshot.val();
      for(var i in tasks)
        if(!tasks[i].done) count++;
      this.setState({numTasks: count});
    });
  }

  // not necessary yet
  componentDidUpdate(prevProps){
    if(prevProps.authData !== this.props.authData){
      this.getChildren();
    }
  }

  componentDidMount(){
    this.getChildren();
  }

  render() {
    return (
      <li key={this.props.data.name}>
        <Link activeClassName="active" to={`/lists/${this.props.firebaseKey}`}>
          {this.props.data.name}
        </Link>
        <span>{this.state.numTasks}</span>
      </li>
    )
  }
}
