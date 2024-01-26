import React, { useEffect, useState } from 'react'
import "../Product.css"
import axios from 'axios'
import Productsitem from '../productsitem/Productsitem'
// import { MdPhotoCameraBack } from 'react-icons/md'
// import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage'
import data from '../../../db/products.json'
function Productsfilter() {
    const [inputsearch, setInputsearch] = useState("")
    const [type, setType] = useState("All")
    const [products, setProducts] = useState([])
    const [afterfilter, setAfterfilter] = useState([])
    const currentproduct = afterfilter.length === 0 ? products : afterfilter;
    useEffect(() => {
        if (data) {
            setProducts(data.products)
        }
    }, [data])


    const category = [
        "All",
        ...new Set(products.map((product) => product.category)),
    ];
    const filterbycategory = (categorey) => {
        let arr = []
        if (categorey !== 'All') {
            products.map((ele) => {
                if (ele.category === categorey) {
                    arr.push(ele)
                    setAfterfilter(arr)
                }
            })
        }
        else {
            setAfterfilter(products)
        }
    }
    const search = (searchvl) => {
        setInputsearch(searchvl)
        let temp = []
        products.filter((product) => {
            if (product.description.toLowerCase().includes(inputsearch.toLowerCase())) {
                temp.push(product)
                setAfterfilter(temp)
            }
        })
    }
    // useEffect(() => {
    //     dispatch(filterBySearch({ product: products, search: inputsearch }))
    // }, [dispatch, inputsearch, products])
    // const filterbycategory = (e) => {
    //     const cat = e.target.value
    //     dispatch(filterByCategory({ products, category: cat }));
    // }

    return (
        <>
            <div className="filter">
                <h6>{type} Products</h6>
                <div className="select">
                    <label style={{ color: 'white' }}>Categories</label>
                    <input type='text' className='searchinput' value={inputsearch} placeholder='search' onChange={(e) => search(e.target.value)} />
                    <select aria-label="Default select example" className='form-select' onChange={(e) => {
                        setType(e.target.value);
                        filterbycategory(e.target.value);
                    }}>
                        {category.map((cat, index) => {
                            return (
                                <option key={index} value={cat}>{cat}</option>
                            )
                        })}
                    </select>
                </div>

            </div>
            <section className="aproducts">
                <Productsitem products={currentproduct} />
            </section>

        </>
    )
}

export default Productsfilter