import React from 'react';
import { render } from 'react-dom';
import MenuItem from './menuItem.jsx';

export default class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };

    this.createItem = this.createItem.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.loadListsFromServer = this.loadListsFromServer.bind(this);
  }

  loadListsFromServer() {
    var data = [];
    let ref = new Firebase('https://vivid-inferno-6426.firebaseio.com/lists');
    ref.on('value', (snapshot) => {
      console.log(snapshot.val());
      var listsObj = snapshot.val();
      for(var i in listsObj)
        data.push({key: i, value: listsObj[i]});
      this.setState({ lists: data });
    });
  }

  componentDidMount(){
    console.log(this, this.props);
    this.loadListsFromServer();
  }

  handleClick(e){
    this.props.onListClicked(e);
  }

  createItem(item) {
    return <MenuItem key={item.key} data={item.value} firebaseKey={item.key} />
  }


  render() {
    console.log(this.state);
    return(
      <div onClick={this.handleClick}>
        <section>
          <ul className='todo-lists'>
            {this.state.lists.map(this.createItem)}
          </ul>
        </section>
      </div>
    )
  }
}

Menu.propTypes = {
  items: React.PropTypes.array,
  onListClicked: React.PropTypes.func,
  myFirstProp: React.PropTypes.string
}
