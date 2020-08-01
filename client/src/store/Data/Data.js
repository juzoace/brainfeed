import axios from 'axios';

const state = {
    data: {},
    status: '',
    error: null
};

const getters = {

    // Get data
    data: function(state) {
        return state.data
    }
};

const actions = {

    // Get data request
    async getData({
        commit
    }) {
        try {
            // Commit Request
            commit('data_request');

            // Api Call
            let res = await axios.get('http://localhost:3001/data');
            console.log(res);
            console.log('Got here')
            if (res.data.success === 'true' ) {
                
                console.log("Got here In the client side")
                // Get useful response data
                const data = res.data.datafield;

                commit('data_received', data);
            }

            return res;
        } catch(err) {

            // Commit error 
            commit('data_error', err);
        }
    }
};

const mutations = {
    data_request(state) {
        state.error = null
        state.status = 'loading'
    },
    data_received(state, data) {
        state.data = data
        state.status = 'success'
    },
    data_error(state, err) {
        state.error = err.response.data.msg
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}