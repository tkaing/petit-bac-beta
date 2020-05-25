import React from 'react';
import './Timer.css';

class Timer extends React.Component {

    static Minutes = 'minutes';
    static Seconds = 'seconds';

    render() {
        if (this.props.isTimerMode) {
            const Letter = this.props.unit === Timer.Minutes ? 'm' : 's';
            return (
                <div className={"justify-content-center align-self-center"}>
                    0{Letter}
                </div>
            );
        }
        return null;
    }
}

export default Timer;