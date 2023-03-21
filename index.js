// Import the required modules
import express from "express";

// Create a new Express app
const app = express();

const url = ["https://raw.githubusercontent.com/fdnd-agency/ultitv/main/api"];

const urls = [
  [url] + "/game/943.json",
  [url] + "/game/943/statistics.json",
  [url] + "/facts/Player/8607.json",
];

// Set EJS as the template engine and specify the views directory
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static("public"));

app.get("/", async function (request, response) {
  const [data1, data2, data3] = await Promise.all(urls.map(fetchJson));
  const data = { data1, data2, data3 };
  response.render("index", data);
});

// Set the port number and start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Application available on: http://localhost:${port}`);
});

async function fetchJson(urls) {
  return await fetch(urls)
    .then((response) => response.json())
    .catch((error) => error);
  // console.log(urls);
}