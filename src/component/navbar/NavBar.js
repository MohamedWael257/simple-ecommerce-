import React, { useContext, useEffect, useState } from 'react'
import './NavBar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaLocationDot, FaAmazonPay, FaMagnifyingGlass } from "react-icons/fa6"
import { FaShoppingCart } from 'react-icons/fa'
import { FiMenu, FiShoppingCart, FiDelete } from "react-icons/fi"
// import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { AuthContext } from '../../context/AuthContext'
import data from '../../db/products.json'
const Navbar = () => {
    const navigate = useNavigate()
    const [sidenav, setSidenav] = useState(false)
    const [sidecart, setSidecart] = useState(false)
    const [cart, setCart] = useState([])
    const [products, setProducts] = useState([])
    const activelink = ({ isActive }) => (isActive && `active`)
    // const currentUser = useSelector(authuser);
    // const { currentUser } = useContext(AuthContext)
    const account = JSON.parse(localStorage.getItem('account'))
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            setCart(cart);
        }
        else {
            setCart([])
            setSidecart(false)
        }
    }, [cart]);
    useEffect(() => {
        if (data) {
            setProducts(data.products)
        }
    }, [data])
    // console.log('cart', cart);
    const showsidenav = () => {
        setSidenav(!sidenav);
    }
    const deletefromcart = (a) => {
        const objWithIdIndex = cart.findIndex((obj) => obj.id === a)
        cart.splice(objWithIdIndex, 1)
        console.log(cart);
        localStorage.setItem('cart', JSON.stringify(cart))

    }
    const logout = () => {
        localStorage.removeItem('account')
    }
    const addtocart = (a) => {
        const findid = cart.findIndex((obj) => obj.id === a)
        products.filter(ele => {
            if (ele.id === a) {
                if (findid < 0) {  // selected
                    const tempitem = { ...ele, itemquantity: 1 };
                    cart.push(tempitem)
                    setCart(cart)
                    localStorage.setItem('cart', JSON.stringify(cart))
                    toast.success(`${ele.title} added to cart`, {
                        position: "top-left",
                    });
                }
                else {
                    cart[findid].itemquantity += 1
                    setCart(cart)
                    localStorage.setItem('cart', JSON.stringify(cart))
                    toast.info(`${ele.title} increased by one`, {
                        position: "top-left",
                    });
                }
            }
        })
        // alert(cart.length)
        console.log(cart.length);
    }
    const decrease = (a) => {
        const itemindex = cart.findIndex((item) => item.id === a);
        const theitemquantity = cart[itemindex].itemquantity;
        if (theitemquantity === 1) {
            const removeitem = cart.filter((item) => item.id !== a);
            cart = removeitem;
            setCart(cart)
            localStorage.setItem('cart', JSON.stringify(cart))
            toast.success(` removed from cart`, {
                position: "top-left",
            });
        } else if (theitemquantity > 1) {
            cart[itemindex].itemquantity -= 1;
            setCart(cart)
            localStorage.setItem('cart', JSON.stringify(cart))
            toast.info(` decreased by one`, {
                position: "top-left",
            })
        }
    }
    return (
        <>
            <ToastContainer />
            <header>
                <div className="logo">
                    <Link to='/' className="logo">eShop.</Link>
                </div>
                <button className="btn-h" onClick={showsidenav}>=</button>
                <div className={`${sidenav ? "nav-menu active" : "nav-menu "}`}>
                    <nav>
                        {
                            account &&
                            <>
                                <NavLink className={activelink} to="/">{account.username}</NavLink>
                                {/* <NavLink className={activelink} to="/">home</NavLink> */}
                                <NavLink className={activelink} to='/cart'>
                                    cart
                                    <FaShoppingCart onClick={() => setSidecart(!sidecart)} className="cursor-pointer" size={25} />
                                    <p style={{ display: 'inline-block' }}>{cart.length}</p>
                                </NavLink>
                                {/* <div className='cart'>
                                    <FaShoppingCart onClick={() => setSidecart(!sidecart)} className="cursor-pointer" size={25} />
                                </div> */}
                                {
                                    cart && cart.length > 0 &&
                                    < div className={`${sidecart ? "sidecart active" : "sidecart"}`} onMouseLeave={() => setSidecart(false)}>
                                        {/* <button onClick={() => setSidecart(false)}>X</button> */}
                                        {
                                            cart.map((ele, index) => {
                                                return (
                                                    <div key={index}>
                                                        <p>{ele.title}</p>
                                                        <button onClick={() => addtocart(ele.id)}>+</button>
                                                        <p >{ele.itemquantity}</p>
                                                        <button onClick={() => decrease(ele.id)}>-</button>
                                                        {/* <p>{ele.price} EGB</p> */}
                                                        {/* <img src={ele.ImageUrl} /> */}
                                                        {/* <button onClick={() => dispatch(removefromcart(ele))}>X</button > */}
                                                    </div>
                                                )
                                            })
                                        }
                                        <Link to='/cart' onClick={() => setSidecart(false)}>View All Cart</Link>
                                    </div>
                                }
                            </>

                        }
                    </nav>
                    <div className="account">
                        {
                            account ?
                                <>
                                    <button className="signout" onClick={logout}>Logout</button>
                                </>
                                : <>
                                    <Link to="/Register">Register</Link>
                                    <Link to="/Login">Login</Link>
                                </>
                        }

                    </div>
                </div>
            </header>


        </>
    )
}

export default Navbar