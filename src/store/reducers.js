import { combineReducers } from '@reduxjs/toolkit';
import getActivitiesReducer from './slices/getActivitiesReducer';
import getActivityDetailReducer from './slices/getActivityDetailReducer';
import patchActivitesReducer from './slices/patchActivitesReducer';

const rootReducer = combineReducers({
    activities: getActivitiesReducer,
    activityDetail: getActivityDetailReducer,
    patchActivites: patchActivitesReducer
});

export default rootReducer;
