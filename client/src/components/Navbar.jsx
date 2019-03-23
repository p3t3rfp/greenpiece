import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <div>
                <header>
                    <h1>greenpiece</h1>
                    <div>
                        <div>
                            <Link to='/'>Home</Link>
                        </div>
                    </div>
                </header>


            </div>
        )
    }
}

export default Navbar