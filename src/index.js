import React from 'react';
import  ReactDOM  from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './_helpers';
import { App } from './App';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

const rootNode = document.getElementById('root');

ReactDOM.render(<Provider store={store}><App /></Provider>,
rootNode);