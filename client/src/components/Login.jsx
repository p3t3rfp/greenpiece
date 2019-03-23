import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
    state = {
        user: {
            name: '',
            password: '',
        },
        redirectToHome: false,
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
                console.log(res.data)
                this.setState({ redirectToHome: true, createdUser: res.data })
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
        if (this.state.redirectToHome === true) {
            return (<Redirect to={`/parks`} />)
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