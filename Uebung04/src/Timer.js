import React, {Component} from "react";

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {count: this.props.countdown};
        this.interval = '0';

        // Event Ersteller:
        this.update = this.update.bind(this);
        this.starter = this.starter.bind(this);
   }

   update(){
    this.setState({count: this.state.count -1});

    if (this.state.count <= 1) {
        this.setState({msg: 'Fertig'});
        this.setState({count: ""});
        clearInterval(this.interval);
        this.interval = '0';}
    }

    starter(){
        this.setState({count: this.props.countdown});

        if (this.interval !== '0') {
            clearInterval(this.interval);
        }
        this.interval = setInterval(this.update, 1000);
    }

    render() {
        return (<>
            <h1>Timer 50 Sekunden</h1>
            <p>{this.state.count}</p>
            <p>{this.state.msg}</p>
            <button onClick = {this.starter}>Start</button>            
            </>)
    }

}

export default Timer;