//import logo from './logo.svg';
import React from 'react';
import './App.css';

import Header from './Layout/Header';
import Footer from './Layout/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Game from "./Screen/Game";
import Round from "./Screen/Round";
import Result from "./Screen/Result";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleFooterClick = this.handleFooterClick.bind(this);
        this.state = {
            headerIcon: faGraduationCap
        };
    }

    handleFooterClick(headerIcon) {
        this.setState({
            headerIcon: headerIcon
        });
    }

    render() {
        return (
            <Container className="App">
                <Router>
                    <Header icon={ this.state.headerIcon } />
                    <Switch>
                        <Route exact path="/">
                            <Game />
                        </Route>
                        <Route path="/round">
                            <Round onFooterClick={ this.handleFooterClick } />
                        </Route>
                        <Route path="/result">
                            <Result />
                        </Route>
                    </Switch>
                    <Footer />
                </Router>
            </Container>

        );
    }
}

export default App;
