import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
    width: 80%;
    margin: 0 auto;
`

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

const Pictures = styled.div`
    img {
        height: 250px;
        width: 250px;
    }
`

class Park extends Component {
    state = {
        park: {
            name: '',
            neighborhood: '',
            image: '',
            playground: false,
            dogs: false,
        },
        parkId: this.props.match.params.parkId,
        createdUser: this.props.match.params.userId,
        isParkFormDisplayed: false,
    }

    componentDidMount = () => {
        // axios.get(`/api/v1/user/${this.props.match.params.userId}/parks/${this.props.match.params.parkId}`)
        axios.get(`/api/v1/parks/${this.props.match.params.parkId}`)
            .then(res => {
                console.log(res.data)
                // console.log(this.state.park)
                this.setState({ park: res.data })
                
            })
    }

    addPark = () => {
        axios.post(`/api/v1/user/${this.state.createdUser}/parks`)
            .then(res => {
                this.setState({ park: res.data })
            })
    }

    updatePark = () => {
        axios.patch(`/api/user/${this.state.createdUser}/parks/${this.state.parkId}`).then(res => {
            this.setState({ park: res.data })
        })
    }

    toggleParkForm = () => {
        this.setState((state, props) => {
            return ({ isParkFormDisplayed: !state.isParkFormDisplayed })
        })
    }

    handleChange = (e) => {
        const cloneNewPark = { ...this.state.park }
        cloneNewPark[e.target.name] = e.target.value
        this.setState({ park: cloneNewPark })
    }

    render() {
        const {createdUser} = this.props.location.state
        return (

            <Wrapper>
                <Link to={{
                    pathname: `/user/${createdUser}/parks`,
                    state: {
                        createdUser: createdUser
                    }
                }}
                >
                    Back to my parks
                </Link>

                <Card>
                    <div>
                        Park name: {this.state.park.name}
                    </div>
                    <div>
                        Neighborhood: {this.state.park.neighborhood}
                    </div>
                    <Pictures>
                        <img src={this.state.park.image} alt={this.state.park.name} />
                    </Pictures>
                    {
                        this.state.park.playground ?
                            <div>
                                Has playground: Yes
                </div>
                            :
                            <div>
                                Has playground: No
                </div>
                    }
                    {this.state.park.dogs ?
                        <div>
                            Good for dogs: Yes
                </div>
                        :
                        <div>
                            Good for dogs: No
                </div>
                    }
                    <button onClick={this.addPark}>Add to My Parks</button>
                    <button onClick={this.toggleParkForm}>Update this Park</button>
                    {
                        this.state.isParkFormDisplayed
                            ? <form onSubmit={this.updatePark}>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        onChange={this.handleChange}
                                        value={this.state.park.name}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="neighborhood">Neighborhood</label>
                                    <input
                                        id="neighborhood"
                                        type="text"
                                        name="neighborhood"
                                        onChange={this.handleChange}
                                        value={this.state.park.neighborhood}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="image">Image</label>
                                    <input
                                        id="image"
                                        type="text"
                                        name="image"
                                        onChange={this.handleChange}
                                        value={this.state.park.image}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="playground">Playground</label>
                                    <input
                                        id="playground"
                                        type="checkbox"
                                        name="playground"
                                        onChange={this.handleChange}
                                        value={this.state.park.playground}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="dogs">Dogs</label>
                                    <input
                                        id="dogs"
                                        type="checkbox"
                                        name="dogs"
                                        onChange={this.handleChange}
                                        value={this.state.park.dogs}
                                    />
                                </div>

                                <button>Update</button>
                            </form>
                            : null
                    }
                </Card>
            </Wrapper>
        );
    }
}

export default Park;