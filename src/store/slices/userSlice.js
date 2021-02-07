import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';
import {loadFromStorage, saveToStorage} from '../../utils/sessionStorage';

const initialState = {
    userData: null,
    jwt: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state, {payload: user}) {
            state.userData = user;
        },
        setJwt(state, {payload: jwt}) {
            state.jwt = jwt;
        },
        removeUserData(state) {
            state.userData = null;
        },
        removeJwt(state) {
            state.jwt = null;
        }
    }
});

let prevUser = initialState

export const subscribeToUser = (store) => {
    store.subscribe(_.throttle(() => {

        const currentUser = store.getState().user

        if (prevUser !== currentUser) {
            prevUser = currentUser
            saveToStorage('user', currentUser)
        }

    }, 1000))
}

export const loadUserFromStorage = () => loadFromStorage('user')

export default userSlice.reducer;
export const {setUserData, setJwt, removeUserData, removeJwt} = userSlice.actions;
