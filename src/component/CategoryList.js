import React from 'react';
import './CategoryList.css';

class CategoryList extends React.Component {

    render() {
        const title = this.props.title;
        const categories = this.props.categories;
        const containsTitle = title !== undefined;
        return (
            <section className={"CategoryList"}>
                { containsTitle ? <div className={"CategoryList-title"}>{ title }</div> : '' }
            </section>
        );
    }
}

export default CategoryList;