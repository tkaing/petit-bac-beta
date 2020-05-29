import React from 'react';
import './CategoryList.css';
import { ListGroup, ListGroupItem } from "react-bootstrap";

class CategoryList extends React.Component {

    static editableIdentifier = 100;
    static emptyTitle = "Ajouter des catégories";
    static defaultTitle = "Catégories de la partie";

    render() {
        const title = this.props.title;
        const horizontal = this.props.horizontal;
        const categoryItems = this.props.categoryItems;

        return (
            <ListGroup className={"CategoryList"} horizontal={ horizontal ? "md" : false }>
                { title !== undefined &&
                    <ListGroupItem className={"CategoryList-title text-left headline-lg"}>
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