import React from "react"
import Card from "./Card"
import { CardGridDiv } from '../StyledComps'
const CardGrid = (props) =>
{
    const { users } = props
    return (
        <CardGridDiv>
            {users.map(user => <Card user={user} key={user.id}/>)}
        </CardGridDiv>
    )
}

export default CardGrid