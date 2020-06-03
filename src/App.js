//import logo from './logo.svg';
import React, {useEffect} from 'react';
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

const socket = new WebSocket("ws://localhost:3001");

class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleScreenDidMount = this.handleScreenDidMount.bind(this);

        this.state = {
            header_icon: null,
            game_handleSubmit: null,
            footer_handleSubmit: null,
            footer_leftComponent: null,
            footer_rightComponent: null,
        };
    }

    componentDidMount() {

        const self = this;

        socket.addEventListener("open", function() {
            console.log("CONNECTED");
        });
        socket.addEventListener("close", function() {
            console.log("CLOSED");
        });
        socket.addEventListener("error", function(e) {
            console.log(e);
        });
        socket.addEventListener("message", function(e) {
            console.log(e.data);
            console.log(self.state.header_icon);
        });
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
                            <Game
                                onSubmit={ this.state.game_handleSubmit }
                                onScreenDidMount={ this.handleScreenDidMount }
                            />
                        </Route>
                        <Route path={ Round.Path }>
                            <Round onScreenDidMount={ this.handleScreenDidMount } />
                        </Route>
                        <Route path={ Result.Path }>
                            <Result onScreenDidMount={ this.handleScreenDidMount } />
                        </Route>
                    </Switch>
                    <Footer
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
