import React from 'react';
import './Game.css';

import Round from "./Round";
import Result from "./Result";
import CategoryList from "../component/CategoryList";

import { faGraduationCap, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";

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
            <div className={"Game"}>
                <Row>
                    <Col>
                        <section className={"Game-left"}>
                            <CategoryList />
                        </section>
                    </Col>

                    <Col>
                        <section className={"Game-right"}>
                            <CategoryList />
                        </section>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Game;
