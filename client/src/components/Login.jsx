import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

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
            <div>
                <h1>Welcome to greenpiece</h1>

                <form onSubmit={this.handleSignUp}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.user.name}
                        />
                    </div>
                    <button>Let's Get Outside</button>
                </form>
            </div>
        )
    }
}

export default Login