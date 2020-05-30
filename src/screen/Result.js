import React from 'react';
import './Result.css';

import Game from "./Game";

import { withRouter } from 'react-router-dom';
import { faFont, faTrophy } from "@fortawesome/free-solid-svg-icons";

class Result extends React.Component {

    static Path = '/result';

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.onScreenDidMount({
            header_icon: faTrophy,
            footer_handleSubmit: this.handleSubmit
        });
    }

    componentWillUnmount() {
        this.props.onScreenDidMount({
            header: { icon: faFont },
        });
    }

    handleSubmit() {
        this.props.history.push(Game.Path);
    }

    render() {
        return (
            <div>Résultats de la partie</div>
        );
    }
}

export default withRouter(Result);
