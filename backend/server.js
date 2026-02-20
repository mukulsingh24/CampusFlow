const express = require('express');
const prisma = require('./prisma/db');
const app = express();

app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    res.json({ status: "OK", users: userCount });
  } catch (err) {
    res.status(500).json({ status: "Error", message: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));