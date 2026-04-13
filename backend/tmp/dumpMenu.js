import http from "http";

http
  .get("http://localhost:3000/api/menu", (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      console.log(JSON.stringify(JSON.parse(data), null, 2));
    });
  })
  .on("error", (err) => {
    console.error("Error: " + err.message);
  });
