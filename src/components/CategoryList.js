import React from 'react';
import './CategoryList.css';

import { ListGroup, ListGroupItem } from "react-bootstrap";

class CategoryList extends React.Component {

    static editableIdentifier = 100;

    static emptyTitle = "";
    static defaultTitle = "Catégories de la partie";

    static error_array_min = "array.min";
    static error_array_max = "array.max";
    static error_array_unique = "array.unique";
    static error_string_empty = "string.empty";

    static error_message(type) {
        switch (type) {
            case "array.min":
                return "1 minimum";
            case "array.max":
                return "7 maximum";
            case "any.empty":
                return "catégories incomplète";
            case "array.unique":
                return "catégories identiques";
        }
    }

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