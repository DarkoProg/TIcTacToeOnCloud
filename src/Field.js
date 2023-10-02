import React from 'react';
import O from './assets/O.png'
import X from './assets/X.png'

class Field extends React.Component {
    constructor(props) {
        super();

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            index: 0,
            img: ['',O, X]
        }

    }

    handleClick = (e) => {

        if (this.state.index + 1 === this.state.img.length) {
            this.setState({
                index: 0
            })
        }
        else {
            this.setState({
                index: this.state.index + 1
            })
        }

        console.log('hello ' + this.state.img[this.state.index]);
    }



    render() {
        return (    
                <button className="field" onClick={this.handleClick}>
                    <img src={this.state.img[this.state.index]} />
                </button>
        )
    }
}

export default Field;