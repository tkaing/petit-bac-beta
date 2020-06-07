import React from 'react';
import './Header.css';

import Logo from "../icons/logo-default.svg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, ListGroup, ListGroupItem } from "react-bootstrap";

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <header className="Header fixed-top">
                <Row>
                    <Col />

                    <Col md={8} lg={6}>
                        <Row>
                            <Col xs={4}>
                                <button type={"button"} className={"Header-logo"}>
                                    <img src={ Logo } className={"Header-logo-img"} />
                                </button>
                            </Col>

                            <Col>
                                <ListGroup className={"Header-list"}>
                                    <ListGroupItem className={"Header-item"}>
                                        <button
                                            type={"button"}
                                            className={"Header-item-button color-dark"}>
                                            <FontAwesomeIcon icon={ this.props.icon } />
                                        </button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Col>

                    <Col />
                </Row>
            </header>
        );
    }
}

export default Header;
