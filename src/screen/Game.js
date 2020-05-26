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
        this.isActiveCategory = this.isActiveCategory.bind(this);
        this.createCategoryItem = this.createCategoryItem.bind(this);
        this.handleCategoryItemClick = this.handleCategoryItemClick.bind(this);
        this.state = {
            categoriesInitial: [],
            categoriesSelected: [],
        };
    }

    componentDidMount() {
        this.props.onScreenDidMount(faPencilAlt, Round.Path);
        this.setState({
            categoriesInitial: this.setupCategories()
        });
    }

    componentWillUnmount() {
        this.props.onScreenDidMount(faTrophy, Result.Path);
    }

    setupCategories() {
        return ["Prénom", "Animal"].map((title) =>
            this.createCategoryItem(title, false)
        );
    }

    isActiveCategory(title) {
        const categories = this.state.categoriesSelected;
        const category = categories.find((categoryItem) => {
            return categoryItem.props.title === title;
        });
        return category !== undefined;
    }

    createCategoryItem(title, selected, active = false) {
        const categoryItem = (
            <CategoryItem
                title={ title }
                active={ active }
                onCategoryItemClick={ this.handleCategoryItemClick }
            />
        );
        const props = selected
            ? { toggle: false, cross: true }
            : { toggle: true, cross: false };
        return React.cloneElement(categoryItem, props);
    }

    handleCategoryItemClick(item) {

        const
            currentTitle = item.props.title,
            categories = this.state.categoriesInitial;

        const
            categoriesInitial = [],
            categoriesSelected = [];

        categories.forEach((item) => {
            const
                title = item.props.title,
                active = this.isActiveCategory(title);
            let
                propsInitial,
                propsSelected;

            if (currentTitle === title) {
                propsInitial = { active: !active };
                propsSelected = !active ? { active: true } : null;
            } else {
                propsInitial = { active: active };
                propsSelected = active ? { active: active } : null;
            }

            const
                itemInitial = this.createCategoryItem(title, false),
                itemSelected = this.createCategoryItem(title, true);

            categoriesInitial.push(
                React.cloneElement(itemInitial, propsInitial)
            );
            if (propsSelected !== null)
                categoriesSelected.push(
                    React.cloneElement(itemSelected, propsSelected)
                );
        });

        this.setState({
            categoriesInitial: categoriesInitial,
            categoriesSelected: categoriesSelected,
        });
    }

    render() {
        const categoryListInitial = (
            <CategoryList categories={ this.state.categoriesInitial }
                          onCategoryItemClick={ this.handleCategoryItemClick } />
        );
        const categoryListSelected = (
            <CategoryList categories={ this.state.categoriesSelected }
                          onCategoryItemClick={ this.handleCategoryItemClick } />
        );
        return (
            <div className={"Game"}>
                <Row>
                    <Col xs={6} md={8}>
                        <section className={"Game-left"}>
                            { React.cloneElement(categoryListInitial, {
                                add: false,
                                toggle: true,
                                delete: false,
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
