import React from "react"
import { CardDiv } from '../StyledComps'
const Card = (props) =>
{
    const { user } = props
    return (
        <CardDiv>
            <h3>Name: {user.name}</h3>
            <h3>Email: {user.email}</h3>
        </CardDiv>
    )
}

export default Card