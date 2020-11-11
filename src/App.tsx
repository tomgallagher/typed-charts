import React from 'react';
import { Switch, Route } from 'react-router';
import { Navigation } from './components/navigation';
import Charts from './pages/charts';
import Maps from './pages/maps';
import Visuals from './pages/visuals';

function App() {
    return (
        <div className='appContainer'>
            <Navigation />
            <Switch>
                <Route path='/charts'>
                    <Charts />
                </Route>
                <Route path='/maps'>
                    <Maps />
                </Route>
                <Route path='/visuals'>
                    <Visuals />
                </Route>
                <Route path='*'>
                    <Charts />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
