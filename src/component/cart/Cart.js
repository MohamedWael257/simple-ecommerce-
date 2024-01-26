import React, { Fragment, useEffect, useState } from 'react'
import "./Cart.css"
import { Link, useNavigate } from 'react-router-dom'
import data from '../../db/products.json'
import { FaCheck } from 'react-icons/fa'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify'
import { Button } from 'react-bootstrap'
import { IoIosHeart } from 'react-icons/io'
const Cart = () => {
    const [cart, setCart] = useState([])
    const [favourit, setFavourit] = useState([])
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    let get = localStorage.getItem('cart')
    let get_cart = JSON.parse(get)
    let get_favourit = JSON.parse(localStorage.getItem('favourit'))
    let sum = 0;
    useEffect(() => {
        // if (data) {
        setProducts(data.products)
        // }
        // axios.get("./data.json")
        //     .then(res => {
        //         setProducts(res.data.products)
        //     })
        //     .catch(err => console.log(err))
    }, [data])
    useEffect(() => {
        if (get_cart && get_cart.length > 0) {
            setCart(get_cart)
        }
        else {
            setCart([])
        }
    }, [cart])
    useEffect(() => {
        if (get_favourit && get_favourit.length > 0) {
            setFavourit(get_favourit)
        }
        else {
            setFavourit([])
        }
    }, [favourit])
    if (cart && cart.length > 0) {
        cart.map(ele => {
            sum += (+ele.price * ele.itemquantity)
            //     sum += +(+ele.price * +ele.itemquantity)
        })
    }
    else {
        sum = 0
    }
    const addtocart = (a) => {
        const findid = get_cart.findIndex((obj) => obj.id === a)
        products.filter(ele => {
            if (ele.id === a) {
                if (findid < 0) {  // selected
                    const tempitem = { ...ele, itemquantity: 1 };
                    get_cart.push(tempitem)
                    setCart(get_cart)
                    localStorage.setItem('cart', JSON.stringify(get_cart))
                    toast.success(`${ele.title} added to cart`, {
                        position: "top-left",
                    });
                }
                else {
                    get_cart[findid].itemquantity += 1
                    setCart(get_cart)
                    localStorage.setItem('cart', JSON.stringify(get_cart))
                    toast.info(`${ele.title} increased by one`, {
                        position: "top-left",
                    });
                }
            }
        })
        // alert(cart.length)
        console.log(cart.length);
    }
    const deletefromcart = (a) => {
        const objWithIdIndex = get_cart.findIndex((obj) => obj.id === a)
        get_cart.splice(objWithIdIndex, 1)
        setCart(get_cart)
        localStorage.setItem('cart', JSON.stringify(get_cart))
        toast.success(` removed from cart`, {
            position: "top-left",
        });
    }
    const decrease = (a) => {
        const itemindex = get_cart.findIndex((item) => item.id === a);
        const theitemquantity = get_cart[itemindex].itemquantity;
        if (theitemquantity === 1) {
            const removeitem = get_cart.filter((item) => item.id !== a);
            get_cart = removeitem;
            setCart(get_cart)
            localStorage.setItem('cart', JSON.stringify(get_cart))
            toast.success(` removed from cart`, {
                position: "top-left",
            });
        } else if (theitemquantity > 1) {
            get_cart[itemindex].itemquantity -= 1;
            setCart(get_cart)
            localStorage.setItem('cart', JSON.stringify(get_cart))
            toast.info(` decreased by one`, {
                position: "top-left",
            })
        }
    }
    const deletefromfavoruit = (ele) => {
        const objWithIdIndex = get_favourit.findIndex((obj) => obj.id === ele.id)
        get_favourit.splice(objWithIdIndex, 1)
        localStorage.setItem('favourit', JSON.stringify(get_favourit))
        toast.success(`${ele.title} removed from favourit list`, {
            position: "top-left",
        });
        // setactivefav(false)


    }
    return (
        <>
            <section className="shopping">
                {(cart && cart.length > 0) ?
                    <>
                        <div className="shopping-cart ">
                            <div className="head">
                                <span>shopping Cart</span>
                                <span>price</span>
                            </div>
                            <hr />
                            {cart.map((ele, index) => {
                                return (
                                    <Fragment key={index}>
                                        <div className="cart">
                                            <div className="img w-25 me-4">
                                                <img src={ele.ImageUrl[0]} className="w-100 h-50" alt="" />
                                            </div>
                                            <div className="card-details">
                                                <div className="title">
                                                    <p>{ele.description}</p>
                                                    <strong className="">EGB {ele.price * ele.itemquantity}</strong>
                                                </div>
                                                <p>{ele.title}</p>
                                                <p>Eligible for FREE delivery</p>
                                                <strong className="d-block">Size: 350 ml</strong>
                                                <button className="increment" style={{ transform: "translate(-10px,6px)" }} onClick={() => addtocart(ele.id)}>+</button>
                                                <span style={{ border: "2px solid black", padding: "5px 20px" }} className='count'>{ele.itemquantity}</span>
                                                <button className="decrement" style={{ transform: "translate(10px, 6px)" }} onClick={() => decrease(ele.id)}>-</button>
                                                <button className="text-primary border-0 bg-white" style={{ fontSize: "1.3rem", fontWeight: "500", marginLeft: "40px", display: "inline-block" }} onClick={() => deletefromcart(ele.id)}> delete</button>

                                            </div>
                                        </div>
                                        <hr />
                                        <br />
                                        <br />
                                    </Fragment>
                                )
                            })}
                            <button className='clear d-inline' onClick={() => {
                                localStorage.removeItem('cart'); toast.info(`Cart cleared`, {
                                    position: "top-left",
                                });
                            }}>Clear Cart</button>
                            <div className="price text-end">
                                <span>Sub({cart.length} items):</span>
                                <span> EGB {sum}</span>
                            </div>
                            <hr />
                            <br />
                            <br />
                        </div>
                        <div className="buy" >
                            <div className="detail ">
                                {/* <i><FaCheck /></i> */}
                                <div>
                                    <p>Your first order qualifies for FREE Delivery.
                                        Select this option at checkout.<a href="">Details</a></p>
                                    <div>
                                        <div className="price text-center mb-3">
                                            <span>Sub({cart.length} items):</span>
                                            <span> EGB {sum}</span>
                                        </div>
                                        <button className='checkoutprocess' onClick={() => { localStorage.removeItem('cart'); navigate('/') }}>Process to buy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    : <>
                        <div className="nocart bg-dark p-5 text-center ng-star-inserted">
                            {/* <h1><PiHeartBreakFill className='text-warning' size={80} /></h1> */}
                            <h5 className="text-white">Shopping cart is empty !</h5>
                            <p className="text-white">push some products into your cart</p>
                            {/* <Button href="/home" id='home' >Back To Home</Button> */}
                            <Button to="/" id='home' >Back To Home</Button>

                        </div>
                    </>
                }
            </section>
            {(favourit && favourit.length > 0) &&
                <section className='favourit'>
                    <h2>Favourit Products</h2>
                    <div className='favourit-cards'>
                        {favourit.map((ele, index) => {
                            return (
                                <div key={index} className='favourit-card'>
                                    <img src={ele.ImageUrl[0]} />
                                    <p>Product : {ele.title}</p>
                                    <p>Category : {ele.category}</p>
                                    <IoIosHeart onClick={() => deletefromfavoruit(ele)} color='red' size={35} />

                                </div>
                            )
                        })}
                    </div>
                </section>
            }
        </>
    )
}

export default Cart