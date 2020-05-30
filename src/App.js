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
            header_icon: null,
            footer_popover: null,
            footer_handleSubmit: null,
            footer_leftComponent: null,
            footer_rightComponent: null,
        };
    }

    handleScreenDidMount(options) {
        this.setState(options);
    }

    render() {
        return (
            <Container className="App">
                <Router>
                    <Header icon={ this.state.header_icon } />
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
                    <Footer
                        popover={ this.state.footer_popover }
                        onSubmit={ this.state.footer_handleSubmit }
                        onScreenDidMount={ this.handleScreenDidMount }
                        leftComponent={ this.state.footer_leftComponent }
                        rightComponent={ this.state.footer_rightComponent } />
                </Router>
            </Container>

        );
    }
}

export default App;
