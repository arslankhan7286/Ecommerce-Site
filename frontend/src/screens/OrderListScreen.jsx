import React from 'react'

import { useState, useEffect } from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { orderListAction } from '../actions/orderActions'
import Loader from '../component/Loader'

function UserListScreen() {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const ListOrder = useSelector(state => state.listOrder)

    const { loading, error, orders } = ListOrder


    const { userInfo } = useSelector(state => state.userLogin)


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(orderListAction())
        }
        else {
            navigate('/login')
        }



    }, [dispatch, navigate, userInfo])



    return (
        <div>

            <h1>Orders</h1>
            {
                loading ? (<Loader />) : error ? ({ error }) : (
                    <Table striped bordered responsive hover className='table-sm'>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>

                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.user && order.user.username}</td>
                                        <td>{order.createdAt}</td>


                                        <td>${order.totalPrice}</td>
                                        <td>{order.isPaid ? (order.paidAt) :
                                            (<i className='fas fa-check' style={{ color: 'red' }}></i>)}</td>


                                        <td>{order.isDelivered ? (order.deliveredAt) :
                                            (<i className='fas fa-check' style={{ color: 'red' }}></i>)}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order.id}`}>
                                                <Button className='btn-sm' variant='light'>
                                                    <p>Details</p>
                                                </Button>

                                            </LinkContainer>

                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>



                    </Table>
                )
            }
        </div>
    )
}

export default UserListScreen