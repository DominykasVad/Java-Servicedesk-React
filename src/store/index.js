import {configureStore} from '@reduxjs/toolkit';
import {logger} from 'redux-logger';
import user, {loadUserFromStorage, subscribeToUser} from './slices/userSlice';

export const createStore = (initialState) => {

	const store = configureStore({
		reducer: {
			user
		},
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
		preloadedState: {user: loadUserFromStorage(), ...initialState}
	})
	subscribeToUser(store)
	return store
}

export default createStore()
