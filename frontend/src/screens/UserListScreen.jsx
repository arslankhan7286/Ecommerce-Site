import React from 'react'

import { useState, useEffect } from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { ListUser, userDelete } from '../actions/userActions'
import Loader from '../component/Loader'

function UserListScreen() {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector(state => state.userList)

    const { Loading, error, users } = userList
    const { userInfo } = useSelector(state => state.userLogin)

    const { sucess } = useSelector(state => state.userDelete)

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(ListUser())
        }
        else {
            navigate('/login')
        }



    }, [dispatch, navigate, sucess, userInfo])


    const deleteHandle = (id) => {

        if (window.confirm("Are you sure you want to delete this user")) {
            dispatch(userDelete(id))
        }

    }

    return (
        <div>

            <h1>Users</h1>
            {
                Loading ? (<Loader />) : error ? ({ error }) : (
                    <Table striped bordered responsive hover className='table-sm'>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                users.map((data) => (
                                    <tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td>{data.name}</td>
                                        <td>{data.username}</td>
                                        <td>{data.isAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}></i>) :
                                            (<i className='fas fa-check' style={{ color: 'red' }}></i>)}</td>

                                        <td>
                                            <LinkContainer to={`/admin/users/${data.id}/edit`}>
                                                <Button className='btn-sm' variant='light'>
                                                    <i className='fas fa-edit' ></i>
                                                </Button>

                                            </LinkContainer>
                                            <Button className='btn-sm' variant='danger' onClick={() => deleteHandle(data.id)}>
                                                <i className='fas fa-trash' ></i>
                                            </Button>
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