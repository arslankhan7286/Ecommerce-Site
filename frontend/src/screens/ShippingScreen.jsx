import React from 'react'

import { useState, useEffect } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { Register } from '../actions/userActions'
import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from '../component/FormContainer'
import CheckoutSteps from '../component/CheckoutSteps'

function ShippingScreen() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [Address, setAddress] = useState(shippingAddress.Address)
    const [City, setCity] = useState(shippingAddress.City)
    const [PostalCode, setPostalCode] = useState(shippingAddress.PostalCode)
    const [Country, setCountry] = useState(shippingAddress.Country)



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ Address, City, PostalCode, Country }))

        navigate('/payment')
    }
    return (



        <FormContainer>

            <CheckoutSteps step1 step2 />
            <Form onSubmit={submitHandler}>
                <h1>Shipping</h1>

                <Form.Group controlId="Address">
                    <Form.Label>
                        Address
                    </Form.Label>
                    <Form.Control required type='text' value={Address ? Address : ''} onChange={(e) => setAddress(e.target.value)} placeholder='Address'>

                    </Form.Control>

                </Form.Group>
                <Form.Group controlId="City">
                    <Form.Label>
                        City
                    </Form.Label>
                    <Form.Control required type='name' value={City ? City : ''} onChange={(e) => setCity(e.target.value)} placeholder='City'>

                    </Form.Control>

                </Form.Group>
                <Form.Group controlId="PostalCode">
                    <Form.Label>
                        PostalCode
                    </Form.Label>
                    <Form.Control required type='name' value={PostalCode ? PostalCode : ''} onChange={(e) => setPostalCode(e.target.value)} placeholder='PostalCode'>

                    </Form.Control>

                </Form.Group>
                <Form.Group controlId="Country">
                    <Form.Label>
                        Country
                    </Form.Label>
                    <Form.Control required type='name' value={Country ? Country : ''} onChange={(e) => setCountry(e.target.value)} placeholder='Country'>

                    </Form.Control>

                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>

            </Form></FormContainer>
    )
}

export default ShippingScreen