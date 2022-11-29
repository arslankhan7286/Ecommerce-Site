import React from 'react'

import { useState, useEffect } from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { listProducts, deleteAction, CreateAction } from '../actions/productActions.js'
import Loader from '../component/Loader'
import Message from '../component/Message'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants.js'
import Paginator from '../component/Paginator.jsx'

function ProductListScreen() {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productList = useSelector(state => state.productList)

    const { Loading, error, products, pages, page } = productList

    const productDelete = useSelector(state => state.productDelete)

    const { Loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete


    const productCreate = useSelector(state => state.productCreate)

    const { Loading: loadingCreate, error: errorCreate, success: successCReate, product: createdProduct } = productCreate
    const { userInfo } = useSelector(state => state.userLogin)
    const { search } = useLocation()


    useEffect(() => {

        dispatch({ type: PRODUCT_CREATE_RESET })
        if (!userInfo.isAdmin) {
            navigate('/login')
        }

        if (successCReate) {
            navigate(`/admin/product/${createdProduct.id}/edit`)
        } else {
            dispatch(listProducts(search))
        }


    }, [dispatch, navigate, userInfo, successDelete, successCReate, createdProduct, search])


    const deleteHandle = (id) => {

        if (window.confirm("Are you sure you want to delete this Product")) {
            dispatch(deleteAction(id))
        }

    }

    const createProductHandler = (e) => {
        dispatch(CreateAction())
    }

    return (
        <div>

            <Row className='align-items-center'>
                <Col>
                    <h1>My Products</h1>
                </Col>
                <Col className='text-left'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fa fa-plus'> Create  Product</i>
                    </Button>

                </Col>
            </Row>



            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}



            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorDelete}</Message>}
            {
                Loading ? (<Loader />) : error ? ({ error }) : (
                    <>
                        <Table striped bordered responsive hover className='table-sm'>

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>BRAND</th>
                                    <th>CATEGORY</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    products.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.brand}</td>
                                            <td>{product.category}</td>
                                            <td>
                                                <LinkContainer to={`/admin/product/${product.id}/edit`}>
                                                    <Button className='btn-sm' variant='light'>
                                                        <i className='fas fa-edit' ></i>
                                                    </Button>

                                                </LinkContainer>
                                                <Button className='btn-sm' variant='danger' onClick={() => deleteHandle(product.id)}>
                                                    <i className='fas fa-trash' ></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>



                        </Table>
                        <Paginator page={page} pages={pages} isAdmin={true} />
                    </>
                )
            }
        </div>
    )
}

export default ProductListScreen