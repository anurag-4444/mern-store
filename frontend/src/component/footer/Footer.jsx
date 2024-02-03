import React from 'react'
import { categoryChangeState } from '../../store/slices/products'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (<>

        <div className="footer-area">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h4 className="footer-heading" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>ECommerce</h4>
                        <div className="footer-underline"></div>
                        <p>
                            Shop Smart, Shop Online.
                        </p>
                    </div>

                    <div className="col-md-3">
                        <h4 className="footer-heading">Shop Now</h4>
                        <div className="footer-underline"></div>
                        <div className="mb-2" onClick={() => (dispatch(categoryChangeState({ category: 'Smartphones' })))}><a href="#" className="text-white">Collections</a></div>
                        <div className="mb-2" onClick={() => (dispatch(categoryChangeState({ category: 'Laptop' })))}><a href="#" className="text-white">Trending Products</a></div>
                        <div className="mb-2" onClick={() => (dispatch(categoryChangeState({ category: 'Camera' })))}><a href="#" className="text-white">New Arrivals Products</a></div>
                        <div className="mb-2" onClick={() => (dispatch(categoryChangeState({ category: 'Footwear' })))}><a href="#" className="text-white">Featured Products</a></div>
                    </div>
                    <div className="col-md-3">
                        <h4 className="footer-heading">Reach Us</h4>
                        <div className="footer-underline"></div>
                        <div className="mb-2">
                            <p>
                                <i className="fa fa-map-marker"></i> #444, some main road, some area, some street, bangalore, india - 560077
                            </p>
                        </div>
                        <div className="mb-2">
                            <a href="" className="text-white">
                                <i className="fa fa-phone"></i> +91 888-XXX-XXXX
                            </a>
                        </div>
                        <div className="mb-2">
                            <a href="mailto:anuragchauhan7042666582@gmail.com" className="text-white" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '7px'
                            }}>
                                <i className="fa fa-envelope"></i> anuragchauhan7042666582@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div >
        <div className="copyright-area">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <p className=""> &copy; 2024 - Ecommerce. All rights reserved.</p>
                    </div>
                    <div className="col-md-4">
                        <div className="social-media">
                            Get Connected:
                            <a href="https://twitter.com/AnuragChahan"><i class="fa-brands fa-x-twitter"></i></a>
                            <a href="https://www.linkedin.com/in/anurag-chauhan-968067227/"><i class="fa-brands fa-linkedin"></i></a>
                            <a href="https://github.com/anurag-4444"><i class="fa-brands fa-github"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Footer