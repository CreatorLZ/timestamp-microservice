// // api/index.js
// import express from "express";
// import cors from "cors";

// // Initialize a new express project
// const app = express();

// // Enable CORS for cross-origin requests
// app.use(cors({ optionsSuccessStatus: 200 }));

// // Serve static files (if needed in the future)
// app.use(express.static("public"));

// // First endpoint - Handle the date conversion logic
// app.get("/api/:date?", (req, res) => {
//   const { date } = req.params;
//   let result;

//   if (!date) {
//     // No date provided, use the current date
//     result = new Date();
//     console.log("checking");
//   } else {
//     // Check if the provided date is a valid number (timestamp) or date string
//     result = isNaN(date) ? new Date(date) : new Date(parseInt(date));
//   }

//   // Handle invalid dates
//   if (result.toString() === "Invalid Date") {
//     return res.json({
//       error: "Invalid Date",
//     });
//   }

//   // Return the Unix and UTC time
//   res.json({
//     unix: result.getTime(),
//     utc: result.toUTCString(),
//   });
// });

// // Export the app as a Vercel serverless function

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`server running on ${PORT}`);
// });
// export default app;
// // export default app;

// import express from "express";
// import cors from "cors";

// // Initialize a new express project
// const app = express();

// // Enable CORS for cross-origin requests
// app.use(cors({ optionsSuccessStatus: 200 }));

// // Serve static files (if needed in the future)
// app.use(express.static("public"));

// // Root endpoint
// app.get("/", (req, res) => {
//   res.json({
//     message: "Timestamp Microservice API",
//     endpoints: [
//       {
//         path: "/api/:date?",
//         description: "Get Unix timestamp and UTC string for a given date",
//       },
//     ],
//   });
// });

// // Timestamp endpoint
// app.get("/api/:date?", (req, res) => {
//   const { date } = req.params;
//   let result;

//   if (!date) {
//     // No date provided, use the current date
//     result = new Date();
//   } else {
//     // Check if the provided date is a valid number (timestamp) or date string
//     result = isNaN(date) ? new Date(date) : new Date(parseInt(date));
//   }

//   // Handle invalid dates
//   if (result.toString() === "Invalid Date") {
//     return res.json({
//       error: "Invalid Date",
//     });
//   }

//   // Return the Unix and UTC time
//   res.json({
//     unix: result.getTime(),
//     utc: result.toUTCString(),
//   });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// export default app;

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

// Enable CORS for cross-origin requests
app.use(cors({ optionsSuccessStatus: 200 }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app.use(express.static("public"));
// Only serve static files in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from the root directory
  app.use(express.static(path.join(__dirname, "../..")));

  // Serve the index.html from root directory for any unknown routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../index.html"));
  });
}

// Helper function to validate and process date
function getDateResult(dateString) {
  let date;

  if (!dateString) {
    // If no date provided, use current time
    date = new Date();
  } else if (/^\d+$/.test(dateString)) {
    // If dateString is a number (unix timestamp), convert to integer
    date = new Date(parseInt(dateString));
  } else {
    // Try parsing as a date string
    date = new Date(dateString);
  }

  // Check if date is valid
  if (date.toString() === "Invalid Date") {
    return { error: "Invalid Date" };
  }

  // Return formatted result
  return {
    unix: date.getTime(),
    utc: date.toUTCString(),
  };
}

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Timestamp Microservice API",
    endpoints: [
      {
        path: "/api/:date?",
        description: "Get Unix timestamp and UTC string for a given date",
      },
    ],
  });
});

// API endpoint
app.get("/api/:date?", (req, res) => {
  const dateString = req.params.date;
  const result = getDateResult(dateString);
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
