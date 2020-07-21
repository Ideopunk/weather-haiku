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
                <p>{haiku.author}</p>
                <p>{haiku.date}</p>
                <p>Via the <a href="https://www.tempslibres.org/tl/en/dbhk00.html">tempslibres haiku database</a></p>
            </div>
        )
    }
}

export default Haiku;