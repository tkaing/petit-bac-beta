import React from 'react';
import './CategoryItem.css';

import { Button } from "react-bootstrap";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CategoryItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleTextClick = this.handleTextClick.bind(this);
        this.state = {
            active: this.props.active
        };
    }

    handleTextClick() {
        const isToggleItem = this.props.toggle;
        const isActiveItem = this.state.active;
        this.setState({
            active: isToggleItem ? !isActiveItem : this.props.active
        });
    }

    render() {
        let crossDOM = null;
        if (this.props.cross) {
            crossDOM = (
                <Button
                    type={"button"}
                    variant={"link"}
                    className={"CategoryItem-close"}>
                    <FontAwesomeIcon icon={ faTimesCircle } />
                </Button>
            );
        }
        return (
            <div className={"CategoryItem"}>
                <Button
                    type={"button"}
                    active={ this.state.active }
                    variant={"outline-primary"}
                    onClick={ this.handleTextClick }
                    className={"CategoryItem-text headline-sm"}>
                    { this.props.title }
                </Button>
                { crossDOM }
            </div>
        );
    }
}

export default CategoryItem;