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
            <div class='contentcontainer' id='haikucontainer'>
                <div id='haikutext'>
                    {haikulines}
                </div>
                <p id='haikuauthor'>{haiku.author}</p>
                <p id='haikudate'>{haiku.date}</p>
                
                <p><i>via the <a href="https://www.tempslibres.org/tl/en/dbhk00.html">tempslibres haiku database</a>.</i></p>
            </div>
        )
    }
}

export default Haiku;