import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Card = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fafa98;
    align-items: center;
    padding: 20px;
    border: 1px solid lightgray;
    border-radius: 2px;
    margin: 15px 15px 15px 0;
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
            <div>
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
                                    <img src={park.image} alt={park.name}/>
                                        
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
            </div>
        )
    }
}

export default Parks

