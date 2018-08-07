require('../style/index.scss');

import 'babel-polyfill';

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import storeWithMiddleware from './store/store-config.js';
import RootApp from './components/index';

const Utensil = document.querySelector('.root-dom-container');

render(
	<Provider store={ storeWithMiddleware }>
		<Router>
			<RootApp />
		</Router>
	</Provider>, Utensil
);