import React from 'react';
import './Timer.css';

class Timer extends React.Component {

    static Minutes = 'minutes';
    static Seconds = 'seconds';

    render() {
        if (this.props.isTimerMode) {
            return (
                <div className={"justify-content-center align-self-center"}>
                    0{ this.props.unit === Timer.Minutes ? 'm' : 's' }
                </div>
            );
        }
        return null;
    }
}

export default Timer;