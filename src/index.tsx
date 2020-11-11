import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MemoryRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
