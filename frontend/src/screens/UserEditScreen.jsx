import React from 'react'

import { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getUserDetials, updateUser } from '../actions/userActions'
import FormContainer from '../component/FormContainer'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import Loader from '../component/Loader'

function UserEditScreen() {
    const { id } = useParams()
    const navigate = useNavigate()

    const userID = Number(id)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)

    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)

    const { error: errorUpdate, loading: loadingUpdate, sucess: updateSucess } = userUpdate



    useEffect(() => {

        if (updateSucess) {
            dispatch({ type: USER_UPDATE_RESET })

            navigate('/admin/users')
        }
        else {
            if (!user.name || user.id !== userID) {
                dispatch(getUserDetials(id))


            } else {

                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }

        }




    }, [user, userID, navigate, updateSucess])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ id: user.id, name, email, isAdmin }))

    }
    return (

        <div>

            <Link to='/admin/users' variant='light'>
                Go Back
            </Link>
            <FormContainer>
                {
                    loading ? <Loader /> : error ? error : (
                        <>

                            <Form onSubmit={submitHandler}>
                                <h1>Edit User</h1>


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
                                <Form.Group controlId="checkBox">

                                    <Form.Check type='checkbox' label='checkbox' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} >

                                    </Form.Check>

                                </Form.Group>

                                <Button type='submit' variant='primary'>
                                    Update

                                </Button>
                            </Form>
                        </>
                    )
                }



            </FormContainer>

        </div>

    )
}

export default UserEditScreen