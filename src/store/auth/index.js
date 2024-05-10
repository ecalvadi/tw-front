import mutations from './mutations';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            authenticated: window.localStorage.getItem('tw_authenticated'),
            username: window.localStorage.getItem('tw_username'),
            token: window.localStorage.getItem('tw_token'),
        }
    },
    mutations,
    getters
}
