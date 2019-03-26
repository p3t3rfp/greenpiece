import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
    state = {
        user: {
            name: '',
            password: '',
        },
        redirectToParks: false,
        createdUser: {
            parks: []
        },
    }

    componentDidMount() {

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
                console.log(this.state.createdUser._id)
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
                        pathname: `/parks`,
                        state: {createdUser: this.state.createdUser}
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
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name='password'
                            onChange={this.handleChange}
                            value={this.state.user.password}
                        />
                    </div>
                    <button>Create User</button>
                </form>
            </div>
        )
    }
}

export default Login