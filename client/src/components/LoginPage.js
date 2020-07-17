import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Cookies from "universal-cookie";
import Axios from "axios";
var jwt = require("jsonwebtoken");

const cookies = new Cookies();

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      // redirect: false
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  // isExpired() {
  //     const token = localStorage.getItem("auth-token");
  //     var decodedToken = jwt.decode(token, { complete: true });
  //     var dateNow = new Date();
  //     if (decodedToken.exp !== null) {
  //         if (decodedToken.exp < dateNow.getTime()) {
  //             this.setState({
  //                 redirect: true
  //             });
  //             return true
  //         }
  //         else {
  //             this.setState({
  //                 redirect: false
  //             });
  //             return false
  //         }
  //     }
  // }

  componentDidMount() {
    // if (this.isExpired()) {
    //     this.props.history.push('/ListOfCountriesPage');
    // }
  }

  handleLogin = (data) => {
    Axios({
      method: "POST",
      url: "/api/user/login",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState(
            {
              isLoggedIn: true,
            },
            () => {
              console.log(response);
              localStorage.setItem("auth-token", cookies.get("token"));
              let token = localStorage.getItem("auth-token");
              if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
              }
              //console.log(cookies.get('token'))
              this.props.history.push("/ListOfCountriesPage");
            }
          );
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log("response: ", error.response.data.error);
        if (error.response.data.error) {
          document.getElementById(
            "error"
          ).innerHTML = `${error.response.data.message}`;
        }
        if (error.response.data.message) {
          var myElement = document.getElementById("error");
          myElement.innerHTML = `${error.response.data.message.replace(
            /['"]+/g,
            ""
          )}`;
        }
      });
  };

  redirectToRegisterPage() {
    this.props.history.push("/RegisterPage");
  }

  render() {
    // if (this.state.redirect) {
    //     return <Redirect to="/ListOfCountriesPage" />
    // }

    return (
      <>
        <Container>
          <div className="center">
            <p> username:ayuba and password:ayuba</p>
          </div>

          <Row className="full-height align-items-center justify-content-center">
            <Col xs={12} sm={8} md={6} lg={4}>
              <Card>
                <Card.Header className="text-center">Login</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={this.state.username}
                      onChange={(e) => this.handleChange(e)}
                    ></Form.Control>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={this.state.password}
                      onChange={(e) => this.handleChange(e)}
                    ></Form.Control>
                  </Form>
                </Card.Body>
                <Card.Footer>
                  <Button
                    block
                    variant="primary"
                    onClick={() => this.handleLogin(this.state)}
                  >
                    Login
                  </Button>
                  <Button
                    block
                    variant="secondary"
                    onClick={() => this.redirectToRegisterPage()}
                  >
                    Register
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <div className="center">
            <p id="error"></p>
          </div>
        </Container>
      </>
    );
  }
}

export default withRouter(LoginPage);
