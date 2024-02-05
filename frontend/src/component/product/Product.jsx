import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addProductToCart } from '../../store/slices/userCart'
import { addProductToWishlist } from '../../store/slices/wishlistCart'
import { Toast } from 'react-bootstrap';

const Product = ({ product }) => {

    const [showToast, setShowToast] = useState({ status: false, error: false, msg: '' });
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.User)
    const navigate = useNavigate()

    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 15 : 20,
        value: product.ratings,
        isHalf: true,
    }

    const addToCart = () => {
        if (isAuthenticated) {
            // Dispatch action to add product to cart
            dispatch(addProductToCart({ productId: product._id })).finally(() => {
                setShowToast({ status: true, msg: 'Product Added to Cart.', error: false });
            });
        } else {
            // Retrieve existing products from localStorage
            const existingProducts = JSON.parse(localStorage.getItem('temporaryCart')) || [];

            // Check if the product already exists in localStorage
            const existingProduct = existingProducts.find((p) => p.productId === product._id);

            if (existingProduct) {
                // Update the quantity or take other actions as needed
                existingProduct.quantity += 1;
            } else {
                // Add the product to localStorage
                existingProducts.push({ productId: product._id, quantity: 1 });
            }

            // Update localStorage
            localStorage.setItem('temporaryCart', JSON.stringify(existingProducts));

            setShowToast({ status: true, msg: 'Product Saved.', error: false });
        }
    };


    const addWishlist = () => {

        if (isAuthenticated) {
            dispatch(addProductToWishlist({ productId: product._id })).finally(() => {
                setShowToast({ status: true, msg: 'Product Added to Wishlist.', error: false });
            })
        } else {
            // Retrieve existing products from localStorage
            const existingProducts = JSON.parse(localStorage.getItem('temporaryWishlist')) || [];

            // Check if the product already exists in localStorage
            const existingProduct = existingProducts.find((p) => p.productId === product._id);

            if (!existingProduct) {
                // Update the quantity or take other actions as needed
                existingProducts.push({ productId: product._id });
            }

            // Update localStorage
            localStorage.setItem('temporaryWishlist', JSON.stringify(existingProducts));

            setShowToast({ status: true, msg: 'Product Saved.', error: false });
        }
    }

    // if (error) {
    //     toast.error(`${error} !`, {
    //         position: toast.POSITION.BOTTOM_CENTER
    //     });
    //     return <ToastContainer />
    // }

    return (<>
        <Toast
            show={showToast.status}
            onClose={() => setShowToast({ status: false, msg: '' })}
            style={{
                position: 'fixed',
                bottom: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 9999, // Higher z-index
            }}
            autohide
            delay={5000} // Auto-hide after 5 seconds
        >
            {showToast.error === false ? (
                <Toast.Header style={{ background: '#28a745', color: '#fff' }}>
                    <strong className="me-auto">Success</strong>
                </Toast.Header>
            ) : (
                <Toast.Header style={{ background: '#dc3545', color: '#fff' }}>
                    <strong className="me-auto">Failure</strong>
                </Toast.Header>
            )}
            <Toast.Body style={{ background: showToast.error === false ? '#d4edda' : '#f8d7da', color: showToast.error === false ? '#155724' : '#721c24' }}>
                {showToast.msg}
            </Toast.Body>
        </Toast>

        <div className="col-md-3">

            <div className="product-card">
                <div className="product-card-img">
                    <label className="stock bg-success">{product.Stock <= 0 ? "Out Of Stock" : "In Stock"}</label>
                    <Link to={`product/${product._id}`}>
                        <img src={product.images[0].url} alt={product.name} />
                    </Link>
                </div>
                <div className="product-card-body">
                    {/* <p className="product-brand">HP</p> */}
                    <h5 className="product-name">
                        <a href="">{product.name} </a>
                    </h5>
                    <div>
                        <ReactStars {...options} />
                    </div>
                    <div>
                        <span className="selling-price">${product.price}</span>
                        <span className="original-price">${product.price + 200}</span>
                    </div>
                    <div className="mt-2">
                        <a href="#" onClick={() => (addToCart())} className="btn btn1">Add To Cart</a>
                        <a href="#" onClick={() => (addWishlist())} className="btn btn1"> <i className="fa fa-heart"></i> </a>
                        <a href={`product/${product._id}`} target="_blank" className="btn btn1"> View </a>
                    </div>
                </div>
            </div>

        </div>
    </>
    )
}

export default Product