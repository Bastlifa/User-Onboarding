import styled from "styled-components"
import { Form, Field } from 'formik'

export const StyledForm = styled(Form)`
    display: flex;
    flex-flow: column;
    align-items: center;
    
    button
    {
        margin: 10px auto;
        width: 100px;
    }
`;

export const StyledField = styled(Field)`
    margin: 10px auto;
`;

export const ErrorP = styled.p`
    position: absolute;
    margin-top: -12px;
    color: red;
    font-size: 12px;
`;

export const CardDiv = styled.div`
    display: flex;
    flex-flow: column;
    border: 2px solid black;
    border-radius: 8px;
    width: 200px;
    height: 400px;
    word-wrap: break-word;
`;

export const CardGridDiv = styled.div`
    margin: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
`;