import React from 'react';
import './Round.css';

import Result from "./Result";
import Timer from "../component/Timer";

import { withRouter } from 'react-router-dom';
import { faFont, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

class Round extends React.Component {

    static Path = '/round';

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.onScreenDidMount({
            header_icon: faFont,
            footer_handleSubmit: this.handleSubmit,
            footer_leftComponent: <Timer unit={ Timer.Minutes } isTimerMode={ true } />,
            footer_rightComponent: <Timer unit={ Timer.Seconds } isTimerMode={ true } />,
        });
    }

    componentWillUnmount() {
        this.props.onScreenDidMount({
            header_icon: faGraduationCap,
            footer_leftComponent: null,
            footer_rightComponent: null,
        });
    }

    handleSubmit() {
        return { path: Result.Path };
    }

    render() {
        return (
            <div>Round 1</div>
        );
    }
}

export default Round;
