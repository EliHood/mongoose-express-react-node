import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Search from "./Search";
import Search2 from "./Search2";
import Search3 from "./Search3";
// import Cookies from 'universal-cookie';

// const cookies = new Cookies();
import "../App.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      s: "",
      listOfCountries: [],
      specificCountry: [],
      display: false,
      error: "",
    };
  }

  async componentDidMount() {
    this.fetchListOfCountries();
    // console.log("url", window.location.href);
    // this.sendrequest();
    // console.log("the data", response.data);
    return () => {
      axios.interceptors.request.use((request) => {
        console.log("Starting Request", request);
        return request;
      });

      axios.interceptors.response.use((response) => {
        console.log("Response:", response);
        return response;
      });
    };
  }

  // sendrequest = async () => {
  //   // const { outputFormat, params } = obj;

  //   const instance = axios.create({
  //     baseURL: "https://mernaddonsapp.herokuapp.com",
  //   });

  //   instance.interceptors.request.use(
  //     function (config) {
  //       console.log("thj", config);
  //       return config;
  //     },
  //     function (error) {
  //       return Promise.reject(error);
  //     }
  //   );
  //   let token = localStorage.getItem("auth-token");

  //   instance
  //     .get(
  //       ("/api/countries/search",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "x-access-token": token,
  //         },
  //       })
  //     )
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   // return response;
  // };

  // fetchListOfCountries = () => {
  //     let token = localStorage.getItem("auth-token");
  //     axios.get('/api/countries/search', {
  //         headers: {
  //             'Content-Type': 'application/json',
  //             "x-access-token": token
  //         }
  //     })
  //         .then((response) => {
  //             console.log(response)
  //             this.setState({ listOfCountries: response.data });
  //             this.setState({ display: true });
  //             console.log(this.state.listOfCountries)
  //             // console.log(cookies.get('token'))
  //         })
  //         .catch((error) => {
  //             this.setState({ error: error.response.data.msg });
  //         });
  // }

  // https://stackoverflow.com/questions/41751235/how-to-log-all-axios-calls-from-one-place-in-code
  // https://www.loggly.com/blog/best-practices-for-client-side-logging-and-error-handling-in-react/

  fetchListOfCountries = async () => {
    let token = localStorage.getItem("auth-token");
    // axios.interceptors.request.use((request) => {
    //   console.log("Starting Request", request);
    //   return request;
    // });

    // axios.interceptors.response.use((response) => {
    //   console.log("Response:", response);
    //   return response;
    // });
    try {
      const response = await axios.get(
        `/api/countries/search`,
        // `process.env.REACT_APP_BASE_URL + /api/countries/search`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      this.setState({ listOfCountries: response.data });
      this.setState({ display: true });
      console.log(this.state.listOfCountries);
    } catch (e) {
      console.log(e.message);
      // alert(e.message);
    }
  };

  search = async (e) => {
    console.log(e.target.value);
    if (e.key === "Enter") {
      try {
        const response = await axios.get(`/api/countries/man/${this.state.s}`);
        this.setState({
          specificCountry: response.data,
        });
        this.props.history.push("/SpecificCountry", {
          response: this.state.specificCountry,
        });
        console.log(response);
      } catch (e) {
        console.log(e.message);
        alert(e.message);
      }
    }
  };

  filtersearch = async (e) => {
    console.log(e.target.value);
    if (e.key === "Enter") {
      try {
        const response = await axios.get(
          `/api/countries/filterByValue/?search=${this.state.s}`
        );
        this.setState({
          specificCountry: response.data,
        });
        this.props.history.push("/FilterListOfCountries", {
          response: this.state.specificCountry,
        });
        console.log(response);
      } catch (e) {
        console.log(e.message);
        alert(e.message);
      }
    }
  };

  nameOfCountry = async (e, name) => {
    e.stopPropagation();
    console.log(e.target.value);
    const response = await axios.get(`/api/countries/man/${name}`);
    this.setState({
      specificCountry: response.data,
    });
    this.props.history.push("/FilterListOfCountries", {
      response: this.state.specificCountry,
    });
    console.log(response);
  };

  handleInputSearch = (e) => {
    this.setState({
      s: e.target.value,
    });
  };

  handleClearInput = (e) => {
    this.fetchListOfCountries();
  };

  handleInput = (e) => {
    if (e.key === "Enter") {
      this.setState({
        listOfCountries: this.state.listOfCountries.filter(
          (country) =>
            country.name.trim().toLowerCase() ===
            this.state.s.trim().toLowerCase()
        ),
      });
      console.log(this.state.listOfCountries);
    }
  };

  handleLogout = (e) => {
    localStorage.removeItem("auth-token");
    this.props.history.push("/");
  };

  render() {
    const { listOfCountries } = this.state;
    console.log("No data:", listOfCountries);

    const renderListOfCountries = listOfCountries.map((country) => (
      <li
        onClick={(e) => {
          this.nameOfCountry(e, country.name);
        }}
      >
        {country.name}
      </li>
    ));
    return (
      <div>
        {this.state.display ? (
          <Container>
            <div>
              <div>
                <p>
                  *Type a string in the input field below and hit the Enter
                  button on your keyboard*
                </p>
                <p>It returns a country filtered on the front-end</p>
              </div>
              <Search
                handleInputSearch={this.handleInputSearch}
                handleInput={this.handleInput}
                handleClearInput={this.handleClearInput}
              />
              <hr></hr>

              <div>
                <p>
                  *Type a string in the input field below and hit the Enter
                  button on your keyboard*
                </p>
                <p>
                  It returns a details of a specific country given in the input
                  field using the Node back end and send it to the front end.
                </p>
              </div>
              <Search2
                handleInputSearch={this.handleInputSearch}
                search={this.search}
              />
              <hr></hr>

              <div>
                <p>
                  Type a string in the input field below and hit the Enter
                  button on your keyboard
                </p>
                <p>
                  It returns a lists of countries that matches at least a part
                  of one of these string{" "}
                </p>
              </div>

              <Search3
                handleInputSearch={this.handleInputSearch}
                search={this.filtersearch}
              />
              <hr></hr>
              <p>
                {" "}
                when you click on any of the countries below. The detail of the
                clicked country is returned
              </p>
              <ul>{renderListOfCountries}</ul>
              <Button
                size="sm"
                variant="danger"
                onClick={() => this.handleLogout()}
              >
                Logout
              </Button>
            </div>
          </Container>
        ) : (
          <p>{this.state.error}</p>
        )}
      </div>
    );
  }
}

export default App;
