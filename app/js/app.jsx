// import all our modules we will need
import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
// on Step 4: Routes,
// comment out:
import TodoApp from './components/todoApp.jsx';
ReactDOM.render(<TodoApp />, document.getElementById('todo-list'));

// and uncomment
// import routes from './routes.js';
// ReactDOM.render((routes), document.getElementById('todo-list'));
