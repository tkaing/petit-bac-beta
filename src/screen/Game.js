import React from 'react';
import './Game.css';

import Round from "./Round";
import Result from "./Result";
import CategoryList from "../component/CategoryList";

import { Col, Row } from "react-bootstrap";
import { faGraduationCap, faTrophy } from "@fortawesome/free-solid-svg-icons";

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
                    <Col xs={6} md={8}>
                        <section className={"Game-left"}>
                            <CategoryList add={ false }
                                          delete={ false }
                                          toggle={ true }
                                          highlight={ false }
                                          horizontal={ true }  />
                        </section>
                    </Col>

                    <Col>
                        <section className={"Game-right"}>
                            <CategoryList add={ true }
                                          delete={ true }
                                          toggle={ false }
                                          highlight={ true }
                                          horizontal={ false }
                                          title={"Catégories de la partie"} />
                        </section>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Game;
