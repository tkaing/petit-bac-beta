import React from 'react';
import './Round.css';
import {faFont, faGraduationCap} from "@fortawesome/free-solid-svg-icons";

class Round extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onFooterClick(faFont);
    }

    componentWillUnmount() {
        this.props.onFooterClick(faGraduationCap);
    }

    render() {
        return (
            <div>Round 1</div>
        );
    }
}

export default Round;
