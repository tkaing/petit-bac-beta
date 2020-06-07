import React from 'react';
import './Footer.css';

import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Overlay, Popover } from "react-bootstrap";

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.handlePopoverBlur = this.handlePopoverBlur.bind(this);
        this.handlePopoverExited = this.handlePopoverExited.bind(this);
        this.handleValidationClick = this.handleValidationClick.bind(this);
        this.state = {
            show: false,
            target: null,
            message: null,
        };
    }

    componentDidMount() {
        this.props.toParent({
            handlePopup: (message) => {
                this.setState({
                    message: message
                }, this.handleValidationClick);
            }
        });
    }

    handlePopoverBlur() {
        this.setState({
            show: false
        });
    }

    handlePopoverExited() {
        this.setState({
            message: null
        });
    }

    handleValidationClick() {

        let target = this.state.target;

        if (this.props.onSubmit) {

            const error = this.props.onSubmit();

            if (this.state.message)
                error.message = this.state.message;

            if (error.message) {

                this.setState({
                    message: error.message,
                    target: target,
                    show: true
                });
            }

            if (error.path)
                this.props.history.push(error.path);
        }
    }

    render() {

        const button = (
            <button
                ref={ (element) => {
                    if (this.state.target === null)
                        this.setState({ target: element })
                }}
                type={"button"}
                className={"Footer-child Footer-middle color-blue"}
                onClick={ this.handleValidationClick }>
                <FontAwesomeIcon icon={ faCheck } />
            </button>
        );

        const popover = (
            <Popover
                id={`popover-positioned-top`}
                className={`background-dark`}>
                <Popover.Content>
                    <span className={"headline-md color-light"}>{ this.state.message }</span>
                    <FontAwesomeIcon icon={ faExclamation } size={ "2x" } className={"color-yellow"} />
                </Popover.Content>
            </Popover>
        );

        const overlay = (
            <Overlay
                show={ this.state.show }
                target={ this.state.target }
                rootClose={ true }
                onHide={() => this.setState({ show: false })}
                onExited={ this.handlePopoverExited }
                placement={ "top" }>
                { popover }
            </Overlay>
        )

        return (
            <footer className="Footer fixed-bottom">
                <Row>
                    <Col />

                    <Col md={8} lg={6}>
                        <Row className={"align-items-center"}>
                            <Col>
                                <div className={"Footer-child Footer-left color-yellow"}>
                                    { this.props.left }
                                </div>
                            </Col>

                            <Col>
                                { button }
                                { overlay }
                            </Col>

                            <Col>
                                <div className={"Footer-child Footer-right color-yellow"}>
                                    { this.props.right }
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