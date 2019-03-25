import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Parks extends Component {
    state = {
        parks: [],
    }

    componentDidMount = () => {
        console.log('mounted')
        axios.get('/api/v1/parks').then(res => {
            this.setState({ parks: res.data })
            console.log(this.state.parks)
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Link to={{
                        pathname: `/user/${this.props.location.state.createdUser._id}/parks`,
                        state: {createdUser: this.props.location.state.createdUser._id}
                        }}
                    >  
                        Show my Parks
                    </Link>
                </div>
                {
                    this.state.parks.map(park => {
                        return (
                            <div>
                                <div key={park._id}>
                                    <img src={park.image} alt='image of a park'/>
                                        
                                    <Link
                                        to={`/parks/${park._id}`}
                                    >
                                        {park.name}
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Parks

