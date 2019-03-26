import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class UserParks extends Component {

    state = {
        parks: [],
        newPark: {
            name: '',
            neighborhood: '',
            playground: false,
            dogs: false,
            image: '',
        },
        isParkFormDisplayed: false,
        createdUser: this.props.location.state.createdUser
    }


    componentDidMount = () => {
        console.log('component mounted')
        console.log(this.state.createdUser)
        axios.get(`/api/v1/user/${this.state.createdUser}/parks`).then(res => {
            console.log(res.data)
            this.setState({ parks: res.data.parks })
        })
    }

    toggleParkForm = () => {
        this.setState((state, props) => {
            return ({ isParkFormDisplayed: !state.isParkFormDisplayed })
        })
    }

    handleChange = (e) => {
        const cloneNewPark = { ...this.state.newPark }
        cloneNewPark[e.target.name] = e.target.value
        this.setState({ newPark: cloneNewPark })
    }

    createPark = (e) => {
        e.preventDefault()
        // console.log(this.props.match.params.userId)
        axios
            .post(`/api/v1/user/${this.props.match.params.userId}/parks`, {
                name: this.state.newPark.name,
                neighborhood: this.state.newPark.neighborhood,
                playground: this.state.newPark.playground,
                dogs: this.state.newPark.dogs,
                image: this.state.newPark.image
            })
            .then(res => {
                const parksList = [...this.state.parks]
                console.log(parksList)
                parksList.unshift(res.data)
                this.setState({
                    newPark: {
                        name: '',
                        neighborhood: '',
                        playground: false,
                        dogs: false,
                        image: '',
                    },
                    isParkFormDisplayed: false,
                    parks: parksList
                })
            })

    }

    render() {
        return (
            <div>
                <h2>Your Favorite Green Spaces</h2>

                <div>
                    {
                        this.state.parks.map(park => {
                            return (
                                <div key={park._id}>
                                    <img src={park.image} alt={park.name} />

                                    <Link
                                        to={`/user/${this.state.createdUser}/parks/${park._id}`}
                                    >
                                        {park.name}
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>

                <button onClick={this.toggleParkForm}>+ New Park</button>
                {
                    this.state.isParkFormDisplayed
                        ? <form onSubmit={this.createPark}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.newPark.name}
                                />
                            </div>
                            <div>
                                <label htmlFor="neighborhood">Neighborhood</label>
                                <input
                                    id="neighborhood"
                                    type="text"
                                    name="neighborhood"
                                    onChange={this.handleChange}
                                    value={this.state.newPark.neighborhood}
                                />
                            </div>
                            <div>
                                <label htmlFor="image">Image</label>
                                <input
                                    id="image"
                                    type="text"
                                    name="image"
                                    onChange={this.handleChange}
                                    value={this.state.newPark.image}
                                />
                            </div>
                            <div>
                                <label htmlFor="playground">Playground</label>
                                <input
                                    id="playground"
                                    type="checkbox"
                                    name="playground"
                                    onChange={this.handleChange}
                                    value={this.state.newPark.playground}
                                />
                            </div>
                            <div>
                                <label htmlFor="dogs">Dogs</label>
                                <input
                                    id="dogs"
                                    type="checkbox"
                                    name="dogs"
                                    onChange={this.handleChange}
                                    value={this.state.newPark.dogs}
                                />
                            </div>

                            <button>Create</button>
                        </form>
                        : null
                }
            </div>
        );
    }
}

export default UserParks;