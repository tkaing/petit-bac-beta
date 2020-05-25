import React from 'react';
import './Round.css';

import Game from "./Game";
import Result from "./Result";

import { faFont, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

class Round extends React.Component {

    static Path = '/round';

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onScreenDidMount(faFont, Result.Path, true);
    }

    componentWillUnmount() {
        this.props.onScreenDidMount(faGraduationCap, Game.Path);
    }

    render() {
        return (
            <div>Round 1</div>
        );
    }
}

export default Round;
