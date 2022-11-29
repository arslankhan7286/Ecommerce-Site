import React from 'react'

import { useState, useEffect } from 'react'
import { Row, Col, Button, Form, Table } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetials, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { myorderListAction } from '../actions/orderActions'
import Loader from '../component/Loader'
import Message from '../component/Message'

function ProfileScreen() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails





    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    const userUpdate = useSelector(state => state.userUpdateProfile)
    const { sucess } = userUpdate

    const orderList = useSelector(state => state.myLisOrders)
    const { error: errorOrderList, loading: loadingOrder, orders } = orderList



    const qty = useNavigate();
    // const redirect = qty.pathname ? qty.pathname.split("=")[1] : '/'


    useEffect(() => {
        if (!userInfo) {
            qty('/login')
        }
        else {

            if (!user || !user.name || sucess || userInfo.id !== user.id) {

                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetials('profile'))
                dispatch(myorderListAction())
            }
            else {
                setName(user.name)
                setEmail(user.email)

            }
        }
    }, [qty, userInfo, dispatch, sucess, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage("Password does not matach")
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password,
            }))
        }

    }
    return (
        <Row>
            <Col md={3}>
                <h1>  My Profile</h1>


                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}
                <Form onSubmit={submitHandler}>


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
                        Update

                    </Button>
                </Form>
            </Col>


            <Col md={9}>
                <h1>My Orders</h1>

                {loadingOrder ? (<Loader />) : errorOrderList ? (<Message variant='danger'>{error}</Message>) :
                    (
                        <Table striped responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>Total</th>
                                    <th>IsPaid</th>
                                    <th>IsDelivered</th>
                                    <th></th>
                                </tr>
                            </thead>


                            {
                                orders.map((order) => (

                                    <tbody>
                                        <tr key={order.id}>
                                            <td>{order.id}</td>createdAt
                                            <td>{order.isDelivered}</td>
                                            <td>{order.totalPrice}</td>
                                            <td>{order.isPaid ? ("Paid") :
                                                (<i className='fas fa-times' style={{ color: 'red' }}></i>)}</td>

                                            <td>
                                                <LinkContainer to={`/order/${order.id}`}>
                                                    <Button className='btn-sm'>DETAILS</Button>
                                                </LinkContainer>


                                            </td>
                                        </tr>
                                    </tbody>
                                ))
                            }

                        </Table>
                    )

                }
            </Col>



        </Row>
    )
}

export default ProfileScreen