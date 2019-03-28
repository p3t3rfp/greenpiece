import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import Parks from './Parks'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 80%;
    margin: 0 auto;
`

const FormWrapper = styled.div`
    width: 80%;
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

const Button = styled.button`
    background-color: lightblue;
    border: 2px solid lightgray;
    border-radius: 3px;
    margin: 8px;
`

const Headings = styled.div`
    text-align: center;
    font-size: 30px;
    text-shadow: 4px 4px 8px #000000;
    color: #fafafa;
`

const Label = styled.label`
    font-size: 18px;
    color: #fafafa;
`

const Form = styled.form`
    background: #78a778;
    display: flex;
    border: 1px solid black;
    border-radius: 4px;
    flex-direction: column;
    padding-left: 20px;
    width: 400px;
    button {
        width: 60px;
    }
    div {
        flex-direction: column;

    }
    input {
        margin: 15px;
    }
`

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
        allParks: [],
    }

    getParks = () => {
        axios.get(`/api/v1/user/${this.props.match.params.userId}/parks`).then(res => {
            this.setState({ parks: res.data.parks })
        })
    }

    getAllParks = () => {
        axios.get('/api/v1/parks').then(res => {
            this.setState({ allParks: res.data })
        })
    }

    componentDidMount = () => {
        this.getParks()

        axios.get(`/api/v1/user/${this.props.match.params.userId}`)
            .then((res) => this.setState({ createdUser: res.data._id }))
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
            }).then(() => {
                this.getParks()
                this.getAllParks()
            })

    }

    addPark = () => {
        axios.get(`/api/v1/user/${this.props.match.params.userId}/parks`)
            .then(res => {
                const newParks = [...this.state.parks]
                newParks.push(res.data)
                this.setState({ parks: newParks })
            })
    }

    toggleCheckedPlayground = () => {
        this.setState({
            newPark: {
                name: this.state.newPark.name,
                neighborhood: this.state.newPark.neighborhood,
                image: this.state.newPark.image,
                dogs: this.state.newPark.dogs,
                playground: !this.state.newPark.playground
            }
        })
    }

    toggleCheckedDogs = () => {
        this.setState({
            newPark: {
                name: this.state.newPark.name,
                neighborhood: this.state.newPark.neighborhood,
                image: this.state.newPark.image,
                dogs: !this.state.newPark.dogs,
                playground: this.state.newPark.playground
            }
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
            <Wrapper>
                <div>
                    <Button onClick={this.deleteUser}>Remove User</Button>
                </div>
                <div>
                    <Headings>Your Favorite Green Spaces</Headings>

                    <Wrapper>

                        <FlexRowCentered>
                            {
                                this.state.parks.map(park => {
                                    return (

                                        <Card key={park._id}>
                                            <Pictures>
                                                <img src={park.image} alt={park.name} />
                                            </Pictures>

                                            <div>
                                                <Link to={{
                                                    pathname: `/parks/${park._id}`,
                                                    state: {
                                                        createdUser: this.state.createdUser,
                                                    }
                                                }}
                                                >
                                                    {park.name}
                                                </Link>

                                            </div>
                                        </Card>

                                    )
                                })
                            }
                        </FlexRowCentered>
                    </Wrapper>

                    <Button onClick={this.toggleParkForm}>+ New Park</Button>
                    <FormWrapper>
                            {
                                this.state.isParkFormDisplayed
                                    ? <Form onSubmit={this.createPark}>
                                        <div>
                                            <Label htmlFor="name">Name</Label>
                                            <input
                                                id="name"
                                                type="text"
                                                name="name"
                                                onChange={this.handleChange}
                                                value={this.state.newPark.name}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="neighborhood">Neighborhood</Label>
                                            <input
                                                id="neighborhood"
                                                type="text"
                                                name="neighborhood"
                                                onChange={this.handleChange}
                                                value={this.state.newPark.neighborhood}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="image">Image</Label>
                                            <input
                                                id="image"
                                                type="text"
                                                name="image"
                                                onChange={this.handleChange}
                                                value={this.state.newPark.image}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="playground">Playground</Label>
                                            {this.state.newPark.playground ?

                                                <input
                                                    checked
                                                    id="playground"
                                                    type="checkbox"
                                                    name="playground"
                                                    onClick={this.toggleCheckedPlayground}
                                                    value={this.state.newPark.playground}
                                                />

                                                :

                                                <input
                                                    id="playground"
                                                    type="checkbox"
                                                    name="playground"
                                                    onClick={this.toggleCheckedPlayground}
                                                    value={this.state.newPark.playground}
                                                />

                                            }
                                        </div>
                                        <div>
                                            <Label htmlFor="dogs">Dogs</Label>
                                            {this.state.newPark.dogs ?

                                                <input
                                                    checked
                                                    id="playground"
                                                    type="checkbox"
                                                    name="playground"
                                                    onClick={this.toggleCheckedDogs}
                                                    value={this.state.newPark.dogs}
                                                />

                                                :

                                                <input
                                                    id="playground"
                                                    type="checkbox"
                                                    name="playground"
                                                    onClick={this.toggleCheckedDogs}
                                                    value={this.state.newPark.dogs}
                                                />

                                            }
                                        </div>

                                        <Button>Create</Button>
                                    </Form>
                                    : null
                            }
                    </FormWrapper>
                    <div>
                        <Headings>Add some new Parks to your Green Spaces</Headings>
                        <Parks parks={this.state.parks} addPark={this.addPark}
                            createdUser={this.state.createdUser}
                            getAllParks={this.getAllParks}
                            allParks={this.state.allParks}
                        />
                    </div>
                </div>
            </Wrapper>
        );
    }
}

export default UserParks;