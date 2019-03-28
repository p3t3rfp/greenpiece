import React, { Component } from 'react'
import styled from 'styled-components'

const NavBarStyle = styled.div`
display: flex;
align-items: center;
    h1 {
        font-size: 60px;
        text-shadow: 2px 2px 8px #000000;
        color: #269d26;
        margin-left: 35px;
    }
    a {
        color: #fafafa;
    }
    height: 150px;
    
`


class Navbar extends Component {

    render() {

            return (
                <div>
                    <NavBarStyle>
                        <h1>greenpiece</h1>
                    </NavBarStyle>
                </div>
            )
        }
    }

    export default Navbar