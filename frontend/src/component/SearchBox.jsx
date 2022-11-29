import React from 'react'

import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

function SearchBox() {




    const [key, setKey] = useState('')

    const history = useNavigate()
    const handleSubtmit = (e) => {

        e.preventDefault()

        if (key) {
            history(`/?keyword=${key}`)
        } else {
            history(history.Location.path)
        }

    }




    return (
        <Form onSubmit={handleSubtmit} className='d-flex'>

            <Form.Control
                type='text'
                onChange={(e) => setKey(e.target.value)}
                className='mr-sm-2 ml-sm-5'

            >

            </Form.Control>
            <Button type='submit'

                variant='outline-success'
            >Submit</Button>


        </Form>
    )
}

export default SearchBox