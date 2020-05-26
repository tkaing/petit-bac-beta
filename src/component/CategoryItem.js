import React from 'react';
import './CategoryItem.css';

import { Button } from "react-bootstrap";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CategoryItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onCategoryItemClick(this);
    }

    render() {
        let TextButtonDOM = (
            <Button
                type={"button"}
                active={ this.props.active }
                variant={"outline-primary"}
                className={"CategoryItem-text headline-sm"}>
                { this.props.title }
            </Button>
        );
        if (this.props.toggle)
            TextButtonDOM = React.cloneElement(TextButtonDOM, { onClick: this.handleClick });

        return (
            <div className={"CategoryItem"}>
                { TextButtonDOM }
                { this.props.cross &&
                    <Button
                        type={"button"}
                        variant={"link"}
                        onClick={ this.handleClick }
                        className={"CategoryItem-close"}>
                        <FontAwesomeIcon icon={ faTimesCircle } />
                    </Button>
                }
            </div>
        );
    }
}

export default CategoryItem;