import React from 'react';
import './Game.css';

import Round from "./Round";
import Result from "./Result";
import CategoryList from "../component/CategoryList";
import CategoryItem from "../component/CategoryItem";

import { Col, Row } from "react-bootstrap";
import { faPencilAlt, faTrophy } from "@fortawesome/free-solid-svg-icons";

class Game extends React.Component {

    static Path = '/';

    constructor(props) {
        super(props);
        this.setupCategories = this.setupCategories.bind(this);
        this.handleCategoryItemKeyUp = this.handleCategoryItemKeyUp.bind(this);
        this.handleCategoryItemClick = this.handleCategoryItemClick.bind(this);
        this.handleCloseCategoryItemClick = this.handleCloseCategoryItemClick.bind(this);
        this.state = {
            categoryItems: [],
            categoryItemsSelected: [],
        };
    }

    componentDidMount() {
        CategoryList.editableIdentifier = 100;
        this.props.onScreenDidMount(faPencilAlt, Round.Path);
        this.setState({
            categoryItems: this.setupCategories()
        });
    }

    componentWillUnmount() {
        CategoryList.editableIdentifier = 100;
        this.props.onScreenDidMount(faTrophy, Result.Path);
    }

    setupCategories() {
        const items = ["Prénom", "Animal"].map((title, index) =>
            CategoryItem.create(
                this.handleCategoryItemClick,
                index, title, false
            )
        );
        return [...items, CategoryItem.createAdd(this.handleCategoryItemClick)];
    }

    handleCategoryItemClick(categoryItem) {

        const
            items = this.state.categoryItems,
            itemsSelected = this.state.categoryItemsSelected;
        const
            id = categoryItem.props.id,
            title = categoryItem.props.title;
        const
            add = categoryItem.props.add,
            editable = categoryItem.props.editable;

        if (add) {

            const itemSelected = CategoryItem.createEditable(
                this.handleCategoryItemClick,
                this.handleCategoryItemKeyUp,
                this.handleCloseCategoryItemClick,
            );

            this.setState({
                categoryItemsSelected: [...itemsSelected, itemSelected]
            });

        } else {

            const
                categorySelected = itemsSelected.find((item) => item.props.id === id),
                active = categorySelected !== undefined,
                shouldAddItem = !active,
                shouldDeleteItem = active;

            if (shouldAddItem) {
                const
                    index = items.findIndex((item) => item.props.id === id),
                    containsItem = index !== -1;
                if (containsItem) {
                    const itemReplaced = CategoryItem.create(
                        this.handleCategoryItemClick,
                        id, title, true
                    );
                    items.splice(index, 1, itemReplaced);
                }
                const itemSelected = CategoryItem.createSelected(
                    this.handleCloseCategoryItemClick,
                    categoryItem
                );
                this.setState({
                    categoryItems: items,
                    categoryItemsSelected: [...itemsSelected, itemSelected]
                });
            }
            if (shouldDeleteItem) {
                let index;
                let containsItem;

                // Initial
                index = items.findIndex((item) => item.props.id === id);
                containsItem = index !== -1;
                if (containsItem)
                    items.splice(index, 1, CategoryItem.clone(categoryItem));

                // Selected
                index = itemsSelected.findIndex((item) => item.props.id === id);
                containsItem = index !== -1;
                if (containsItem)
                    itemsSelected.splice(index, 1);

                this.setState({
                    categoryItems: items,
                    categoryItemsSelected: itemsSelected
                });
            }
        }
    }

    handleCategoryItemKeyUp(categoryItem, text) {

        const id = categoryItem.props.id;
    }

    handleCloseCategoryItemClick(categoryItem) {

        let
            items = this.state.categoryItems,
            itemsSelected = this.state.categoryItemsSelected;

        const id = categoryItem.props.id;
        const editable = categoryItem.props.editable;

        let index;
        let containsItem;

        // Initial
        if (!editable) {
            index = items.findIndex((item) => item.props.id === id);
            containsItem = index !== -1;
            if (containsItem)
                items.splice(index, 1, CategoryItem.clone(categoryItem));
        }

        // Selected
        index = itemsSelected.findIndex((item) => item.props.id === id);
        containsItem = index !== -1;
        if (containsItem)
            itemsSelected.splice(index, 1);

        this.setState({
            categoryItems: items,
            categoryItemsSelected: itemsSelected
        });
    }

    render() {
        const categoryList = (
            <CategoryList categoryItems={ this.state.categoryItems } />
        );
        const categoryListSelected = (
            <CategoryList categoryItems={ this.state.categoryItemsSelected } />
        );
        return (
            <div className={"Game"}>
                <Row>
                    <Col xs={6} md={7}>
                        <section className={"Game-left"}>
                            { React.cloneElement(categoryList, {
                                add: false,
                                delete: false,
                                toggle: true,
                                horizontal: true
                            }) }
                        </section>
                    </Col>

                    <Col>
                        <section className={"Game-right"}>
                            { React.cloneElement(categoryListSelected, {
                                add: true,
                                delete: true,
                                toggle: false,
                                horizontal: false,
                                title: "Catégories de la partie"
                            }) }
                        </section>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Game;
