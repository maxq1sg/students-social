import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import connectDB from "./DBConfig.js";

import loginRoute from "./routes/userLoginRouter.js";
import registerRoute from "./routes/userRegisterRoute.js";
import groupecreateRoute from "./routes/gropucreate.js";
import scheduleRoute from "./routes/schedule/sheduleRoute.js";
import groupsRoute from "./routes/groupsRoute.js";
import courseRoute from "./routes/courseRoute.js";
import usersRoute from "./routes/usersRoute.js";
import messageRoute from "./routes/messageRoute.js";
import clearRoute from "./routes/clearCourses.js";
import searchRoute from "./routes/search/searchRoute.js";
import testRoute from "./routes/testRoute.js";
import friendsRoute from "./routes/friendsRoute.js";

const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/createGroup", groupecreateRoute);
app.use("/api/schedule", scheduleRoute);
app.use("/api/groups", groupsRoute);
app.use("/api/courses", courseRoute);
app.use("/api/users", usersRoute);
app.use("/api/messages", messageRoute);
app.use("/api/clear", clearRoute);
app.use("/api/search", searchRoute);
app.use("/api/test", testRoute);
app.use("/api/friends", friendsRoute);

app.listen(3001, () => {
  console.log("server is running");
});

const httpServer = http.createServer();
const options = {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
};
const io = new Server(httpServer, options);

io.on("connection", async (socket) => {
  console.log("connected");
});
io.on("disc", () => {
  console.log("disconnected!");
});
httpServer.listen(3002, () => {
  console.log(" socket server is running");
});
