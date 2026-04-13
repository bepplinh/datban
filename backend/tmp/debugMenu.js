import http from "http";

http
  .get("http://localhost:3000/api/menu", (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      const json = JSON.parse(data);
      if (json.data) {
        json.data.forEach((cat) => {
          console.log(`- ${cat.name}: ${cat.products?.length || 0} products`);
        });
      } else {
        console.log("No data field in response");
      }
    });
  })
  .on("error", (err) => {
    console.error("Error: " + err.message);
  });
