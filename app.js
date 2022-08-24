const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();

router.get("/test/jobs", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.use(express.static(__dirname + "/build/"));

app.use("/", router);
app.listen(process.env.port || 3000);

console.log("Server started");
