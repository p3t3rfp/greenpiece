import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Parks extends Component {
    state = {
        parks: [],
    }

    componentDidMount = () => {
        axios.get('/api/v1/parks').then(res => {
            console.table(this.state.parks)
            this.setState({ parks: res.data })
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.parks.map(park => {
                        return (
                            <div key={park._id}>
                                <Link
                                    to={`/${park._id}`}
                                >
                                    {park.name}
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Parks

