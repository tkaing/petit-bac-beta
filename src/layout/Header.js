import React from 'react';
import './Header.css';

import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight, faGraduationCap} from '@fortawesome/free-solid-svg-icons'

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
                            <Col>
                                <button type={"button"} className={"Header-child Header-previous"}>
                                    <FontAwesomeIcon icon={ faChevronLeft } />
                                </button>
                            </Col>

                            <Col>
                                <button type={"button"} className={"Header-child Header-middle"}>
                                    <FontAwesomeIcon icon={ this.props.icon } />
                                </button>
                            </Col>

                            <Col>
                                <button type={"button"} className={"Header-child Header-next"}>
                                    <FontAwesomeIcon icon={ faChevronRight } />
                                </button>
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
