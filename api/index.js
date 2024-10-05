// api/index.js
import express from "express";
import cors from "cors";

// Initialize a new express project
const app = express();

// Enable CORS for cross-origin requests
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files (if needed in the future)
app.use(express.static("public"));

// First endpoint - Handle the date conversion logic
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;
  let result;

  if (!date) {
    // No date provided, use the current date
    result = new Date();
  } else {
    // Check if the provided date is a valid number (timestamp) or date string
    result = isNaN(date) ? new Date(date) : new Date(parseInt(date));
  }

  // Handle invalid dates
  if (result.toString() === "Invalid Date") {
    return res.json({
      error: "Invalid Date",
    });
  }

  // Return the Unix and UTC time
  res.json({
    unix: result.getTime(),
    utc: result.toUTCString(),
  });
});

// Export the app as a Vercel serverless function
export default app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
// export default app;
