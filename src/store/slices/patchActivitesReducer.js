import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../../api';
import { api } from '../../api/Environment';

const patchActivitiesSlice = createSlice({
    name: 'patched',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        patchDataStart: state => {
            state.loading = true;
            state.error = null;
        },
        patchDataSuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        patchDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    patchDataStart,
    patchDataSuccess,
    patchDataFailure,
} = patchActivitiesSlice.actions;

export const patchhRecords = (callID, isArchived) => async dispatch => {
    try {
        dispatch(patchDataStart());
        const payload = {
            is_archived: isArchived
        }
        const data = await fetchData('PATCH', api.detail + callID, payload);
        dispatch(patchDataSuccess(data));
    } catch (error) {
        dispatch(patchDataFailure(error.message));
    }
};

export default patchActivitiesSlice.reducer;
