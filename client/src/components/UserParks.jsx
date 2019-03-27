import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import Parks from './Parks'

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
        createdUser: "",
        startOver: false,
    }

    componentDidMount = () => {
        axios.get(`/api/v1/user/${this.props.match.params.userId}/parks`).then(res => {
            this.setState({ parks: res.data.parks })
        })

        axios.get(`/api/v1/user/${this.props.match.params.userId}`).then((res) => this.setState({createdUser: res.data._id}))
    }

    deleteUser = () => {
        const userId = this.props.match.params.userId
        axios.delete(`/api/v1/user/${userId}`)
            .then(res => {
                this.setState({ startOver: true })
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
            .post(`/api/v1/user/${this.props.match.params.userId}/parks`, {
                name: this.state.newPark.name,
                neighborhood: this.state.newPark.neighborhood,
                playground: this.state.newPark.playground,
                dogs: this.state.newPark.dogs,
                image: this.state.newPark.image
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

    addPark = () => {
        axios.put(`/api/v1/user/${this.props.match.params.userId}/parks`)
            .then(res => {
                const newParks = [...this.state.parks]
                newParks.push(res.data)
                console.log(res.data)

                this.setState({ parks: newParks })
            })
    }

    render() {
        if (this.state.startOver) {
            return (<Redirect to={{
                pathname: '/'
            }}
            />)
        }
        return (
            <div>
                <div>
                    <button onClick={this.deleteUser}>Remove User</button>
                </div>
                <div>
                    <h2>Your Favorite Green Spaces</h2>

                    <div>
                        {
                            this.state.parks.map(park => {
                                return (
                                    <div key={park._id}>
                                        <img src={park.image} alt={park.name} />
                                        <div>
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
                    <div>
                        <h2>Add some new Parks to your Green Spaces</h2>
                        <Parks parks={this.state.parks} addPark={this.addPark}
                            createdUser={this.state.createdUser}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default UserParks;