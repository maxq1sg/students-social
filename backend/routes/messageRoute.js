import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  const httpServer = require("http").createServer(app);
  const options = {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  };
  const io = require("socket.io")(httpServer, options);

  io.on("connection", async (socket) => {
      console.log("websocket connection")
  });
});

export default router;
