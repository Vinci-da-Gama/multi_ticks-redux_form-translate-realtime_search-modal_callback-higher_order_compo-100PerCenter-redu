import axios from 'axios';

import { FETCH_INEBRIANT, FETCH_HEALTH, FETCH_PASTRY, FETCH_DAIRY, FETCH_FRESH, FETCH_COSMETIC, FETCH_CRAFTS } from '../types';
import { handleError, handleNoData } from '../helpers/error-handler';
const rootUrl = 'http://localhost:3004';

const loadInebriants = (inebriants) => {
	return  {
		type: FETCH_INEBRIANT,
		inebriants
	};
};

export const grabInebriants = () => {
	return (dispatch) => {
		return axios.get(`${rootUrl}/inebriants`)
			.then((resp) => {
				if (resp) {
					dispatch(loadInebriants(resp.data));
				} else {
					dispatch(handleNoData(dispatch, catchError));
				}
			})
			.catch((err) => {
				handleError(err);
			});
	};
};