import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { changeProductUpdate, fetchProductDetail, postReviewOfProduct } from '../../store/slices/productDetail'
import ReactStars from 'react-rating-stars-component'
import ReviewCard from '../productCard/ReviewCard.jsx'
import { ToastContainer, toast } from 'react-toastify'
import Rating from 'react-rating-stars-component';
import { Toast } from 'react-bootstrap';
import MetaData from '../MetaData.jsx'
import { addProductToCart } from '../../store/slices/userCart.jsx'
import { addProductToWishlist } from '../../store/slices/wishlistCart.jsx'

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showToast, setShowToast] = useState({ status: false, error: false, msg: '' });

  const { id } = useParams()
  const dispatch = useDispatch()

  const { product, status, error, isUpdated, ratingCounts } = useSelector((state) => (state.Product))
  const { isAuthenticated } = useSelector(state => state.User)

  useEffect(() => {
    dispatch(fetchProductDetail(id)).finally(() => dispatch(changeProductUpdate()))
  }, [dispatch, isUpdated])

  const addToCart = () => {

    if (isAuthenticated)
      dispatch(addProductToCart({ productId: product._id })).finally(() => {
        setShowToast({ status: true, msg: 'Product Added to Cart.', error: false });
      })
    else
      setShowToast({ status: true, msg: 'Login/Signup First', error: true });
  }

  const addWishlist = () => {

    if (isAuthenticated)
      dispatch(addProductToWishlist({ productId: product._id })).finally(() => {
        setShowToast({ status: true, msg: 'Product Added to Wishlist.', error: false });
      })
    else
      setShowToast({ status: true, msg: 'Login/Signup First', error: true });
  }

  const postReview = () => {
    setComment("")
    setRating(0)
    if (rating.length !== 0 && comment.length !== 0)
      dispatch(postReviewOfProduct({ rating, comment, productId: product._id })).finally(() => {
        setShowToast({ status: true, msg: 'Review Posted Successfully', error: false })
      })
  }
  const handleRatingChange = (value) => {
    // value is the new value selected by the user
    setRating(value);
  };


  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 15 : 20,
    value: product.ratings,
    // value: 4.2,
    isHalf: true,
  }

  function changeImage(src) {
    document.getElementById('main-image-container').innerHTML = `<img src=${src} className="w-100" alt="Img" id="main-image" height="100%" />`;
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  }

  function increaseQuantity() {
    if (quantity < product.Stock) {
      if (quantity < 10)
        setQuantity(prevQuantity => prevQuantity + 1);
    }
  }

  function setQuantityManually(e) {
    let val = Number(e.target.value);
    if (val > 10) {
      setQuantity(10);
    } else if (val < 1 || isNaN(val)) {
      setQuantity(1);
    } else {
      setQuantity(val);
    }
  }

  function loadMoreReviews() {
    setVisibleReviews(prevVisibleReviews => prevVisibleReviews + 5);
  }

  if (error) {
    toast.error(`${error} !`, {
      position: toast.POSITION.BOTTOM_CENTER
    });
    return <ToastContainer />
  }

  return (<>
    <MetaData title={`${product.name}`} />

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

    {(status === 'loading' || !product) ? <div className="d-flex justify-content-center">
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden"></span>
      </div></div> : product &&
    (

      <div className="py-3 py-md-5 bg-light">


        <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Post a Review</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Overall Rating</label>
                  <Rating
                    count={5}
                    value={rating}
                    onChange={handleRatingChange}
                    size={24}
                    activeColor="#ffd700"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Write a Comment</label>
                  <textarea class="form-control" value={comment} onChange={(e) => setComment(e.target.value)} id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={postReview}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">

            <div className="col-lg-6 col-md-12 col-sm-12 mt-3">
              <div className="row">

                <div className="col-md-2 main-image-seletion">
                  <div className="thumbnails">
                    {product.images.map((image, index) => (
                      <img key={index} src={image.url} alt={`Thumbnail image ${index + 1}`} onMouseOver={() => changeImage(image.url)} />
                    ))}
                  </div>
                </div>

                <div className="col-md-10 main-image-outer" id='main-image-container' style={{ maxHeight: '276px' }}>
                  <img src={product.images[0].url} className="w-100 h-100" alt="Img" id="main-image" style={{ width: '100%' }} />
                </div>

                <div className="col-md-12 product-image-slider">
                  <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-indicators">
                      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>

                      {product.images.map((image, index) => {
                        if (index > 0) {
                          return <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} aria-label={`Slide ${index}`}></button>
                        }
                      })}

                    </div>
                    <div className="carousel-inner" style={{ maxHeight: '376px' }}>
                      <div className="carousel-item active">
                        <img key={0} src={product.images[0].url} alt="..." className="d-block w-100" />
                      </div>

                      {product.images.map((image, index) => {
                        if (index > 0) {
                          return <div className="carousel-item">
                            <img key={index} src={image.url} alt={`Thumbnail image ${index + 1}`} className="d-block w-100" />
                          </div>
                        }
                      })}

                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

            <div className="col-lg-6 col-md-12 col-sm-12 mt-3">
              <div className="product-view">
                <h4 className="product-name">
                  {product.name}
                  <label className={`label-stock bg-${product.Stock === 0 ? 'danger' : 'success'}`}>{product.Stock === 0 ? 'Out Of Stock' : 'In Stock'}</label>
                </h4>
                <hr />

                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <ReactStars {...options} />

                  <p className='m-0'>({product.numOfReviews} Reviews)</p>
                </div>

                <div>
                  <span className="selling-price">${product.price}</span>
                  <span className="original-price">${product.price + 200}</span>
                </div>
                <div className="mt-2">
                  <div className="input-group">
                    <span className="btn btn1" onClick={decreaseQuantity}><i className="fa fa-minus"></i></span>
                    <input type="number" value={quantity} onChange={e => setQuantityManually(e)} className="input-quantity" />
                    <span className="btn btn1" onClick={increaseQuantity}><i className="fa fa-plus"></i></span>
                  </div>
                </div>
                <div className="mt-2">
                  <a href="#" className="btn btn1" onClick={() => (addToCart())}> <i className="fa fa-shopping-cart"></i> Add To Cart</a>
                  <a href="#" className="btn btn1" onClick={() => (addWishlist())}> <i className="fa fa-heart"></i> Add To Wishlist </a>
                  <br />
                  {/* <a href="" className="btn buy-btn"> <IoIosWallet /> Buy Now </a> */}
                  <button type="button" class="btn" id='post-review' data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Post Review
                  </button>
                </div>
                <div className="mt-3">
                  <h5 className="mb-0">Description</h5>
                  <p>
                    {product.description}
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="row">

            <div className="col-md-4 col-sm-5 col-12">
              <div className="row">

                <div className="col-12 d-flex align-items-center gap-2 justify-content-center">  <Rating
                  count={5}
                  value={ratingCounts[5] ? 5 : 0}
                  size={32}
                  edit={false}
                /> <span>{ratingCounts[5] ? ratingCounts[5] : 0}</span> </div>

                <div className="col-12 d-flex align-items-center gap-2 justify-content-center"><Rating
                  count={5}
                  value={ratingCounts[4] ? 4 : 0}
                  size={32}
                  edit={false}
                /><span>{ratingCounts[4] ? ratingCounts[4] : 0}</span></div>

                <div className="col-12 d-flex align-items-center gap-2 justify-content-center"><Rating
                  count={5}
                  value={ratingCounts[3] ? 3 : 0}
                  size={32}
                  edit={false}
                /><span>{ratingCounts[3] ? ratingCounts[3] : 0}</span></div>

                <div className="col-12 d-flex align-items-center gap-2 justify-content-center"><Rating
                  count={5}
                  value={ratingCounts[2] ? 2 : 0}
                  size={32}
                  edit={false}
                /><span>{ratingCounts[2] ? ratingCounts[2] : 0}</span></div>

                <div className="col-12 d-flex align-items-center gap-2 justify-content-center"><Rating
                  count={5}
                  value={ratingCounts[1] ? 1 : 0}
                  size={32}
                  edit={false}
                /><span>{ratingCounts[1] ? ratingCounts[1] : 0}</span></div>

              </div>
            </div>
            <div className="col-md-8 col-sm-7 col-12">
              {product.reviews.length > 0 && <h2>Reviews</h2>}

              {product.reviews && product.reviews.slice(0, visibleReviews).map((review, index) => (
                <ReviewCard review={review} index={index} product={product} />
              ))}

              {5 < product.reviews.length && (
                <button onClick={loadMoreReviews} className="load-more-btn col-12">See more reviews</button>
              )}
            </div>

          </div>
        </div>
      </div>)}
  </>
  )
}

export default ProductDetails