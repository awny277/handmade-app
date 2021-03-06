import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Form, FloatingLabel } from "react-bootstrap";
import Swal from "sweetalert2";

const SellerDashBoard = ({ sepialOrder, setSpecialOrder }) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [budget, setBudegt] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [projectCategType, setProjectCategType] = useState("Baskets");
  const [SelectImage, setSelectImage] = useState(
    "https://cdn.shopify.com/s/files/1/0108/3038/1113/products/product35_720x.jpg?v=1532677866"
  );

  const ResetFields = () => {
    setProjectTitle("");
    setBudegt("");
    setProjectDetails("");
    setProjectCategType("Clothes");
    window.location.reload(false);
  };

  const formSumited = (e) => {
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
    } else if (
      projectTitle.length === 0 ||
      budget.length === 0 ||
      projectDetails.length === 0
    ) {
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
      const data = {
        price: budget,
        title: projectTitle,
        description: projectDetails,
        category: projectCategType,
        img_path: SelectImage,
      };
      axios
        .post("http://127.0.0.1:5000/add_product", {
          ...data,
        })
        .then((res) => console.log(res))
        .then(ResetFields)
        .catch((err) => console.log(err));
      const updateData = [...sepialOrder, data];
      setSpecialOrder(updateData);
    }
  };

  return (
    <Container fluid>
      <div className="add-project">
        <h1 className="text-center">Add new product</h1>
        <div className="add-project-content">
          <Form className="text-center">
            <Row>
              <Col xs={12} className="cloumn" md={5}>
                <FloatingLabel controlId="floatingInput" label="Project Title ">
                  <Form.Control
                    type="text"
                    placeholder="Enter Project Title"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                  />
                  <Form.Text id="passwordHelpBlock" muted>
                    Include a short title that accurately describes your
                    project.
                  </Form.Text>
                </FloatingLabel>
              </Col>
              <Col className="cloumn" xs={12} md={6}>
                {/* <FloatingLabel
                  controlId="floatingInput"
                  label="Required Skills"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter Required Skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                  <Form.Text id="passwordHelpBlock" muted>
                    Determine the most important skills required to implement
                    your project.
                  </Form.Text>
                </FloatingLabel> */}
                <FloatingLabel
                  controlId="floatingInput"
                  label="The Expected budget"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="Enter Expected budget"
                    value={budget}
                    onChange={(e) => setBudegt(e.target.value)}
                  />
                  <Form.Text id="passwordHelpBlock" muted>
                    Choose an appropriate budget to get good offers
                  </Form.Text>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col className="cloumn" xs={12} md={6}>
                <FloatingLabel
                  controlId="floatingSelect"
                  label="Select Category Type"
                >
                  <Form.Select
                    aria-label="Select Category Type"
                    onChange={(event) =>
                      setProjectCategType(event.target.value)
                    }
                    value={projectCategType}
                  >
                    <option value="Baskets">baskets</option>
                    <option value="Mats Rugs">mats-rugs</option>
                    <option value="Cushions">cushions</option>
                    <option value="Banquettes Ottomans Pouffes">
                      banquettes-ottomans-pouffes
                    </option>
                    <option value="Chairs">chairs</option>
                    <option value="Bags Clutches">bags-clutches</option>
                    {/* Carpets and kilims */}
                  </Form.Select>
                  <Form.Text id="passwordHelpBlock" muted>
                    Select the type or material you want .
                  </Form.Text>
                </FloatingLabel>
                {/* {projectCategType === "Clothes" && (
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Select Sub Category Type"
                  >
                    <Form.Select
                      aria-label="Select sub Category Type"
                      onChange={(event) =>
                        setProjectSubCategType(event.target.value)
                      }
                      value={projectSubCategType}
                    >
                      <option value=""></option>
                      <option value="Shoes and Bags">Shoes and Bags</option>
                      <option value="Clothes">Clothes</option>
                    </Form.Select>
                    <Form.Text id="passwordHelpBlock" muted>
                      Select the subtype or material you want .
                    </Form.Text>
                  </FloatingLabel>
                )}
                {projectCategType === "Home" && (
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Select Sub Category Type"
                  >
                    <Form.Select
                      aria-label="Select Sub Category Type"
                      onChange={(event) =>
                        setProjectSubCategType(event.target.value)
                      }
                      value={projectSubCategType}
                    >
                      <option value="Furniture">Furniture</option>
                      <option value="Light">Light</option>
                      <option value="Upholstery">Upholstery</option>
                    </Form.Select>
                    <Form.Text id="passwordHelpBlock" muted>
                      Select the subtype or material you want .
                    </Form.Text>
                  </FloatingLabel>
                )} */}
                <FloatingLabel controlId="floatingInput" label="Image Url ">
                  <Form.Control
                    type="text"
                    placeholder="Enter Image Url"
                    value={SelectImage}
                    onChange={(e) => setSelectImage(e.target.value)}
                  />
                  <Form.Text id="passwordHelpBlock" muted>
                    Include a Image Url that accurately describes your project.
                  </Form.Text>
                </FloatingLabel>
              </Col>
              <Col className="cloumn" xs={12} md={5}>
                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Project Details"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Leave Project Details here"
                    style={{ maxHeight: "250px", minHeight: "150px" }}
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                  />
                  <Form.Text id="passwordHelpBlock" muted>
                    Enter a detailed description of your project and attach
                    examples of what you want if possible.
                  </Form.Text>
                </FloatingLabel>
                {/* <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Default file input example</Form.Label>
                  <Form.Control
                    type="file"
                    value={SelectImage}
                    onChange={(e) => setSelectImage(e.target.value)}
                  />
                </Form.Group> */}
              </Col>
            </Row>
          </Form>
          <Row className="text-center m-3">
            <Col>
              <button
                className={"save-button"}
                // to={"/NewProject"}
                onClick={formSumited}
              >
                save
              </button>
            </Col>
          </Row>
        </div>

        {/* ------------------ */}
        {/* <input
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />
        {selectedImage && (
          <div>
            <img
              alt="not fount"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )} */}
        {/* <Row>
          <Col className="cloumn" xs={12} md={5}>
            <div>
              <h2>Start building your order</h2>
              <p></p>
            </div>
          </Col>
        </Row> */}
      </div>
    </Container>
  );
};

export default SellerDashBoard;
