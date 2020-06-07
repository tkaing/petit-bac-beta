import React from 'react';
import './Creation.css';

import Game from "./Game";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import CategoryList from "../components/CategoryList";
import CategoryItem from "../components/CategoryItem";

import Joi from "@hapi/joi";
import { Col, Row } from "react-bootstrap";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

class Creation extends React.Component {

    static path = '/';

    constructor(props) {
        super(props);

        this.toCreation = this.toCreation.bind(this);

        this.setupCategories = this.setupCategories.bind(this);
        this.deleteCategoryItemText = this.deleteCategoryItemText.bind(this);
        this.appendCategoryItemText = this.appendCategoryItemText.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCategoryItemKeyUp = this.handleCategoryItemKeyUp.bind(this);
        this.handleCategoryItemClick = this.handleCategoryItemClick.bind(this);
        this.handleCloseCategoryItemClick = this.handleCloseCategoryItemClick.bind(this);

        this.state = {
            handlePopup: null,
            categoryItems: [],
            categoryValues: [],
            categoryItemsSelected: [],
            categoryListTitle: CategoryList.emptyTitle
        };
    }

    componentDidMount() {
        CategoryList.editableIdentifier = 100;
        this.setState({
            categoryItems: this.setupCategories(),
            categoryListTitle: CategoryList.emptyTitle
        });
    }

    componentWillUnmount() {
        CategoryList.editableIdentifier = 100;
    }

    toCreation(options) {
        this.setState(options);
    }

    handleSubmit() {

        const
            idValidation = Joi.number(),
            textValidation = Joi.string().required();
        const
            uniqueFnSchema = (a, b) => a.text.trim().toLowerCase() === b.text.trim().toLowerCase(),
            objectSchema = { id: idValidation, text: textValidation },
            itemsSchema = Joi.object(objectSchema),
            mainSchema = Joi.array().min(1).max(7).items(itemsSchema).unique(uniqueFnSchema),
            validator = mainSchema.validate(this.state.categoryValues);

        if (validator.error) {

            const
                error = validator.error,
                details = error.details[0];

            return { message: CategoryList.error_message(details.type) };

        } else {

            return { path: Game.path };
        }
    }

    handleCategoryItemClick(categoryItem) {

        let values = this.state.categoryValues;

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

            if (values.length >= 7) {

                const type = CategoryList.error_array_max;
                 this.state.handlePopup(CategoryList.error_message(type));

            } else {

                const itemSelected = CategoryItem.createEditable(
                    this.handleCategoryItemClick,
                    this.handleCategoryItemKeyUp,
                    this.handleCloseCategoryItemClick,
                );

                values = this.appendCategoryItemText(
                    values, itemSelected.props.id, ""
                );

                this.setState({
                    categoryItemsSelected: [...itemsSelected, itemSelected],
                    categoryListTitle: CategoryList.defaultTitle,
                    categoryValues: values
                });
            }

        } else {

            const
                categorySelected = itemsSelected.find((item) => item.props.id === id),
                active = categorySelected !== undefined,
                shouldAddItem = !active,
                shouldDeleteItem = active;

            if (shouldAddItem) {

                if (values.length >= 7) {

                    const type = CategoryList.error_array_max;
                    this.state.handlePopup(CategoryList.error_message(type));

                } else {

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

                    values = this.appendCategoryItemText(
                        values, id, title
                    );

                    this.setState({
                        categoryItems: items,
                        categoryItemsSelected: [...itemsSelected, itemSelected],
                        categoryListTitle: CategoryList.defaultTitle,
                        categoryValues: values
                    });
                }
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

                values = this.deleteCategoryItemText(values, id);

                this.setState({
                    categoryItems: items,
                    categoryItemsSelected: itemsSelected,
                    categoryListTitle: itemsSelected.length === 0
                        ? CategoryList.emptyTitle : CategoryList.defaultTitle,
                    categoryValues: values
                });
            }
        }
    }

    handleCategoryItemKeyUp(categoryItem, text) {

        const values = this.appendCategoryItemText(
            this.state.categoryValues,
            categoryItem.props.id,
            text
        );

        this.setState({
            categoryValues: values
        });
    }

    handleCloseCategoryItemClick(categoryItem) {

        let
            items = this.state.categoryItems,
            values = this.state.categoryValues,
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

        values = this.deleteCategoryItemText(values, id);

        this.setState({
            categoryItems: items,
            categoryItemsSelected: itemsSelected,
            categoryListTitle: itemsSelected.length === 0
                ? CategoryList.emptyTitle : CategoryList.defaultTitle,
            categoryValues: values
        });
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

    deleteCategoryItemText(categoryValues, id) {
        const
            index = categoryValues.findIndex((item) => item.id === id),
            containsItem = index !== -1;
        if (containsItem)
            categoryValues.splice(index, 1);
        return categoryValues;
    }

    appendCategoryItemText(categoryValues, id, text) {
        const
            item = categoryValues.find((item) => item.id === id),
            containsItem = item !== undefined;
        if (containsItem) {
            item.text = text;
            return categoryValues;
        }
        return [...categoryValues, { id: id, text: text }];
    }

    render() {
        const categoryList = (
            <CategoryList categoryItems={ this.state.categoryItems } />
        );
        const categoryListSelected = (
            <CategoryList categoryItems={ this.state.categoryItemsSelected } />
        );
        return (
            <div className={"Creation"}>
                <Header icon={ faGraduationCap } />
                <Row>
                    <Col xs={6} md={7}>
                        <section className={"Creation-left"}>
                            { React.cloneElement(categoryList, {
                                add: false,
                                delete: false,
                                toggle: true,
                                horizontal: true
                            }) }
                        </section>
                    </Col>

                    <Col>
                        <section className={"Creation-right"}>
                            { React.cloneElement(categoryListSelected, {
                                add: true,
                                delete: true,
                                toggle: false,
                                horizontal: false,
                                title: this.state.categoryListTitle
                            }) }
                        </section>
                    </Col>
                </Row>
                <Footer
                    left={ null }
                    right={ null }
                    toParent={ this.toCreation }
                    onSubmit={ this.handleSubmit } />
            </div>
        );
    }
}

export default Creation;
