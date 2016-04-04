import React from 'react';

class BaseComponent extends React.Component {
  bind(...methods){
    methods.forEach((method) => this[method] = this[method].bind(this));
  }
}

export default BaseComponent;
