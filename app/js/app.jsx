import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
// import TodoApp from './components/todoApp.jsx';
// ReactDOM.render(<TodoApp />, document.getElementById('todo-list'));

import routes from './routes.js';
ReactDOM.render((routes), document.getElementById('todo-list'));
