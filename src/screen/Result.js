import React from 'react';
import './Result.css';

import { faFont, faTrophy } from "@fortawesome/free-solid-svg-icons";
import Game from "./Game";
import Round from "./Round";

class Result extends React.Component {

    static Path = '/result';

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onScreenDidMount(faTrophy, Game.Path);
    }

    componentWillUnmount() {
        this.props.onScreenDidMount(faFont, Round.Path);
    }

    render() {
        return (
            <div>Résultats de la partie</div>
        );
    }
}

export default Result;
