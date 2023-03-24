import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../../api';
import { api } from '../../api/Environment';

const getActivityDetailSlice = createSlice({
    name: 'data',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        getDatailStart: state => {
            state.loading = true;
            state.error = null;
        },
        getDatailSuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        getDatailFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getDatailStart,
    getDatailSuccess,
    getDatailFailure,
} = getActivityDetailSlice.actions;

export const fetchRecordDetails = (id) => async dispatch => {
    try {
        dispatch(getDatailStart());
        const data = await fetchData('GET', api.detail + id);
        dispatch(getDatailSuccess(data));
    } catch (error) {
        dispatch(getDatailFailure(error.message));
    }
};

export default getActivityDetailSlice.reducer;
