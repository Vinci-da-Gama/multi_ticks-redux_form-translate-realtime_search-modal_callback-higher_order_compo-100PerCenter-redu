import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import storeWithMiddleware from './store/store-config';
import RootApp from './components/index';

require('../style/index.scss');
// import 'babel-polyfill';

const Utensil = document.querySelector('.root-dom-container');

render(
	<Provider store={ storeWithMiddleware }>
		<Router>
			<RootApp />
		</Router>
	</Provider>, Utensil
);
