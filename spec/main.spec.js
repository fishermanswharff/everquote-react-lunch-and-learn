import React from 'react'
import { render } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom';
import TodoApp from '../app/js/components/todoApp.jsx';

describe('TodoApp', () => {

  let utils = TestUtils,
      component = utils.renderIntoDocument(<TodoApp/>),
      node = utils.findRenderedDOMComponentWithClass(component, 'todo-app-main-container');

  beforeEach(() => {
    component.setState({ authData: null });
  });

  it('is defined', () => {
    expect(component).toBeDefined();
  });

  it('has props', () => {
    expect(component.props).toBeDefined();
    expect(component.props).toEqual(jasmine.any(Object));
  });

  it('has state', () => {
    expect(component.state).not.toBeNull();
    expect(component.state.authData).toBeNull();
  });

  it('is has children components', () => {
    let menu = utils.findRenderedDOMComponentWithTag(component, 'ul');
    expect(menu).toBeDefined();
  });

  afterEach(() => {
    // do some teardown
  });
});
