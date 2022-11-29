import React from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Card, Row, Col, ListGroup, Form, Image } from 'react-bootstrap'
import { addToCart, removeItemCart } from '../actions/cartActions'
import { useEffect } from 'react'
import Message from '../component/Message'
function CartScreen() {

    let { id } = useParams()
    const redirect = useNavigate()
    const qty = useLocation();
    const quantity = qty.pathname ? Number(qty.pathname.split("=")[1]) : 1
    const dispatch = useDispatch()

    const { cartItems } = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.userLogin)




    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, quantity))
        }

    }, [dispatch, id, quantity])


    const reMoveItem = (id) => {

        dispatch(removeItemCart(id))

    }

    const checkOutHandler = () => {
        if (userInfo) {
            redirect('/shipping')
        }
        else {
            redirect('/login')
        }

    }

    return (

        <>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    <ListGroup variant='flush'>

                        {
                            cartItems.length <= 0 ? (<Message variant='danger'>Your cart is Empty</Message>) :
                                (cartItems.map((x) => (
                                    <ListGroup.Item key={x.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={x.image} alt={x.name} fluid rounded />
                                            </Col>
                                            <Col md={2} >
                                                <Link to={`/product/${x.product}`}>{x.name}</Link>
                                            </Col>
                                            <Col md={2}>
                                                ${x.price}
                                            </Col>



                                            <Col md={3}>
                                                <Form.Control as='select' value={x.qty} onChange={(e) => dispatch(addToCart(x.product, Number(e.target.value)))}>

                                                    {[...Array(x.countInstock).keys()].map((x) => (


                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    ))}
                                                </Form.Control>
                                            </Col>



                                            <Col md={1}>
                                                <Button type='button' onClick={() => reMoveItem(x.product)} ><i className='fas fa-trash' ></i></Button>
                                            </Col>
                                        </Row>

                                    </ListGroup.Item>


                                )))
                        }

                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h3>
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed()}
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Button type='button' className='btn-block' onClick={checkOutHandler} style={{ width: '100%' }}>
                                    Proceed To CheckOut

                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

            </Row>


        </>
    )
}

export default CartScreen