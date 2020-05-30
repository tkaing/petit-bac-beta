import React from 'react';
import './Footer.css';

import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Col, Row, OverlayTrigger, Popover } from "react-bootstrap";
import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.handlePopoverHide = this.handlePopoverHide.bind(this);
        this.handleValidationClick = this.handleValidationClick.bind(this);
    }

    handlePopoverHide() {
        if (this.props.popover)
            this.props.onScreenDidMount({ footer_popover: null });
    }

    handleValidationClick() {
        if (this.props.onSubmit)
            this.props.onSubmit();
    }

    render() {

        const button = (
            <button
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
                    <span className={"headline-md color-light"}>{ this.props.popover }</span>
                    <FontAwesomeIcon icon={ faExclamation } size={ "2x" } className={"color-yellow"} />
                </Popover.Content>
            </Popover>
        );

        const overlay = (
            <OverlayTrigger
                trigger="focus"
                key={ "top" }
                onHide={ this.handlePopoverHide }
                defaultShow={ this.props.popover !== null }
                delay={ { show: 500, hide: 100 } }
                overlay={ popover }
                placement={ "top" }>
                { button }
            </OverlayTrigger>
        )

        return (
            <footer className="Footer fixed-bottom">
                <Row>
                    <Col />

                    <Col md={8} lg={6}>
                        <Row className={"align-items-center"}>
                            <Col>
                                <div className={"Footer-child Footer-left color-yellow"}>
                                    { this.props.leftComponent }
                                </div>
                            </Col>

                            <Col>
                                { overlay }
                            </Col>

                            <Col>
                                <div className={"Footer-child Footer-right color-yellow"}>
                                    { this.props.rightComponent }
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