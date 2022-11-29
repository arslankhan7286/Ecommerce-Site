import React from 'react'

import { useState, useEffect } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { Register } from '../actions/userActions'
import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from '../component/FormContainer'
import CheckoutSteps from '../component/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress.Address) {
        navigate('/shipping')
    }
    const [Payment, setPayment] = useState("Paypal")
    const submitHandle = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(Payment))

        navigate('/placeorder')

    }


    return (
        <FormContainer><CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandle}>

                <Form.Group>
                    <Form.Label as='legent'>Select Method</Form.Label>

                    <Col>
                        <Form.Check type='radio' id='paypal' name='paymentMethod' label='paypal or creditCard' checked onChange={(e) => setPayment(e.target.value)}>

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>Continue</Button>
            </Form>


        </FormContainer>
    )
}

export default PaymentScreen