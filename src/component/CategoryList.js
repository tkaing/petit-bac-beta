import React from 'react';
import './CategoryList.css';

import { ListGroup, ListGroupItem } from "react-bootstrap";

class CategoryList extends React.Component {

    static editableIdentifier = 100;
    static defaultTitle = "Catégories de la partie";
    static emptyTitle = "";

    render() {
        const title = this.props.title;
        const horizontal = this.props.horizontal;
        const categoryItems = this.props.categoryItems;

        return (
            <ListGroup className={"CategoryList"} horizontal={ horizontal ? "md" : false }>
                { title !== undefined &&
                    <ListGroupItem className={"CategoryList-title text-xs-center text-md-left headline-lg"}>
                        { title }
                    </ListGroupItem>
                }
                { categoryItems.map((categoryItem) =>
                    React.cloneElement(categoryItem, { key: categoryItem.props.id })
                ) }
            </ListGroup>
        );
    }
}

export default CategoryList;