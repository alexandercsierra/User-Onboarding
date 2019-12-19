import React, {useState, useEffect} from 'react'
import {withFormik, Form, Field} from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';



const UserForm = (props) => {
    const {values, errors, touched, status} = props;
    const [user, setUser] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    
    // console.log("values", values);
    console.log("errors", errors);
    // console.log("touched", touched);


    useEffect(()=>{
        console.log("Status has changed", status);
        
        status && setUser([...user, status]);
    }, [status])



    return (
        <div className="formContainer">
            <Form className="theForm">

                <label className="theLabel" htmlFor="username">
                    Username:</label>
                    <Field className="theInput" name="username" type="text" placeholder="username"/>
                    {touched.username && errors.username && (<p>{errors.username}</p>)}
                
                <label className="theLabel" htmlFor="email">
                    Email:</label>
                    <Field className="theInput" name="email" type="text" placeholder="email"/>
                    {touched.email && errors.email && (<p>{errors.email}</p>)}
                
                <label className="theLabel" htmlFor="password">
                    Password:</label>
                    <Field className="theInput" name="password" type="text" placeholder="password"/>
                    {touched.password && errors.password && (<p>{errors.password}</p>)}

                <label className="theLabel" htmlFor="role">
                    Role:</label>
                    <Field className="theInput" name="role" as="select" placeholder="role">
                        <option disabled>Choose your Role</option>
                        <option value="front">Front End Developer</option>
                        <option value="react1">React I Developer</option>
                        <option value="react2">React II Developer</option>
                        <option value="back">Back End Developer</option>
                    </Field>
                    {touched.role && errors.role && (<p>{errors.role}</p>)}

                    
                
                <label className="theLabel" htmlFor="tos">
                    Agree to the Terms of Service:</label>
                    <Field className="check" name="tos" type="checkbox" checked={values.tos}/>
                    {touched.tos && errors.tos && (<p>{errors.tos}</p>)}
                
                <button type="submit">Submit</button>
            </Form>
            <div>
                {user.map(user=>{
                    return(
                        <div>
                            <p>Username: {user.username}</p>
                            <p>Email: {user.email}</p>
                            <p>Password: {user.password}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const FormikUserForm = withFormik({

    mapPropsToValues(props){
        return({
            username: props.username || "",
            email: props.email || "",
            password: props.password || "",
            role: props.role || "",
            tos: props.tos || false
        })
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().min(5).required(),
        // role: Yup.oneOf(['front', 'react1', 'react2', 'back']),
        tos: Yup.boolean().oneOf([true], "you must agree")

    }

    ),
    handleSubmit(values, {setStatus, resetForm}){
        axios.post("https://reqres.in/api/users/", values)
            .then(res => {
                setStatus(res.data);
                // console.log(res.data);
                resetForm();
            })
            .catch(err => console.log(err.response))
    }

})(UserForm);

export default FormikUserForm;