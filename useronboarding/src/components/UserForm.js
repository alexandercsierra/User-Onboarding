import React, {useState, useEffect} from 'react'
import {withFormik, Form, Field} from 'formik';
import * as Yup from "yup";
import axios from 'axios';

const UserForm = (props) => {
    const {values, errors, touched, status} = props;
    return (
        <div>
            <Form>
                <label>
                    Username:
                    <Field name="username" type="text" placeholder="username"/>
                </label>
                <label>
                    Email:
                    <Field name="email" type="text" placeholder="email"/>
                </label>
                <label>
                    Password:
                    <Field name="password" type="text" placeholder="password"/>
                </label>
                <label>
                    Agree to the Terms of Service:
                    <Field name="tos" type="checkbox"/>
                </label>
                <button type="submit">Submit</button>
            </Form>
        </div>
    )
}

const FormikUserForm = withFormik({

    mapPropsToValues(props){
        return({
            username: props.username || "",
            email: props.email || "",
            password: props.password || "",
            tos: props.tos || ""
        })
        
    }

})(UserForm);

export default FormikUserForm;