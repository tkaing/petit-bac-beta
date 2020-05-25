import React from 'react';
import './CategoryItem.css';

class CategoryItem extends React.Component {

    render() {
        return (
            <button type={"button"}
                    className="btn badge badge-pill badge-primary">
                Primary
            </button>
        );
    }
}

export default CategoryItem;