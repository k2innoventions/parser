const express = require("express");
const mercury = require("@postlight/mercury-parser");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/parser", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send({ error: "Missing URL parameter" });

  try {
    const result = await mercury.parse(url);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || "Parse failed" });
  }
});

app.get("/", (req, res) => {
  res.send("Mercury Parser is running.");
});

app.listen(PORT, () => {
  console.log(`Mercury Parser listening on port ${PORT}`);
});
