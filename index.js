const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

var ImageKit = require("imagekit");
/*var imagekit = new ImageKit({
  publicKey: process.env.publicImg,
  privateKey: process.env.privateImg,
  urlEndpoint: process.env.urlEndpoint,
});*/
const server = express();
server.set("view engine", "ejs");
server.use(express.static(path.join(__dirname, "/public")));
server.use(
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist"))
);
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var data = [
  {
    id: 1,
    Title: "Halo Semuanya",
    Content: [
      {
        babTitle: "Bab 1: Pendahuluan",
        babContent: "Isi dari Bab 1: Pendahuluan",
        image: "https://ik.imagekit.io/9hpbqscxd/RejangPedia/for-id-1-1.jpg",
      },
      {
        babTitle: "Bab 2: Bab Kedua",
        babContent: "Isi dari Bab 2: Bab Kedua",
        image: "https://ik.imagekit.io/9hpbqscxd/RejangPedia/for-id-1-2.jpg",
      },
      {
        babTitle: "Bab 3: Bab Ketiga",
        babContent: "Isi dari Bab 3: Bab Ketiga",
      },
    ],
  },
];
var dataOnGoing = [];

server.get("/", function (req, res) {
  res.send("coba ke /details/1 deh");
});

server.get("/new", function (req, res) {
  res.render("new");
});

server.get("/details/:id", function (req, res) {
  const theData = data[req.params.id - 1];
  if (theData === null) {
    res.send("The Heck Bro");
  }
  res.render("details", {
    data: theData,
  });
});

server.get("/edit/:id", function (req, res) {
  const theData = data[req.params.id - 1];
  if (theData === null) {
    res.send("The Heck Bro");
  }
  res.render("edit", {
    data: theData,
  });
});

server.post("/new", function (req, res) {
  var user = req.body;
  console.log(user);
  dataOnGoing.unshift({
    id: data.length + 1,
    Title: user.title,
    Content: user.content, // Parse the JSON content
  });
  console.log(dataOnGoing);
  res.send(dataOnGoing);
});

const port = 1945;
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
