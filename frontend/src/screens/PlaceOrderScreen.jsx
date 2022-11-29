import React from 'react'

import { useState, useEffect } from 'react'
import { Row, Col, Button, Image, ListGroup, Card } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { Register } from '../actions/userActions'
import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from '../component/FormContainer'
import CheckoutSteps from '../component/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import { createOrderAction } from '../actions/orderActions'
import { CREATE_ORDER_RESET } from '../constants/orderConstant'
function PlaceOrderScreen() {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orderItems = useSelector(state => state.orderCreate)

    const { order, error, success } = orderItems


    const cart = useSelector(state => state.cart)
    const itemPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)

    const shippingPrice = (itemPrice > 100 ? 0 : (10))
    const taxPrice = Number((0.08) * itemPrice).toFixed(2)
    const totalPrice = (Number(itemPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)


    if (!cart.paymentMethod) {
        navigate('/payment')
    }

    useEffect(() => {

        if (success) {
            navigate(`/order/${order.id}`)

            dispatch({ type: CREATE_ORDER_RESET })

        }
    }, [success, navigate])

    const placeOrder = () => {
        dispatch(createOrderAction({

            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: itemPrice,
            shippingPrice: shippingPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice


        }))

    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <h1>Shipping</h1>
                        <ListGroup.Item>
                            <p>

                                <strong>Shipping</strong> <br />
                                {cart.shippingAddress.Address}, {cart.shippingAddress.City},
                                {" "}
                                {cart.shippingAddress.PostalCode},
                                {" "}
                                {cart.shippingAddress.Country}

                            </p>

                        </ListGroup.Item>

                        <h1>Payement Method</h1>
                        <ListGroup.Item>
                            <p>

                                <strong>Payement: </strong>
                                {cart.paymentMethod}

                            </p>

                        </ListGroup.Item>
                        <h1> Order</h1>
                        <ListGroup.Item>
                            <p>

                                <strong>Order: </strong>
                                {
                                    cart.cartItems === 0 ? ("Your Cart is Empty") :

                                        (
                                            <ListGroup variant='flush'>
                                                {cart.cartItems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                            </Col>
                                                            <Col >
                                                                <Link to={`/product/${item.product}`} >{item.name}</Link>
                                                            </Col>

                                                            <Col md={4}>
                                                                {item.qty} X ${item.price} = {(item.qty * item.price).toFixed(2)}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>

                                                ))}


                                            </ListGroup>
                                        )
                                }

                                {cart.paymentMethod}

                            </p>

                        </ListGroup.Item>



                    </ListGroup>

                </Col>
                <Col md={4}>

                    <Card>
                        <ListGroup>
                            <ListGroup.Item><h1>Order Summary</h1></ListGroup.Item>
                        </ListGroup>
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items: </Col>
                                    <Col>{itemPrice} </Col>

                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>${shippingPrice} </Col>

                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax Price: </Col>
                                    <Col>${taxPrice} </Col>

                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price: </Col>
                                    <Col>{totalPrice} </Col>

                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' onClick={placeOrder}>Place Order</Button>

                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

            </Row>

        </div >
    )
}

export default PlaceOrderScreen