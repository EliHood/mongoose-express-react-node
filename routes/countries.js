const axios = require("axios");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const fetch = require("node-fetch");

filterByValue = (array, string) => {
  return (data = array.filter(function (country) {
    return country.name.includes(string);
  }));
};

filterBySearch = async (array, string) => {
  let data;
  return (data = await array.filter((country) => {
    return country.name.toLowerCase().includes(string.toLowerCase());
  }));
};

// function filterByValue(array, string) {
//     return array.filter(o => {
//         return Object.keys(o).some(k => {
//             if (typeof o[k] === 'string')
//                 return o[k].toLowerCase().includes(string.toLowerCase());
//         });
//     });
// }

// router.get("/search", auth.isAuthenticated, async (req, res) => {
//   let url = `https://restcountries.eu/rest/v2/all`;
//   try {
//     let response = await axios.get(url);
//     console.log(response.data);
//     res.status(200).json(response.data);
//   } catch (e) {
//     console.log(e);
//   }
// });

router.get("/search", auth.isAuthenticated, async (req, res) => {
  let url = `https://restcountries.eu/rest/v2/all`;
  fetch(`https://restcountries.eu/rest/v2/all`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return res.status(200).json(json);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/filterByValue", async (req, res) => {
  let url = `https://restcountries.eu/rest/v2/all`;
  let search = req.query.search;

  try {
    let response = await axios({
      method: "get",
      url,
    });
    var listofcountries = await filterByValue(response.data, search);
    console.log(listofcountries);
    res.status(200).json(listofcountries);
  } catch (e) {
    console.log(e);
  }
});

// router.get("/filterByValue", (req, res) => {
//   let url = `https://restcountries.eu/rest/v2/all`;
//   let search = req.query.search;

//   axios({
//     method: "get",
//     url,
//   })
//     .then((response) => {
//       var listofcountries = filterByValue(response.data, search);
//       console.log(listofcountries);
//       res.status(200).json(listofcountries);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

router.get("/filterBySearch", (req, res) => {
  let url = `https://restcountries.eu/rest/v2/all`;
  let search = req.query.search;

  axios({
    method: "get",
    url,
  })
    .then(async (response) => {
      var listofcountries = await filterBySearch(response.data, search);
      // console.log(listofcountries);
      res.status(200).json(listofcountries);
    })
    .catch((error) => {
      console.log(error);
    });
});

// router.get("/man/:country", (req, res) => {
//   let country = req.params.country;
//   console.log(req.params.country);
//   let url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
//   axios({
//     method: "get",
//     url,
//   })
//     .then((response) => {
//       console.log(response.data);
//       res.status(200).json(response.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

router.get("/man/:country", async (req, res) => {
  let country = req.params.country;
  console.log(req.params.country);
  let url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
  try {
    let response = await axios({
      method: "get",
      url,
    });
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
