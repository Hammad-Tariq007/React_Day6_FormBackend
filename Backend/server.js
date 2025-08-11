import express from "express";
import cors from "cors";

const app = express();

// Enable CORS so frontend (different port) can talk to backend
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// POST /login route
app.post("/login", (req, res) => {
  const { firstName, lastName, password } = req.body;

  console.log("Received data from frontend:", req.body);

  // Simple validation logic
  if (firstName === "admin" && password === "123456") {
    return res.json({ success: true, message: "Login successful!" });
  }

  return res.status(400).json({
    success: false,
    message: "Invalid credentials, please try again."
  });
});

// Start server
app.listen(5000, () => console.log("✅ Backend running on port 5000"));
