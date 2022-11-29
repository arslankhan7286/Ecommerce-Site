import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { useEffect, useState } from "react";
import Loader from '../component/Loader';
import { listProductDetails, ProductCreateReviewAction } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Container, Col, Button, ListGroup, Image, Card, Form } from 'react-bootstrap';

import Message from '../component/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

import Rating from './Rating'
function ProductScreen() {


    let { id } = useParams()

    const navigate = useNavigate();


    const dispatch = useDispatch()


    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")


    const productdetails = useSelector(state => state.productDetails)



    const { Loading, error, products } = productdetails


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const productReview = useSelector(state => state.productReview)
    const { Loading: loadingReview, error: errorReview, success: successReview } = productReview


    useEffect(() => {
        if (successReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }


        dispatch(listProductDetails(Number(id)))


    }, [dispatch, successReview, id])

    const addToCartHandler = () => {
        navigate(`/cart/${id}/qty=${qty}`);
    }


    const submithandle = (e) => {

        e.preventDefault()
        dispatch(ProductCreateReviewAction(
            id,
            {
                rating,
                comment
            }

        ))
    }

    return (
        <>

            <Link to='/' className='btn btn-primary my-3' > Go Back</Link>

            {
                Loading ? <Loader /> : error ? <><div class="alert alert-danger" role="alert">
                    {error}
                </div> </> : <>
                    <Row>
                        <Col md={6} >
                            <Image src={products.image} alt={products.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{products.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={products.rating} text={`${products.numReviews} reviews `} color={"#f8e825"} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h3>Price: ${products.price}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h3>Description: {products.description}</h3>
                                </ListGroup.Item>
                            </ListGroup>


                        </Col>
                        <Col md={3}>


                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col><p>Price:</p></Col>
                                            <Col><p>${products.price}</p></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col><p>Status:</p></Col>


                                            <Col><p>${products.countInstock > 0 ? "In Stock" : "Not in Stock"}</p></Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {

                                        products.countInstock > 0 && (
                                            <>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col><Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>

                                                            {[...Array(products.countInstock).keys()].map((x) => (


                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                            ))}
                                                        </Form.Control></Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            </>
                                        )
                                    }
                                    <ListGroup.Item>
                                        <Button style={{ width: "100%" }} disabled={products.countInstock <= 0} type="button" className="btn btn-dark" onClick={addToCartHandler}>Add to Cart</Button>
                                    </ListGroup.Item>

                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <h4>Reviews</h4>

                            {
                                products.reviews.length === 0 && <Message variant='info'>No Reviews</Message>
                            }

                            <ListGroup variant='flush'>
                                {products.reviews.map((review) => (

                                    <ListGroup.Item key={review.id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} color='#f8e825'></Rating>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}

                                <ListGroup.Item>
                                    <h4>Write a review</h4>

                                    {loadingReview && <Loader></Loader>}
                                    {errorReview && <Message variant='danger'>{errorReview}</Message>}
                                    {successReview && <Message variant='success'>Review Submitted</Message>}
                                    {
                                        userInfo ? (
                                            <Form onClick={submithandle}>
                                                <Form.Group id='controlId'>
                                                    <Form.Label>
                                                        Rating
                                                    </Form.Label>
                                                    <Form.Control
                                                        as='select'
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}
                                                    >
                                                        <option value=''>Select...</option>
                                                        <option value='1'>1-- Poor</option>
                                                        <option value='2'>2-- Fair</option>
                                                        <option value='3'>3-- Good</option>
                                                        <option value='4'>4-- V-Goode</option>
                                                        <option value='5'>5-- Excellent</option>

                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId='comment'>
                                                    <Form.Label>Review</Form.Label>
                                                    <Form.Control as='textarea' value={comment} onChange={(e) => setComment(e.target.value)}>

                                                    </Form.Control>
                                                </Form.Group>
                                                <Button type='submit' variant='primary' disabled={loadingReview}>
                                                    Submit
                                                </Button>

                                            </Form>
                                        ) : (<Message variant='info'>You need to <Link to='/login'>Login</Link>to write a review</Message>)
                                    }


                                </ListGroup.Item>

                            </ListGroup>
                        </Col>
                    </Row>


                </>

            }


        </>

    )
}

export default ProductScreen