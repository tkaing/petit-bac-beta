//import logo from './logo.svg';
import React from 'react';
import './App.css';
import './Font.css';
import './Bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './layout/Header';
import Footer from './layout/Footer';
import Game from "./screen/Game";
import Round from "./screen/Round";
import Result from "./screen/Result";

import { Container } from "react-bootstrap";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleScreenDidMount = this.handleScreenDidMount.bind(this);
        this.state = {
            headerIcon: faGraduationCap,
            nextPath: Round.Path,
            isTimerMode: false
        };
    }

    handleScreenDidMount(headerIcon, nextPath, isTimerMode = false) {
        this.setState({
            headerIcon: headerIcon,
            nextPath: nextPath,
            isTimerMode: isTimerMode
        });
    }

    render() {
        return (
            <Container className="App">
                <Router>
                    <Header icon={ this.state.headerIcon } />
                    <Switch>
                        <Route exact path={ Game.Path }>
                            <Game onScreenDidMount={ this.handleScreenDidMount } />
                        </Route>
                        <Route path={ Round.Path }>
                            <Round onScreenDidMount={ this.handleScreenDidMount } />
                        </Route>
                        <Route path={ Result.Path }>
                            <Result onScreenDidMount={ this.handleScreenDidMount } />
                        </Route>
                    </Switch>
                    <Footer isTimerMode={ this.state.isTimerMode }
                            nextPath={ this.state.nextPath } />
                </Router>
            </Container>

        );
    }
}

export default App;
