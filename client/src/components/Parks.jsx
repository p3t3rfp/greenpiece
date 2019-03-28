import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
class Parks extends Component {


    componentDidMount = () => {
        this.props.getAllParks()
    }



    render() {
        return (
            <Wrapper>
                <FlexRowCentered>
                    {
                        this.props.allParks.map(park => {
                            return (
                                <Card key={`allParks${park._id}`}>
                                    <div>
                                        <Pictures>
                                            <img src={park.image} alt={park.name} />
                                        </Pictures>
                                        <Link to={{
                                            pathname: `/parks/${park._id}`,
                                            state: {
                                                createdUser: this.props.createdUser
                                            }
                                        }}>{park.name}</Link>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </FlexRowCentered>
            </Wrapper>
        )
    }
}

export default Parks

