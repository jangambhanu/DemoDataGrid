import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Redirect, RedirectProps, withRouter } from 'react-router';
import PropTypes from "prop-types";
import GridPanel from "./GridPanel";

class Welcome extends Component {
    constructor() {
        super();
        this.state = {
            showGrid: false
        }
        this.stopTimer = this.stopTimer.bind(this);
    }
    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.stopTimer()
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
     stopTimer() {
        this.setState({ showGrid: true });
    }

    render() {
        console.log(" Welcome Render Method " + JSON.stringify(location.pathname));
        let loadMainPanel = <div></div>;
        if (!this.state.showGrid && location.pathname == "/") {
            loadMainPanel = <div className="welcome">Welcome</div>
        } else{
            loadMainPanel = <div><Redirect to={'/accountDetails'} /> </div>
        }

        return (
            <div className="body">
                {
                    loadMainPanel
                }
            </div>
        );
    }
}
Welcome.propTypes = {
    location: PropTypes.any,
};

export default Welcome;
    
