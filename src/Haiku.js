import React, { Component } from "react";

class Haiku extends Component {
    render() {
        const {haiku} = this.props
        console.log(typeof(haiku))
        console.log(haiku.text)
        console.log(Array.isArray((haiku.text)))
        let haikulines = haiku.text.map((line, index) => 
            <p key={index}>{line}</p>    
        )
        return (
            <div id='haikucontainer'>
                {haikulines}
            </div>
        )
    }
}

export default Haiku;