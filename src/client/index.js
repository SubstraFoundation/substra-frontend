/* global document */

import React from 'react';
import {hydrate} from 'react-dom';

import App from './App';

// load DevTools
import './DevTools';


const root = document.getElementById('root');

hydrate(<App />, root);
