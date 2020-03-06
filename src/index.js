import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Welcome from "./js/components/Welcome";
import GridPanel from "./js/components/GridPanel";
import './style/App.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

const routing = (
    <Router>
        <div>
            <Route path="/" exact component={Welcome} />
            <Route path="/accountDetails" exact component={GridPanel} />
        </div>
    </Router>
)
ReactDOM.render(routing, document.getElementById('container'))


