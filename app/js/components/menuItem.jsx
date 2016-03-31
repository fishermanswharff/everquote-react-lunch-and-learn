import React from 'react';

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
      this.setState({numTasks: datasnapshot.numChildren()});
    });
    this.forceUpdate();
  }

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
      <li key={this.props.data.name}>{this.props.data.name} | {this.state.numTasks}</li>
    )
  }
}
