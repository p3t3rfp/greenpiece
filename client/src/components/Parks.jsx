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
        console.log('mounted')
        axios.get('/api/v1/parks').then(res => {
            this.setState({ parks: res.data })
        })
    }

    render() {
        return (
            <Wrapper>
                <div>
                { typeof this.props.location.state !== "undefined"
                    ?
                    <Link to={{
                        pathname: `/user/${this.props.location.state.createdUser._id}/parks`,
                        state: {createdUser: this.props.location.state.createdUser._id}
                        }}
                    >  
                        Show my Parks
                    </Link>
                    :null
                }
                </div>
                {
                    this.state.parks.map(park => {
                        return (
                            <Card>
                                <div key={park._id}>
                                <Pictures>
                                    <img src={park.image} alt={park.name}/>
                                </Pictures>
                                    <Link
                                        to={`/parks/${park._id}`}
                                    >
                                        {park.name}
                                    </Link>
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

