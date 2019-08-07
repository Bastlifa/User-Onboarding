import React, {useState, useEffect} from "react"
import axios from "axios"
import { withFormik, Form, Field } from 'formik'
import * as Yup from "yup";

const RegisterForm = ({values, errors, touched, status}) =>
{
    const [users, setUsers] = useState([])
    useEffect(_ =>
    {
        console.log("inf loop?")
        if(status)
        {
            console.log("inf loop 2?")
            setUsers(users => [...users, status])
        }
    }, [status])

    console.log(users)
    return (
        <>
        <Form>
            <div>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field type="name" name="name" placeholder="Name" />
            </div>
            <div>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field type="email" name="email" placeholder="Email" />
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type="password" name="password" placeholder="Password" />
            </div>
            <label>
                <Field type="checkbox" name="tos" checked={values.tos} />
                Accept TOS
            </label>
            <button type="submit">Submit!</button>
        </Form>
        {users.map(user => (
            <>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{String(user.tos)}</p>
            </>
        ))}
        </>
    )
}

const FormikRegisterForm = withFormik({
    mapPropsToValues({name, email, password, tos})
    {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false,
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