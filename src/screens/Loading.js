import React from 'react';
import './Loading.css';

import Creation from "./Creation";
import { withRouter } from 'react-router-dom';

class Loading extends React.Component {

    static path = '/loading';

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const self = this;
        setTimeout(function () {
            self.props.history.push(Creation.path);
        }, 4000);
    }

    componentWillUnmount() {}

    render() {
        return (
            <div className={"Loading"}>
                <div className={"Loading-wrapper"}>
                    <div className="spinner">
                        <div className="double-bounce1" />
                        <div className="double-bounce2" />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Loading);
