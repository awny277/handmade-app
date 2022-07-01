import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserRegister.css";

const UserRegister = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [validateAccount, setValidateAccount] = useState([]);
  const navigate = useNavigate();
  //get  http://127.0.0.1:5000/logout
  const logoutHandeller = () => {
    axios
      .get("http://127.0.0.1:5000/logout")
      .then((res) => console.log(res))
      .then(() => {
        window.localStorage.setItem("password", "");
        window.localStorage.setItem("userName", "");
        window.localStorage.setItem("email", "");
        window.localStorage.setItem("isOline", "false");
        window.location.reload(false);
      });
    navigate("/");
  };
  // http://127.0.0.1:5000/register
  useEffect(() => {
    axios
      .get("https://6259ff6a43fda1299a146d28.mockapi.io/users")
      .then((res) => {
        setUserInfo(res.data);
      });
  }, [validateAccount]);

  const HandelForgetPassword = async () => {
    const { value: email } = await Swal.fire({
      // allowOutsideClick: false,
      title: "Enter Your Account",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address",
    });
    const accoundValidation = userInfo.find((ele) => {
      return ele.email.toLowerCase() === email.toLowerCase();
    });
    if (email) {
      const { value: password } = await Swal.fire({
        title: "Enter your new password",
        input: "password",
        inputLabel: "Password",
        inputPlaceholder: "Enter your New password",
        inputAttributes: {
          maxlength: 10,
          autocapitalize: "off",
          autocorrect: "off",
        },
      });
      if (password) {
        axios
          .put(
            "https://6259ff6a43fda1299a146d28.mockapi.io/users/" +
              accoundValidation.id,
            {
              email,
              password,
            }
          )
          .then((res) => {
            window.localStorage.setItem("userName", accoundValidation.userName);
            window.localStorage.setItem("password", password);
            window.localStorage.setItem("email", email);
            window.localStorage.setItem("userID", res.data.id);
            window.localStorage.setItem("isOline", "true");
            window.location.reload(false);
          })
          .catch((err) => console.log(err));
        navigate("/");
      }
    }
  };

  const HandlerReister = async (e) => {
    const { value: userName } = await Swal.fire({
      title: "User Name",
      input: "text",
      inputLabel: "Your Name",
      inputPlaceholder: "Enter your userName",
    });

    if (userName) {
      const { value: email } = await Swal.fire({
        title: "Register",
        input: "email",
        inputLabel: "Your email address",
        inputPlaceholder: "Enter your email address",
      });

      if (email) {
        const { value: password } = await Swal.fire({
          title: "Enter your password",
          input: "password",
          inputLabel: "Password",
          inputPlaceholder: "Enter your password",
          inputAttributes: {
            maxlength: 10,
            autocapitalize: "off",
            autocorrect: "off",
          },
        });
        if (password) {
          const { value: type } = await Swal.fire({
            title: "Select field validation",
            input: "select",
            inputOptions: {
              seller: "Seller",
              user: "User",
            },
            inputPlaceholder: "Select Type",
            showCancelButton: true,
            inputValidator: (value) => {
              return new Promise((resolve) => {
                if (value !== "") {
                  resolve();
                } else {
                  resolve("You need to select type :)");
                }
              });
            },
          });
          if (type) {
            axios
              .post("http://127.0.0.1:5000/register", {
                email,
                password,
                username: userName,
                type,
              })
              .then((res) => console.log(res))
              .then(() => {
                window.localStorage.setItem("userName", userName);
                window.localStorage.setItem("email", email);
                window.localStorage.setItem("isOline", "true");
                window.location.reload(false);
              })
              .catch((err) => console.log(err));
            navigate("/");
          }
        }
      }
    }
  };

  const Loginn = async (e) => {
    const { value: email } = await Swal.fire({
      // allowOutsideClick: false,
      title: "Login",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address",
    });
    if (email) {
      const { value: password } = await Swal.fire({
        // allowOutsideClick: false,
        title: "Login",
        input: "password",
        inputLabel: "Password",
        inputPlaceholder: "Enter your password",
        inputAttributes: {
          maxlength: 10,
          autocapitalize: "off",
          autocorrect: "off",
        },
      });
      if (password) {
        axios
          .post("http://127.0.0.1:5000/login", {
            email,
            password,
          })
          .then((res) => {
            console.log(res);
            return res;
          })
          .then((res) => {
            if (res.data.message === "Invalid email and/or password") {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Emaill or Password is Wrong",
                footer: `<button class="Forget btn" >Sign up</button>`,
              });
              document.querySelector(".Forget").onclick = () => {
                HandlerReister();
              };
            } else {
              window.localStorage.setItem("userID", res.data.id);
              window.localStorage.setItem("userName", res.data.username);
              window.localStorage.setItem("email", res.data.email);
              window.localStorage.setItem("isOline", "true");
              window.location.reload(false);
            }
          });
      }
    }
  };

  return (
    <React.Fragment>
      {window.localStorage.getItem("isOline") === "true" ? (
        <div className="registerr">
          <button className="btn btn-danger Logout" onClick={logoutHandeller}>
            Log out
          </button>
        </div>
      ) : (
        <div className="registerr">
          <button className="btn signup" onClick={HandlerReister}>
            sign up
          </button>
          <button className="btn Login" onClick={Loginn}>
            log in
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default UserRegister;
