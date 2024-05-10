import {
    SET_AUTHENTICATION,
    SET_USERNAME,
    SET_TOKEN
} from "../storeconstants";

export default {

    [SET_AUTHENTICATION](state, authenticated) {
        state.authenticated = authenticated
        window.localStorage.setItem('tw_authenticated', authenticated);
    },
    [SET_USERNAME](state, username) {
        state.username = username
        window.localStorage.setItem('tw_username', username);
    },
    [SET_TOKEN](state, token) {
      state.token = token;
      window.localStorage.setItem('tw_token', token);
    }
}
