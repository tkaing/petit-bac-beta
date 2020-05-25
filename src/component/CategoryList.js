import React from 'react';
import './CategoryList.css';

import CategoryItem from "./CategoryItem";

class CategoryList extends React.Component {

    render() {
        const title = this.props.title;
        const horizontal = this.props.horizontal;
        const categories = this.props.categories;
        const titleDOM = title !== undefined ? <li className={"CategoryList-title text-left headline-lg"}>{ title }</li> : '';

        if (horizontal) {
            return (
                <ul className="CategoryList list-group list-group-horizontal">
                    { titleDOM }
                    <li className={"CategoryList-item"}>
                        <CategoryItem
                            title={"Prénom"}
                            cross={ this.props.delete }
                            toggle={ this.props.toggle }
                            active={ this.props.highlight }
                        />
                    </li>
                    <li className={"CategoryList-item"}>
                        <CategoryItem
                            title={"Animal"}
                            cross={ this.props.delete }
                            toggle={ this.props.toggle }
                            active={ this.props.highlight }
                        />
                    </li>
                </ul>
            );
        }
        return (
            <ul className="CategoryList list-group">
                { titleDOM }
                <li className={"CategoryList-item"}>
                    <CategoryItem
                        title={"Prénom"}
                        cross={ this.props.delete }
                        toggle={ this.props.toggle }
                        active={ this.props.highlight }
                    />
                </li>
                <li className={"CategoryList-item"}>
                    <CategoryItem
                        title={"Animal"}
                        cross={ this.props.delete }
                        toggle={ this.props.toggle }
                        active={ this.props.highlight }
                    />
                </li>
            </ul>
        );
    }
}

export default CategoryList;