import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 80%;
    margin: 0 auto;
`

const Button = styled.button`
    background-color: lightblue;
    border: 2px solid lightgray;
    border-radius: 3px;
    margin: 2px;
`
const FlexContainerCentered = styled.div`
    display: flex;
    align-items: center;
`

const FlexRowCentered = styled(FlexContainerCentered)`
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
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
    p {
        color: #fafafa;
        font-size: 25px;
    }
`

const Label = styled.label`
    font-size: 18px;
    color: #fafafa;
`

const Form = styled.form`
    background: #78a778;
    display: flex;
    align-items: center;
    border: 1px solid black;
    border-radius: 4px;
    
    input {
        margin: 15px;
    }
`

const Headings = styled.div`
    text-align: center;
    font-size: 30px;
    color: #fafafa;
`

class Login extends Component {
    state = {
        user: {
            name: '',
        },
        redirectToParks: false,
        createdUser: {},
    }


    getUser = () => {
        axios.get('/api/v1/user/:userId').then(res => {
            this.setState({ user: res.data })
        })
    }



    createUser = () => {
        axios.post('/api/v1', {
            user: this.state.user
        })
            .then(res => {
                this.setState({ redirectToParks: true, createdUser: res.data })
            })
    }

    handleChange = (event) => {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    handleSignUp = (e) => {
        e.preventDefault()
        this.createUser()
    }

    render() {
        if (this.state.redirectToParks === true) {
            return (<Redirect to={{
                pathname: `/user/${this.state.createdUser._id}/parks`,
                state: {
                    createdUser: this.state.createdUser,
                    name: this.state.user.name,
                }
            }}
            />)
        }

        return (
            <Wrapper>
                <FlexRowCentered>

                    <Card>
                        <Headings>Welcome to greenpiece</Headings>
                        <p>Find your piece</p>

                        <Form onSubmit={this.handleSignUp}>
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.user.name}
                                />
                            </div>
                            <Button>Let's Get Outside</Button>
                        </Form>
                    </Card>
                </FlexRowCentered>
            </Wrapper>
        )
    }
}

export default Login