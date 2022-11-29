import React from 'react'

import { useState, useEffect } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import FormContainer from '../component/FormContainer'
import Loader from '../component/Loader'
import Message from '../component/Message'



function LoginScreen() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
        dispatch(login(email, password))
    }
    return (

        <>




            < FormContainer >




                <Form onSubmit={submitHandler}>
                    <h1>Sign In</h1>
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
                    <Button type='submit' variant='primary'>
                        Sign In

                    </Button>
                </Form>



                <Row className='py-3'>
                    <Col>
                        New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                            Register

                        </Link>
                    </Col>
                </Row>
            </FormContainer>
        </ >
    )
}

export default LoginScreen