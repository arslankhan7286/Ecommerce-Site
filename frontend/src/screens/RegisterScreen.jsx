import React from 'react'

import { useState, useEffect } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { Register } from '../actions/userActions'
import FormContainer from '../component/FormContainer'

function RegisterScreen() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()
    const userlogininfo = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userlogininfo
    const qty = useNavigate();
    const redirect = qty.pathname ? qty.pathname.split("=")[1] : '/'
    useEffect(() => {
        if (userInfo) {
            qty('/')
        }
    }, [qty, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage("Password does not matach")
        } else {
            dispatch(Register(name, email, password))
        }

    }
    return (
        <FormContainer> <Form onSubmit={submitHandler}>
            <h1>Register</h1>

            {message}
            <Form.Group controlId="name">
                <Form.Label>
                    Username
                </Form.Label>
                <Form.Control type='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='User Name'>

                </Form.Control>

            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>
                    Email Address
                </Form.Label>
                <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email address'>

                </Form.Control>

            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>
                    password
                </Form.Label>
                <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password'>

                </Form.Control>

            </Form.Group>
            <Form.Group controlId="Confirmpassword">
                <Form.Label>
                    Confirm password
                </Form.Label>
                <Form.Control type='password' value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} placeholder='Confirm Password'>

                </Form.Control>

            </Form.Group>
            <Button type='submit' variant='primary'>
                Register

            </Button>
        </Form>
            <Row className='py-3'>
                <Col>
                    Sign In? <Link to={redirect ? `/login${redirect}` : '/login'}>
                        Sign Up

                    </Link>
                </Col>
            </Row></FormContainer>
    )
}

export default RegisterScreen