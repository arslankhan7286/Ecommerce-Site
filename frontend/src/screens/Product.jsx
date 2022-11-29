import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
function Product({ product }) {




    return (
        <Card className='my-3 rounded p-3'>
            <Link to={`/product/${product.id}`} >
                <Card.Img src={product.image} />
            </Link>

            <Card.Body>
                <Link to={`/product/${product.id}`} >
                    <div >
                        <strong>{product.name}</strong>
                    </div>

                </Link>
                <div div>
                    <div className='my-3'>



                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#F8e825'} />
                    </div>
                </div>


                <h3>${product.price}</h3>
            </Card.Body>
        </Card >
    )
}

export default Product