import React from 'react';
import './Game.css';

import { faGraduationCap, faTrophy } from "@fortawesome/free-solid-svg-icons";
import Round from "./Round";
import Result from "./Result";

class Game extends React.Component {

    static Path = '/';

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onScreenDidMount(faGraduationCap, Round.Path);
    }

    componentWillUnmount() {
        this.props.onScreenDidMount(faTrophy, Result.Path);
    }

    render() {
        return (
            <div>Création de la partie</div>
        );
    }
}

export default Game;
