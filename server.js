import express from "express";
import cors from "cors";

//initialize a new express project

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by Freecodecamp

app.use(cors({ optionsSuccessStatus: 200 }));

//serve static files

app.use(express.static("public"));

//first endpoint

app.get("/api/:date?", (req, res) => {
  // res.json({server: "running"})
  const { date } = req.params;
  let result;
  if (!date) {
    result = new Date();
  } else {
    result = isNaN(date) ? new Date(date) : new Date(parseInt(date));
  }
  if (result.toString() === "Invalid Date") {
    res.json({
      error: "Invalid Date",
    });
  } else {
    res.json({
      unix: result.getTime(),
      utc: result.toUTCString(),
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
