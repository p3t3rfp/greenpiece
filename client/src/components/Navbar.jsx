import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavBarStyle = styled.div`
    h1 {
        color: #269d26;
    }
    a {
        color: #fafafa;
    }
`
class Navbar extends Component {
    render() {
        return (
            <div>
                <NavBarStyle>
                    <h1>greenpiece</h1>
                    <div>
                        <div>
                            <Link to='/'>Home</Link>
                        </div>
                        {/* <div>
                            <Link to='/parks'>All Parks</Link>
                        </div> */}
                    </div>
                </NavBarStyle>


            </div>
        )
    }
}

export default Navbar