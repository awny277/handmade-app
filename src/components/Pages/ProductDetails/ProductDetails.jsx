import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
// import new1 from "../../../image/new1.jpg";
import {
  FaMinus,
  FaPlus,
  FaHeart,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
// import Card from "../../Layout/Card/Card";
import SimillerProductCard from "../../Layout/SimillerProductCard/SimillerProductCard";
import "./Product.css";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";

const ProductDetails = ({ addnewProject, userInfo }) => {
  const [result, setResult] = useState({});
  const [similler, setSimiller] = useState([]);
  const [review, setReview] = useState("");
  const [comment, setCommetns] = useState([]);
  const params = useParams();
  const [count, setCount] = useState(1);
  const [addItemToCart, setAddItemToCart] = useState([]);
  const id = params.id;
  useEffect(() => {
    const getDate = async () => {
      axios
        // http://127.0.0.1:5000/product/1
        .get(`http://127.0.0.1:5000/product/${id}`)
        .then((res) => {
          const product = res.data;
          setResult(product);
          setSimiller(simillerProducts);
          // setCommetns(product.comments);
        });
    };

    const simillerProducts = addnewProject.filter(
      (ele) => ele.id !== result.id && ele.category === result.category
    );
    getDate();
  }, [id, result.id, result.category, addnewProject]);

  const ReviewSubmit = (e) => {
    if (localStorage.getItem("isOline") === "false") {
      e.preventDefault();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: "You must log in.",
      });
    } else if (review.length === 0) {
      e.preventDefault();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: "All fields must be completed.",
      });
    } else {
      const data = [
        {
          time: new Date(),
          id: new Date(),
          userOffer: userInfo.userName,
          accountUserOffer: userInfo.email,
          comment: review,
        },
      ];
      const comments = result.comments.concat(data);
      axios
        .put(`https://6259ff6a43fda1299a146d28.mockapi.io/products/${id}`, {
          comments,
        })
        .then(setCommetns(comments))
        .catch((err) => console.log(err));
      setReview("");
    }
  };
  const Counterless = () => {
    if (count === 1) {
      setCount(1);
    } else {
      setCount(count - 1);
    }
  };

  const AddToCartHandeller = () => {
    console.log("hello from cart");
    console.log(result);
    setAddItemToCart(result);
  };
  return (
    <div className="container main-sections">
      <div className="container1">
        <div className="sec-01">
          <img src={`../${result.img_path}`} alt="productImage" />
        </div>
        <div className="sec-02">
          <h3>{result.title}</h3>
          <span> EGP {result.price}</span>
          <div className="type">
            <p>type : {result.category}</p>
            {/* <p>subType : {result.projectSubCategType}</p> */}
          </div>
          <div className="details">
            {/* <p>
              deliveryDays : <span>{result.delivarDays}</span>
            </p> */}
            <p> {result.projectDetails}</p>
          </div>
          <div className="card-shipping">
            <div className="card-qty">
              <button>
                <FaMinus onClick={() => Counterless()} />
              </button>
              <span>{count}</span>
              <button onClick={() => setCount(count + 1)}>
                <FaPlus />
              </button>
            </div>
            <div className="add-card">
              <button onClick={() => AddToCartHandeller()}>Add to card</button>
            </div>
            <div className="fav-product">
              <button>
                <FaHeart />
              </button>
            </div>
          </div>
          <div className="returns">
            <button>returns &amp; delivery</button>
            <button>ask a question</button>
          </div>
          <span>SKU :N/A</span>
          <div className="additional">
            <a href="/">
              <FaFacebookF />
            </a>
            <a href="/">
              <FaTwitter />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaLinkedinIn />
            </a>
            <a href="/">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
      <div className="review">
        <h2>Review</h2>
        <FloatingLabel controlId="floatingTextarea2" label="Review">
          <Form.Control
            as="textarea"
            placeholder="Leave Project Details here"
            style={{ height: "250px" }}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Form.Text id="passwordHelpBlock" muted>
            Enter a detailed description of your project and attach examples of
            what you want if possible.
          </Form.Text>
        </FloatingLabel>
        <button className="btn btn-outline-primary" onClick={ReviewSubmit}>
          send review
        </button>
      </div>
      <hr />
      <h1 className="text-center">similler Products</h1>
      <Container>
        <Row>
          {similler
            .filter((ele) => ele.projectCategType === result.projectCategType)
            .map((ele) => {
              return (
                <Col md={3} key={ele.id}>
                  <SimillerProductCard
                    projectTitle={ele.title}
                    budget={ele.price}
                    projectCategType={ele.category}
                    projectSubCategType={ele.projectSubCategType}
                    id={ele.id}
                    imgUrl={`../${ele.img_path}`}
                  />
                </Col>
              );
            })}
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetails;
