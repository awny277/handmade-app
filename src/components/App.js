import React, { useEffect, useState } from "react";
import NavBar from "./Layout/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import Footer from "./Layout/Footer/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import axios from "axios";
import NewProducts from "./Pages/NewProducts/NewProducts";
import SpecialProductPage from "./Pages/specialProductPage/specialProductPage";
import SpecialProductDetailsPage from "./Pages/AddOfferPage/SpecialProductDetailsPage";
import Cart from "./Pages/Cart/Cart";
import CartProcess from "./Pages/CartProcess/CartProcess";
import Profile from "./Pages/Profile/Profile";
import DashBoard from "./Pages/Profile/DashBoard/DashBoard";
import Setting from "./Pages/Profile/Setting/Setting";
import ControlPanal from "./Pages/Profile/ControlPanal/ControlPanal";

// import "./App.css";
// import DarkMode from "./Layout/DarkMode/DarkMode";
// import AddOfferPage from "./Pages/AddOfferPage/SpecialProductDetailsPage";

function App() {
  const [addnewProdcuts, setAddnewProdcuts] = useState([]);
  const [sepialOrder, setSpecialOrder] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  useEffect(() => {
    const getDate = async () => {
      axios.get("http://127.0.0.1:5000/products").then((res) => {
        // console.log(res);
        setAllProduct(res.data);
        const product = Object.values(res.data);
        setAddnewProdcuts(product);
      });
    };
    const getSpecailOrder = () => {
      axios
        .get("https://6259ff6a43fda1299a146d28.mockapi.io/specialProdect")
        .then((res) => {
          const product = res.data;
          setSpecialOrder(product);
        });
    };
    getDate();
    getSpecailOrder();
  }, []);

  const [ID, setId] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    if (window.localStorage.getItem("userID")) {
      setId(window.localStorage.getItem("userID"));
      axios
        .get("https://6259ff6a43fda1299a146d28.mockapi.io/users/" + ID)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch(() => {
          window.localStorage.setItem("userName", "");
          window.localStorage.setItem("password", "");
          window.localStorage.setItem("email", "");
          window.localStorage.setItem("userID", "");
          window.localStorage.setItem("isOline", "false");
          window.location.reload(false);
        });
    } else {
      return null;
    }
  }, [ID]);

  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  }
  const [CartProducts, setCartProducts] = useState([]);
  const AddtoCart = (item) => {
    // const index
    // const data = [...allProduct];
    // const index = data.indexOf(item);
    // console.log(item);
    const product = allProduct[item.id];
    // let price = data[index];
    // console.log(price);
    console.log(product);
    const result = [...CartProducts, product];
    setCartProducts(result);
  };
  return (
    <React.Fragment>
      <NavBar userInfo={userInfo} />
      {/* <DarkMode /> */}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home userInfo={userInfo} />} />
        {/* <Route
          path="/dashBoard"
          element={
            <DashBoard
              userInfo={userInfo}
              sepialOrder={sepialOrder}
              setSpecialOrder={(data) => setSpecialOrder(data)}
            />
          }
        /> */}
        <Route
          path="/NewProducts"
          element={<NewProducts newProdcuts={addnewProdcuts} />}
        />
        <Route
          path="/ProductDetails/:id"
          element={
            <ProductDetails
              addnewProject={addnewProdcuts}
              userInfo={userInfo}
              AddtoCart={(e) => AddtoCart(e)}
            />
          }
        />
        <Route
          path="/specialProductPage"
          element={<SpecialProductPage sepialOrder={sepialOrder} />}
        />
        <Route
          path="/specialProductDetailsPage/:id"
          element={<SpecialProductDetailsPage userInfo={userInfo} />}
        />
        <Route
          path="/cart"
          element={<Cart userInfo={userInfo} CartProducts={CartProducts} />}
        />
        <Route path="/cartProcess" element={<CartProcess />} />
        <Route path="/profile" element={<Profile userInfo={userInfo} />}>
          <Route
            path="/profile/dashBoard"
            element={
              <DashBoard
                userInfo={userInfo}
                sepialOrder={sepialOrder}
                setSpecialOrder={(data) => setSpecialOrder(data)}
              />
            }
          />
          <Route
            path="/profile/setting"
            element={<Setting userInfo={userInfo} />}
          />
          <Route path="/profile/controlPanal" element={<ControlPanal />} />
        </Route>
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
