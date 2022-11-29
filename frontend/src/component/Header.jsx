import React from 'react'
import { Nav, NavDropdown, Navbar, Container } from 'react-bootstrap'
import { Link, LinkContainer, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

function Header() {
    const nevigate = useNavigate()

    const dispatch = useDispatch()

    const { userInfo } = useSelector(state => state.userLogin)



    const handleLogout = () => {


        dispatch(logout())

        nevigate('/')

    }
    return (
        <header>
            <Navbar bg="dark" variant='dark' collapseOnSelect expand="lg">
                <Container >
                    <Link to='/' style={{ color: 'white', marginRight: '3%' }}>React-Bootstrap</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <SearchBox />
                            <Link to='/cart' style={{ color: 'white', margin: '10px' }}><i className='fas fa-shopping-cart'></i>Cart</Link>

                            {
                                userInfo ? (<NavDropdown title={userInfo.name} >

                                    <NavDropdown.Item >  <Link to='/profile'>Profile </Link></NavDropdown.Item>

                                    <NavDropdown.Item onClick={handleLogout} >Log out</NavDropdown.Item>

                                </NavDropdown>) : (

                                    <Link to="/login" style={{ color: 'white' }}><i className='fas fa-user'></i>Login</Link>
                                )
                            }


                            {userInfo && userInfo.isAdmin && (<NavDropdown title='Admin' >

                                <NavDropdown.Item >  <Link to='/admin/users'>Users </Link></NavDropdown.Item>
                                <NavDropdown.Item >  <Link to='/admin/productlist'>Products </Link></NavDropdown.Item>
                                <NavDropdown.Item >  <Link to='/admin/orderlist'>Orders </Link></NavDropdown.Item>


                            </NavDropdown>)}




                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>)
}

export default Header