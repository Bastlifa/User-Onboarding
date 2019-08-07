import React, {useEffect} from "react"
import axios from "axios"
import { withFormik } from 'formik'
import * as Yup from "yup";
import { StyledForm, StyledField, ErrorP } from '../StyledComps'
import { of } from "rxjs";


const RegisterForm = ({values, errors, touched, status, setUsers}) =>
{
    useEffect(_ =>
    {
        console.log("inf loop?")
        if(status)
        {
            console.log("inf loop 2?")
            setUsers(users => [...users, status])
        }
    }, [status, setUsers])

    return (
        <StyledForm>
            <div>
                <StyledField type="name" name="name" placeholder="Name" />
                {touched.name && errors.name && <ErrorP>{errors.name}</ErrorP>}
            </div>
            <div>
                <StyledField type="email" name="email" placeholder="Email" />
                {touched.email && errors.email && <ErrorP>{errors.email}</ErrorP>}
            </div>
            <div>
                <StyledField type="password" name="password" placeholder="Password" />
                {touched.password && errors.password && <ErrorP>{errors.password}</ErrorP>}
            </div>
            <div>
                <StyledField component="select" name="role" >
                    <option>Please Choose an Option</option>
                    <option value="team-lead">Team Lead</option>
                    <option value="team-member">Team Member</option>
                    <option value="team-distracter">Team Distracter</option>
                </StyledField>
                {touched.role && errors.role && <ErrorP>{errors.role}</ErrorP>}
            </div>
            <label>
                <StyledField type="checkbox" name="tos" checked={values.tos} />
                Accept TOS
                {errors.tos && touched.tos && <ErrorP>{errors.tos}</ErrorP>}
            </label>
            <button type="submit">Submit!</button>
        </StyledForm>
    )
}

const FormikRegisterForm = withFormik({
    mapPropsToValues({name, email, password, tos, role})
    {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false,
            role: role || ""
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(1,"Name not supplied")
            .required("Name is required"),
        email: Yup.string()
            .email("Email not supplied")
            .required("Email is required"),
        password: Yup.string()
            .min(6,"Password must be longer than 6 characters")
            .required("Password is required"),
        tos: Yup.boolean()
            .oneOf([true], "Must agree to Terms of Service to continue"),
        role: Yup.string()
            .oneOf(["team-lead", "team-member", "team-distracter"], "Please select a role")
            .required("Please select a role")
    }),

    handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
        if (values.email === "alreadytaken@atb.dev") {
            setErrors({ email: "That email is already taken" });
        } else {
            axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
                console.log("post response: ",res); 
                setStatus(res.data)
                resetForm();
                setSubmitting(false);
            })
            .catch(err => {
                console.log(err); 
                setSubmitting(false);
            });
        }
    }
})(RegisterForm)



export default FormikRegisterForm