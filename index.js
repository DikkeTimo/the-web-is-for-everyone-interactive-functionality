// Import the required modules
import express from "express";
import https from "https";

// Create a new Express app
const app = express();

const url = ["https://raw.githubusercontent.com/fdnd-agency/ultitv/main/ultitv-api"];

const postUrl = "https://api.ultitv.fdnd.nl/api/v1/players?first=20";
const apiUrl = "https://api.ultitv.fdnd.nl/api/v1/questions";

const urls = [
  [url] + "/game/943.json",
  [url] + "/game/943/statistics.json",
  [url] + "/facts/Player/8607.json",
  [postUrl],
  [apiUrl],
  /* Hier voeg ik alle endpoints samen onder urls */
];

// Set EJS as the template engine and specify the views directory
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static("public"));

app.get("/", async function (request, response) {
  /* Alle endpoints voeg ik samen in een variabele hier mee kan ik ze makkelijk alle data meegeven aan de response. */

  const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));

  /* Promis.all wacht op data pers stuk, eerst data1, data2 etc. */

  const data = { data1, data2, data3, data4, data5 };

  /* Hier geef ik een variabele aan die ik kan gebruiken tijdens het renderen van mijn pagina. */

  response.render("index", data);
});

app.get("/newPlayer", async function (request, response) {
  const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
  const data = { data1, data2, data3, data4, data5 };
  response.render("form", data);
});

app.post("/form", (request, response) => {
  request.body.answers = [
    {
      content: request.body.content,
      questionId: request.body.question,
    },
    /* Met request.body stuur je geparced json data naar de endpoint, in dit geval naar Posturl */
  ];
  postJson(postUrl, request.body).then((data) => {
    if (data.success) {
      response.redirect("/?memberPosted=true");
    }
    response.redirect("/");
  });
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
}

export async function postJson(url, body) {
  return await fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .catch((error) => error);
}
