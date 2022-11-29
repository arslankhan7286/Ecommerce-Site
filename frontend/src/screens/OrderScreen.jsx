import React from 'react'

import { useState, useEffect } from 'react'
import { Row, Col, Button, Image, ListGroup, Card } from 'react-bootstrap'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { Register } from '../actions/userActions'
import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from '../component/FormContainer'

import { savePaymentMethod } from '../actions/cartActions'
import { OrderDetailsAction, OrderDeliverAction } from '../actions/orderActions'
import { CREATE_ORDER_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstant'
import Loader from '../component/Loader'
import Message from '../component/Message'
function OrderScreen() {

    const { id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orderDetails = useSelector(state => state.orderDetails)

    const { order, error, loading } = orderDetails


    const orderDeliver = useSelector(state => state.orderDeliver)

    const { error: errorDeliver, loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin


    if (!loading && !error) {
        const itemPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }





    useEffect(() => {

        if (!userInfo) {
            navigate('/login')
        }


        if (!order || !order.id == Number(id) || successDeliver) {

            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(OrderDetailsAction(id))
        }


    }, [dispatch, order, id, successDeliver])



    const deliverHandler = () => {
        dispatch(OrderDeliverAction(order))
    }


    return (

        (loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) :
            (
                <div>

                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <h1>Shipping</h1>
                                <ListGroup.Item>
                                    <p>

                                        <strong>Shipping</strong> <br />

                                        <p><strong>Name: </strong>{order.user.name}</p>
                                        <p><strong>Email: </strong>{order.user.email}</p>
                                        {order.shippingAddress.address}, {order.shippingAddress.city},

                                        {order.shippingAddress.postalCode},

                                        {order.shippingAddress.country}

                                    </p>

                                    {
                                        order.IsDelivered ? <Message variant='success'> Delivered</Message> :
                                            <Message variant='danger'> Not Delivered yet</Message>
                                    }

                                </ListGroup.Item>

                                <h1>Payement Method</h1>
                                <ListGroup.Item>
                                    <p>

                                        <strong>Payement: </strong>
                                        {order.paymentMethod}


                                    </p>
                                    {
                                        order.IsPaid ? <Message variant='success'> Paid </Message> :
                                            <Message variant='danger'> Not Paid yet </Message>
                                    }

                                </ListGroup.Item>
                                <h1> Order</h1>
                                <ListGroup.Item>
                                    <p>

                                        <strong>Order: </strong>
                                        {
                                            order.cartItems === 0 ? ("Your Cart is Empty") :

                                                (
                                                    <ListGroup variant='flush'>
                                                        {order.orderItems.map((item, index) => (
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

                                        {order.paymentMethod}

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
                                            <Col>{order.itemPrice} </Col>

                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping: </Col>
                                            <Col>${order.shippingPrice} </Col>

                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax Price: </Col>
                                            <Col>${order.taxPrice} </Col>

                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total Price: </Col>
                                            <Col>{order.totalPrice} </Col>

                                        </Row>
                                    </ListGroup.Item>
                                    {loadingDeliver && <Loader />}
                                    {errorDeliver && <Message variant='danger'>{errorDeliver}</Message>}
                                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (

                                        <ListGroup.Item>
                                            <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                                Mark as deliver
                                            </Button>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>

                            </Card>
                        </Col>

                    </Row>

                </div >
            ))

    )
}

export default OrderScreen