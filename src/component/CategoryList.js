import React from 'react';
import './CategoryList.css';

class CategoryList extends React.Component {

    render() {
        const title = this.props.title;
        const horizontal = this.props.horizontal;
        const categories = this.props.categories;
        const categoriesDOM = categories.map((categoryItem, index) =>
            <li key={ index } className={"CategoryList-item"}>
                { categoryItem }
            </li>
        );
        const horizontalClassName = horizontal ? 'list-group-horizontal' : '';

        return (
            <ul className={"CategoryList list-group " + horizontalClassName }>
                { title !== undefined &&
                    <li className={"CategoryList-title text-left headline-lg"}>
                        { title }
                    </li>
                }
                { categoriesDOM }
            </ul>
        );
    }
}

export default CategoryList;