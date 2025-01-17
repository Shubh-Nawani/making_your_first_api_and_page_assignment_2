const express = require('express');
const app = express();

// Predefined HTTP status codes and their descriptions
const statusCodes = {
  200: "OK: The request has succeeded. The meaning of this status depends on the HTTP method used.",
  201: "Created: The request has been fulfilled and has resulted in a new resource being created.",
  204: "No Content: The server successfully processed the request but is not returning any content.",
  400: "Bad Request: The server cannot process the request due to client-side errors (e.g., malformed syntax).",
  401: "Unauthorized: Authentication is required and has failed or has not yet been provided.",
  403: "Forbidden: The server understands the request but refuses to authorize it.",
  404: "Not Found: The server has not found anything matching the request URI.",
  405: "Method Not Allowed: The request method is not supported for the resource.",
  429: "Too Many Requests: The user has sent too many requests in a given amount of time.",
  500: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.",
  502: "Bad Gateway: The server received an invalid response from an upstream server.",
  503: "Service Unavailable: The server is currently unavailable (overloaded or down for maintenance).",
  504: "Gateway Timeout: The server did not receive a timely response from the upstream server."
};

// GET endpoint for status info
app.get('/status-info', (req, res) => {
  const code = parseInt(req.query.code); // Get the status code from the query parameter

  if (isNaN(code)) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request: Please provide a valid HTTP status code as a query parameter."
    });
  }

  const message = statusCodes[code];

  if (message) {
    res.json({
      status: code,
      message: message
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "Not Found: The status code provided is not supported by this API."
    });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Status Code API is running on http://localhost:${PORT}`);
});
