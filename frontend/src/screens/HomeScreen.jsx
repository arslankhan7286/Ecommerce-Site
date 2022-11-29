import React from 'react'

import { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions';
import { useLocation } from "react-router-dom";
import Loader from '../component/Loader';
import Message from '../component/Message';
import Paginator from '../component/Paginator';

function HomeScreen() {


    const { search } = useLocation()
    console.log(search, "keyword");


    const dispatch = useDispatch()

    const productLt = useSelector(state => state.productList)

    const { products, Loading, error, page, pages } = productLt


    useEffect(() => {

        dispatch(listProducts(search))


    }, [dispatch, search])



    return (

        <>
            {Loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :

                <>
                    < Row >
                        {

                            products.map((product) => (
                                <Col key={product.id} sm={12} md={6} lg={4} xl={3}>

                                    <Product product={product} />
                                </Col>
                            ))
                        }
                    </Row >
                    <Paginator page={page} pages={pages} keyword={search} />
                </>
            }
        </>

    )
}

export default HomeScreen