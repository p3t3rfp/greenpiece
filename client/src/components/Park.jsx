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
    background-color: #78a778;
    opacity: .9;
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
        border-radius: 3px;
    }
`

const FlexContainerCentered = styled.div`
    display: flex;
    align-items: center;
`

const FlexRowCentered = styled(FlexContainerCentered)`
    flex-direction: row;
    flex-wrap: wrap;
`
const Button = styled.div`
    background-color: lightblue;
    border: 2px solid lightgray;
    border-radius: 3px;
    margin: 2px;
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
        isParkFormDisplayed: false,
    }

    componentDidMount = () => {
        axios.get(`/api/v1/parks/${this.state.parkId}`)
            .then(res => {
                this.setState({ park: res.data })
            })
    }

    addPark = () => {
        axios.post(`/api/v1/user/${this.props.location.state.createdUser}/parks`)
            .then(res => {
                this.setState({ park: res.data })
            })
    }

    deletePark = () => {
        const parkId = this.props.match.params.parkId
        axios.delete(`/api/v1/parks/${parkId}`)
            .then(() => {
                axios.delete(`/api/v1/user/${this.props.location.state.createdUser}/parks/${parkId}`)
            })
            .then(() => {
                this.props.history.goBack()
            })
    }

    updatePark = (e) => {
        e.preventDefault()
        const parkId = this.state.parkId
        axios.put(`/api/v1/parks/${parkId}`, {
            name: this.state.park.name,
            neighborhood: this.state.park.neighborhood,
            image: this.state.park.image,
            dogs: this.state.park.dogs,
            playground: this.state.park.playground
        }).then(() => {
            axios.put(`/api/v1/user/${this.props.location.state.createdUser}/parks/${parkId}`, {
                name: this.state.park.name,
                neighborhood: this.state.park.neighborhood,
                image: this.state.park.image,
                dogs: this.state.park.dogs,
                playground: this.state.park.playground
            }).then(() => {
                this.props.history.goBack()
            })
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

    toggleCheckedPlayground = () => {
        this.setState({
            park: {
                name: this.state.park.name,
                neighborhood: this.state.park.neighborhood,
                image: this.state.park.image,
                dogs: this.state.park.dogs,
                playground: !this.state.park.playground
            }
        })
    }

    toggleCheckedDogs = () => {
        this.setState({
            park: {
                name: this.state.park.name,
                neighborhood: this.state.park.neighborhood,
                image: this.state.park.image,
                dogs: !this.state.park.dogs,
                playground: this.state.park.playground
            }
        })
    }



    render() {
        const { createdUser } = this.props.location.state
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
                <FlexRowCentered>

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
                        <Button onClick={this.addPark}>Add to My Parks</Button>
                        <Button onClick={this.toggleParkForm}>Update this Park</Button>
                        <Button onClick={this.deletePark}>Remove this Park</Button>
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
                                        {this.state.park.playground ?

                                            <input
                                                checked
                                                id="playground"
                                                type="checkbox"
                                                name="playground"
                                                onClick={this.toggleCheckedPlayground}
                                                value={this.state.park.playground}
                                            />

                                            :

                                            <input
                                                id="playground"
                                                type="checkbox"
                                                name="playground"
                                                onClick={this.toggleCheckedPlayground}
                                                value={this.state.park.playground}
                                            />

                                        }
                                    </div>
                                    <div>
                                        <label htmlFor="dogs">Dogs</label>
                                        {this.state.park.dogs ?

                                            <input
                                                checked
                                                id="playground"
                                                type="checkbox"
                                                name="playground"
                                                onClick={this.toggleCheckedDogs}
                                                value={this.state.park.dogs}
                                            />

                                            :

                                            <input
                                                id="playground"
                                                type="checkbox"
                                                name="playground"
                                                onClick={this.toggleCheckedDogs}
                                                value={this.state.park.dogs}
                                            />

                                        }
                                    </div>

                                    <button>Update</button>
                                </form>
                                : null
                        }
                    </Card>
                </FlexRowCentered>
            </Wrapper>
        );
    }
}

export default Park;