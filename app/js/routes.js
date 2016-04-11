import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import TodoApp from './components/todoApp.jsx';
import TodoList from './components/todoList.jsx';

const routes = (
  <Router history={browserHistory} >
    <Route path='/' component={TodoApp}>
      <Route path='/lists/:listId' component={TodoList} />
    </Route>
  </Router>
);

export default routes;
