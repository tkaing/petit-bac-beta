import React from 'react';
import './App.css';
import './Font.css';
import './Bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Game from "./screens/Game";
import Creation from "./screens/Creation";

import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loading from "./screens/Loading";

const socket = new WebSocket("ws://api.thierrykg.xyz:3001");

class App extends React.Component {

    constructor(props) {
        super(props);
        this.toApp = this.toApp.bind(this);
        this.state = {};
    }

    componentDidMount() {

        const self = this;

        socket.addEventListener("open", function() {
            console.log("ws server connected");
        });
        socket.addEventListener("close", function() {
            console.log("ws server closed");
        });
        socket.addEventListener("error", function(e) {
            console.log(e);
        });
        socket.addEventListener("message", function(e) {
            console.log(e.data);
        });
    }

    toApp(options) {
        this.setState(options);
    }

    render() {
        return (
            <Container className="App">
                <Router>
                    <Switch>
                        <Route exact path={ Creation.path }>
                            <Creation toParent={ this.toApp } />
                        </Route>
                        <Route path={ Game.path }>
                            <Game toParent={ this.toApp } />
                        </Route>
                        <Route path={ Loading.path }>
                            <Loading />
                        </Route>
                    </Switch>
                </Router>
            </Container>
        );
    }
}

export default App;
