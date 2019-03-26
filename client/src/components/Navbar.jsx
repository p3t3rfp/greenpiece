import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

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
                            
                        </div>
                    </NavBarStyle>


                </div>
            )
        }
    }

    export default Navbar