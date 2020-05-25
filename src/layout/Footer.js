import React from 'react';
import './Footer.css';

import { Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import { withRouter } from 'react-router-dom';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.handleValidationClick = this.handleValidationClick.bind(this);
    }

    handleValidationClick = () => {
        this.props.history.push(this.props.nextPath);
    }

    render() {
        return (
            <footer className="Footer fixed-bottom">
                <Row>
                    <Col />

                    <Col md={8} lg={6}>
                        <Row className={"align-items-center"}>
                            <Col>
                                <div className={"Footer-child Footer-minutes justify-content-center align-self-center"}>
                                    0m
                                </div>
                            </Col>

                            <Col>
                                <button type={"button"}
                                        className={"Footer-child Footer-middle"}
                                        onClick={ this.handleValidationClick }>
                                    <FontAwesomeIcon icon={ faCheck } />
                                </button>
                            </Col>

                            <Col>
                                <div className={"Footer-child Footer-seconds justify-content-center align-self-center"}>
                                    0s
                                </div>
                            </Col>
                        </Row>
                    </Col>

                    <Col />
                </Row>
            </footer>
        );
    }
}

export default withRouter(Footer);