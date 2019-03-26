import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 80%;
    margin: 0 auto;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #78a778;
    align-items: center;
    text-align: center;
    padding: 20px;
    border: 1px solid lightgray;
    border-radius: 2px;
    margin: 15px 15px 15px 0;
`
const Pictures = styled.div`
    img {
        height: 250px;
        width: 250px;
    }
`

class Parks extends Component {
    state = {
        parks: [],
    }

    componentDidMount = () => {
        axios.get('/api/v1/parks').then(res => {
            this.setState({ parks: res.data })
        })
    }

    

    render() {
        return (
            <Wrapper>
                {
                    this.state.parks.map(park => {
                        return (
                            <Card>
                                <div key={park._id}>
                                <Pictures>
                                    <img src={park.image} alt={park.name}/>
                                </Pictures>
                                    <Link to={{
                                        pathname: `/parks/${park._id}`,
                                        state: {
                                            createdUser: this.props.createdUser
                                        }
                                    }}>{park.name}</Link>
                                    <button onClick={this.props.addPark}>Add to My Parks</button>
                                </div>
                            </Card>
                        )
                    })
                }
            </Wrapper>
        )
    }
}

export default Parks

