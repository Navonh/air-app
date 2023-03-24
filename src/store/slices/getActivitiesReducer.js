import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../../api';
import { api } from '../../api/Environment';

const getActivitiesSlice = createSlice({
    name: 'data',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        getDataStart: state => {
            state.loading = true;
            state.error = null;
        },
        getDataSuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        getDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateActivities: (state, action) => {
            state.data = action.payload;
        },
        updateActivity: (state, action) => {
            const activityIndex = state.data.findIndex(activity => activity.id === action.payload.id);
            if (activityIndex !== -1) {
                state.data[activityIndex] = action.payload;
            }
        },
    },
});

export const {
    getDataStart,
    getDataSuccess,
    getDataFailure,
    updateActivities,
    updateActivity
} = getActivitiesSlice.actions;

export const fetchRecords = () => async dispatch => {
    try {
        dispatch(getDataStart());
        const data = await fetchData('GET', api.activities);
        dispatch(getDataSuccess(data));
    } catch (error) {
        dispatch(getDataFailure(error.message));
    }
};

export default getActivitiesSlice.reducer;
