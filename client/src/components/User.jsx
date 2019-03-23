import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class User extends Component {
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
    }


    componentDidMount = () => {
        axios.get('/api/v1').then(res => {
            this.setState({ parks: res.data })
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
        axios
            .post('/api/v1/user/:userId/parks', {
                name: this.state.newPark.name,
                neighborhood: this.state.newPark.neighborhood,
                playground: this.state.newPark.playground,
                dogs: this.state.newPark.dogs,
                image: this.state.newPark.image,
            })
            .then(res => {
                const parksList = [...this.state.parks]
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
                <h2>Green Spaces</h2>
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

export default User