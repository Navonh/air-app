import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ActivityFeed from '../pages/ActivityFeed';
import ArchivedCalls from '../pages/ArchivedCalls';

function AppNavigator() {
    return (
        <Switch>
            <Route exact path="/">
                <ActivityFeed />
            </Route>
            <Route path="/archived">
                <ArchivedCalls />
            </Route>
        </Switch>
    );
}

export default AppNavigator