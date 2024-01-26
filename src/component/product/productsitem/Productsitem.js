import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../Product.css"
import { FiShoppingCart, FiHeart, FiSearch } from "react-icons/fi"
import { IoIosHeart } from "react-icons/io";
// import { useDispatch, useSelector } from 'react-redux';
// import { addtocart } from '../../../redux/slice/cartslice';
// import { shuffle, suffledata } from '../../../redux/slice/productslice';
import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css'
import { toast } from 'react-toastify';
function Productsitem({ products }) {
    // const dispatch = useDispatch();
    const navigate = useNavigate()
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
        return arr
    }
    const [activecart, setactivecart] = useState(false)
    const [activefav, setactivefav] = useState(false)
    const account = JSON.parse(localStorage.getItem('account'))
    // console.log(products);
    products = products.slice(0, 20)
    // shuffle(products)
    // const products = useSelector(suffledata)
    // useEffect(() => {
    //     dispatch(shuffle(props.pro))
    // }, [props.pro])
    let product_to_cart;
    if (localStorage.cart != null) {
        product_to_cart = JSON.parse(localStorage.cart)
    }
    else {
        product_to_cart = [];
    }
    let product_to_favourit;


    const addtocart = (a) => {
        if (account) {
            const findid = product_to_cart.findIndex((obj) => obj.id === a)
            products.filter(ele => {
                if (ele.id === a) {
                    if (findid < 0) {  // selected
                        const tempitem = { ...ele, itemquantity: 1 };
                        product_to_cart.push(tempitem)
                        localStorage.setItem('cart', JSON.stringify(product_to_cart))
                        toast.success(`${ele.title} added to cart`, {
                            position: "top-left",
                        });
                        // setactivecart(true)
                    }
                    else {
                        product_to_cart[findid].itemquantity += 1
                        localStorage.setItem('cart', JSON.stringify(product_to_cart))
                        toast.info(`${ele.title} increased by one`, {
                            position: "top-left",
                        });
                    }
                }
            })
        }
        else {
            navigate('/Login')
        }

    }
    if (localStorage.favourit != null) {

        product_to_favourit = JSON.parse(localStorage.favourit)
    }
    else {
        product_to_favourit = [];
    }
    const addtofavoruit = (a) => {
        if (account) {
            const findid = product_to_favourit.findIndex((obj) => obj.id === a)
            products.filter(ele => {
                if (ele.id === a) {
                    if (findid < 0) {  // selected
                        const tempitem = { ...ele, favourit: true };
                        product_to_favourit.push(tempitem)
                        localStorage.setItem('favourit', JSON.stringify(product_to_favourit))
                        toast.success(`${ele.title} added to favourit list`, {
                            position: "top-left",
                        });
                        // setactivefav(true)
                    }
                    else {
                        const objWithIdIndex = product_to_favourit.findIndex((obj) => obj.id === a)
                        product_to_favourit.splice(objWithIdIndex, 1)
                        localStorage.setItem('favourit', JSON.stringify(product_to_favourit))
                        toast.success(`${ele.title} removed from favourit list`, {
                            position: "top-left",
                        });
                        // setactivefav(false)
                    }
                }
            })
        }
        else {
            navigate('/Login')
        }

    }
    return (
        <>
            <section className='products'>
                {
                    products.map((ele, index) => {
                        return (
                            <div className="product-card" key={index}>
                                <img src={ele.ImageUrl[0]} className="card-img" alt="" />
                                <h2 className="card-title">{ele.title}</h2>
                                <p className="card-desc">{ele.description}</p>
                                <p className="card-price">{ele.price} EGB</p>
                                {/* <p className="card-price">{+ele.price * ele.itemquantity} EGB</p> */}
                                <div className="add-to-cart">
                                    <i className={`${activecart && 'active'}`} onClick={() => addtocart(ele.id)}><FiShoppingCart /></i>
                                    <i className={`${activefav && 'active'}`} onClick={() => addtofavoruit(ele.id)}><IoIosHeart color={`${activefav && 'red'}`} size={35} /></i>
                                    <i><FiSearch /></i>

                                </div>
                            </div>
                            //  <div className='addtocart'>
                            //     <button onClick={() => dispatch(addtocart(ele))}><FiShoppingCart /></button>
                            //     <button onClick={() => { console.log(ele.id) }}><FiHeart /></button>
                            //     <button onClick={() => {
                            //         navigate(`/productdetails/${ele.id}`)
                            //         localStorage.setItem("product", JSON.stringify(ele))
                            //     }}><FiSearch /></button>
                            // </div> 

                        )
                    })
                }

            </section>

        </>
    )
}

export default Productsitem