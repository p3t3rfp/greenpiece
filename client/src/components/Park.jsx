import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'

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
        park: [],
        createdUser: this.props.match.params.userId,
    }

    componentDidMount = () => {
        axios.get(`/api/v1/parks/${this.props.match.params.parkId}`)
            .then(res => {
                this.setState({ park: res.data })
            })
    }

    addPark = () => {
        axios.post(`/api/v1/user/${this.state.createdUser._id}/parks/${this.props.match.params.parkId}`)
            .then(res => {
                this.setState({ park: res.data })
            })
    }

    render() {
        return (

            <Wrapper>
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
                </Card>
            </Wrapper>
        );
    }
}

export default Park;