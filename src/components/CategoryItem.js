import React from 'react';
import './CategoryItem.css';

import CategoryList from "./CategoryList";

import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ListGroupItem } from "react-bootstrap";

class CategoryItem extends React.Component {

    constructor(props) {
        super(props);
        this.placeholder = "Catégorie";
        this.contentEditable = null;
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    static clone(item) {
        const element = (
            <CategoryItem
                id={ item.props.id }
                title={ item.props.title }
                onCategoryItemClick={ item.props.onCategoryItemClick }
            />
        );
        const props = {
            add: false,
            cross: false,
            toggle: true,
            active: false,
            editable: false,
            customizable: false
        };
        return React.cloneElement(element, props);
    }

    static create(handler, id, title, active = false) {
        const element = (
            <CategoryItem
                id={ id }
                title={ title }
                onCategoryItemClick={ handler }
            />
        );
        const props = {
            add: false,
            cross: false,
            toggle: true,
            active: active,
            editable: false,
            customizable: false
        };
        return React.cloneElement(element, props);
    }

    static createAdd(handler) {
        const element = (
            <CategoryItem
                title={ "Ajouter" }
                onCategoryItemClick={ handler }
            />
        );
        const props = {
            add: true,
            cross: false,
            toggle: false,
            active: true,
            editable: false,
            customizable: true
        };
        return React.cloneElement(element, props);
    }

    static createEditable(handler, handlerKeyUp, handlerClose, title = "") {
        const element = (
            <CategoryItem
                id={ CategoryList.editableIdentifier++ }
                title={ title }
                onCategoryItemClick={ handler }
                onCategoryItemKeyUp={ handlerKeyUp }
                onCloseCategoryItemClick={ handlerClose }
            />
        );
        const props = {
            add: false,
            cross: true,
            toggle: false,
            active: true,
            editable: true,
            customizable: true
        };
        return React.cloneElement(element, props);
    }

    static createSelected(handlerClose, item) {
        const element = (
            <CategoryItem
                id={ item.props.id }
                title={ item.props.title }
                onCategoryItemClick={ item.props.onCategoryItemClick }
                onCloseCategoryItemClick={ handlerClose }
            />
        );
        const props = {
            add: false,
            cross: true,
            toggle: false,
            active: true,
            editable: false,
            customizable: false
        };
        return React.cloneElement(element, props);
    }

    handleKeyUp(event) {
        this.props.onCategoryItemKeyUp(this, event.target.innerText);
    }

    handleClick() {

        const
            editable = this.props.editable,
            contentEditable = this.contentEditable;

        if (editable) {
            if (contentEditable)
                contentEditable.focus();
        } else {
            this.props.onCategoryItemClick(this);
        }
    }

    handleCloseClick() {
        this.props.onCloseCategoryItemClick(this);
    }

    render() {
        const
            add = this.props.add,
            cross = this.props.cross,
            title = this.props.title,
            toggle = this.props.toggle,
            active = this.props.active,
            editable = this.props.editable,
            customizable = this.props.customizable;

        const
            variant = customizable ? "outline-primary" : "outline-primary",
            customizableClassName = customizable ? " CategoryItem-text-customizable" : "";

        const
            TextCustomIconDOM = <FontAwesomeIcon className={"CategoryItem-text-custom-icon"} />,
            TextCustomContentDOM = (
                <div
                    ref={ (element) => this.contentEditable = element }
                    className={"CategoryItem-text-custom-content"}
                    placeholder={ this.placeholder }>{ title }</div>
            );

        let TextIcon = add ? faPlus : faPencilAlt;
        let TextCustomDOM = customizable ? (
            <div className={"CategoryItem-text-custom"}>
                { React.cloneElement(TextCustomIconDOM, { icon: TextIcon }) }
                { React.cloneElement(TextCustomContentDOM, {
                    contentEditable: editable, onKeyUp: this.handleKeyUp
                }) }
            </div>
        ) : title;

        let TextDOM = (
            <Button
                type={"button"}
                active={ active }
                variant={ variant }
                className={"CategoryItem-text headline-sm" + customizableClassName }>
                { TextCustomDOM }
            </Button>
        );
        if (add || toggle || editable)
            TextDOM = React.cloneElement(TextDOM, { onClick: this.handleClick });

        return (
            <ListGroupItem className={"CategoryItem"}>
                { TextDOM }
                { cross &&
                    <Button
                        type={"button"}
                        variant={"link"}
                        className={"CategoryItem-close"}
                        onClick={ this.handleCloseClick }>
                        <FontAwesomeIcon icon={ faTimesCircle } className={"CategoryItem-close-icon"} />
                    </Button>
                }
            </ListGroupItem>
        );
    }
}

export default CategoryItem;