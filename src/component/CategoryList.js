import React from 'react';
import './CategoryList.css';
import { ListGroup, ListGroupItem } from "react-bootstrap";

class CategoryList extends React.Component {

    static editableIdentifier = 100;

    render() {
        const title = this.props.title;
        const horizontal = this.props.horizontal;
        const categoryItems = this.props.categoryItems;

        const categories = categoryItems.map((categoryItem) =>
            React.cloneElement(categoryItem, { key: categoryItem.props.id })
        );

        return (
            <ListGroup className={"CategoryList"} horizontal={ horizontal ? "md" : false }>
                { title !== undefined &&
                    <ListGroupItem className={"CategoryList-title text-left headline-lg"}>
                        { title }
                    </ListGroupItem>
                }
                { categories }
            </ListGroup>
        );
    }
}

export default CategoryList;