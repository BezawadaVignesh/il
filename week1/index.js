const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const url = require("url");

function addParmTo(parms, parm) {
  if(parms != '') {
    parms += '&'
  }
  return parms + parm
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;
  if (pathName === "/") {
    // Serve the HTML page
    fs.readFile(path.join(__dirname, "index.html"), (err, content) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  } else if (pathName == "/main.css") {
    // Serve the CSS page
    fs.readFile(path.join(__dirname, "main.css"), (err, content) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(content);
      }
    });
  } else if (pathName.startsWith("/game/")) {
    const slug = pathName.split("/game/")[1];
    if (slug) {
      try {
        const response = await fetch(
          `https://www.freetogame.com/api/game?id=${slug}`
        );
        const data = await response.text();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Failed to fetch data");
      }
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Bad Request: Slug not provided");
    }
  } else if (pathName === "/game") {
    const {platform, category, sort_by } = parsedUrl.query;
    try {
      parms = ''
      if(platform != undefined) parms = addParmTo(parms, `platform=${platform}`)
      if(category != undefined) parms = addParmTo(parms, `category=${category}`)
      if(sort_by != undefined) parms = addParmTo(parms, `sort_by=${sort_by}`)
      const response = await fetch(
        "https://www.freetogame.com/api/games?" + parms
      );
      const data = await response.text();
      // const data = `[{"id":345,"title":"Forge of Empires","thumbnail":"https:\/\/www.freetogame.com\/g\/345\/thumbnail.jpg","short_description":"A free to play 2D browser-based online strategy game, become the leader and raise your city.","game_url":"https:\/\/www.freetogame.com\/open\/forge-of-empires","genre":"Strategy","platform":"Web Browser","publisher":"InnoGames","developer":"InnoGames","release_date":"2012-04-17","freetogame_profile_url":"https:\/\/www.freetogame.com\/forge-of-empires"},{"id":340,"title":"Game Of Thrones Winter Is Coming","thumbnail":"https:\/\/www.freetogame.com\/g\/340\/thumbnail.jpg","short_description":"A free-to-play browser-based RTS based on the George R.R. Martin novels and popular HBO series.","game_url":"https:\/\/www.freetogame.com\/open\/game-of-thrones-winter-is-coming","genre":"Strategy","platform":"Web Browser","publisher":"GTArcade","developer":"YOOZOO Games ","release_date":"2019-11-14","freetogame_profile_url":"https:\/\/www.freetogame.com\/game-of-thrones-winter-is-coming"}]`
      res.writeHead(response.status, { "Content-Type": "application/json" });
      res.end(data);
    } catch (error) {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Failed to fetch data");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// The server listens on port 3000
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
