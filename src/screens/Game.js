import React from 'react';
import './Game.css';

import Timer from "../components/Timer";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Creation from "./Creation";

import { faFont } from "@fortawesome/free-solid-svg-icons";
import {Row} from "react-bootstrap";

class Game extends React.Component {

    static path = '/game';

    constructor(props) {
        super(props);
        this.toGame = this.toGame.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {}

    componentWillUnmount() {}

    toGame(options) {
        this.setState(options);
    }

    handleSubmit() {
        return { path: Creation.path };
    }

    render() {
        return (
            <div className={"Game"}>
                <Header icon={ faFont } />
                <Row>
                    <div>Round 1</div>
                </Row>
                <Footer
                    left={ <Timer unit={ Timer.Minutes } isTimerMode={ true } /> }
                    right={ <Timer unit={ Timer.Minutes } isTimerMode={ true } /> }
                    toParent={ this.toGame }
                    onSubmit={ this.handleSubmit } />
            </div>
        );
    }
}

export default Game;
