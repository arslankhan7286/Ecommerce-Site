import React from 'react'

import { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, UpdateProductAction } from '../actions/productActions'
import FormContainer from '../component/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import Loader from '../component/Loader'
import Message from '../component/Message'

function ProductEditScreen() {
    const { id } = useParams()
    const navigate = useNavigate()

    const productId = Number(id)
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [brand, setBrand] = useState("")
    const [image, setImage] = useState("")
    const [category, setCategory] = useState("")
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState("")
    const [fileLoading, setFileLoading] = useState(false)




    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)

    const { error, loading, products } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)

    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate





    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })

            navigate('/admin/productlist')
        } else {
            if (!products.name || products.id !== productId) {
                dispatch(listProductDetails(id))


            } else {

                setName(products.name)
                setPrice(products.price)
                setBrand(products.brand)

                setImage(products.image)
                setCategory(products.category)
                setCountInStock(products.countInStock)
                setDescription(products.description)

            }

        }








    }, [dispatch, products, productId, navigate, successUpdate])

    const submitHandler = (e) => {

        e.preventDefault()

        dispatch(UpdateProductAction({
            id: id,

            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock,

        }))


    }


    const uploadFileHandler = async (e) => {


        const file = e.target.files[0]



        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setFileLoading(true)

        try {

            const config = {
                header: {
                    'content-type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('http://127.0.0.1:8000/api/products/upload/', formData, config)
            setImage(data)
            setFileLoading(false)

        } catch (error) {


            setFileLoading(false)
        }
    }
    return (

        <div>

            <Link to='/admin/users' variant='light'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {successUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {
                    loading ? <Loader /> : error ? error : (
                        <>

                            <Form onSubmit={submitHandler}>



                                <Form.Group controlId="name">
                                    <Form.Label>
                                        Name
                                    </Form.Label>
                                    <Form.Control type='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='User Name'>

                                    </Form.Control>

                                </Form.Group>


                                <Form.Group controlId="price">
                                    <Form.Label>
                                        Price
                                    </Form.Label>
                                    <Form.Control type='number' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price'>

                                    </Form.Control>

                                </Form.Group>



                                <Form.Group controlId="Image">
                                    <Form.Label>
                                        Image
                                    </Form.Label>
                                    <Form.Control type='text' value={image} onChange={(e) => setImage(e.target.value)} placeholder='Image'>

                                    </Form.Control>


                                    <Form.Control type="file" onChange={uploadFileHandler} size="sm" />



                                </Form.Group>
                                {fileLoading && <Loader />}









                                <Form.Group controlId="category">
                                    <Form.Label>
                                        Category
                                    </Form.Label>
                                    <Form.Control type='text' value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Catefory'>

                                    </Form.Control>

                                </Form.Group>


                                <Form.Group controlId="brand">
                                    <Form.Label>
                                        Brand
                                    </Form.Label>
                                    <Form.Control type='text' value={brand} onChange={(e) => setBrand(e.target.value)} placeholder='Brand'>

                                    </Form.Control>

                                </Form.Group>

                                <Form.Group controlId="CountInStock">
                                    <Form.Label>
                                        Stock
                                    </Form.Label>
                                    <Form.Control type='number' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} placeholder='Stock'>

                                    </Form.Control>

                                </Form.Group>


                                <Form.Group controlId="description">
                                    <Form.Label>
                                        Description
                                    </Form.Label>
                                    <Form.Control type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Stock'>

                                    </Form.Control>

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

export default ProductEditScreen