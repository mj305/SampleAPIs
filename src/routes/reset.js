const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const ApiList = require("../apiList");

// Reset API Route
router.get("/all", (req, res) => {
  ApiList.forEach(page => {
    const api = page.link;
    fs.copyFile(
      path.join(__dirname, `../api/${api}.json.backup`),
      path.join(__dirname, `../api/${api}.json`),
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  });

  res.render("api-reset", {
    title: "Everything"
  });
});

// Main EndPoint Route
router.get('/:id', (req, res) => {
  const id = req.params.id.toLowerCase();
  const data = ApiList.filter(api => id == api.link.toLowerCase())[0];
  const api = data.link;
  fs.copyFile(
    path.join(__dirname, `../api/${api}.json.backup`),
    path.join(__dirname, `../api/${api}.json`),
    err => {
      if (err) {
        console.log(err);
      }
    }
  );

  res.render("api-reset", {
    ...data
  });
});

module.exports = router;