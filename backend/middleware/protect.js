import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function protect(req, res, next) {
  const authToken = req.headers.auth;
  let token;
  if (authToken && authToken.startsWith("Bearer")) {
    try {
      token = authToken.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      res.status(500).json({ message: "Вы не авторизованы!" });
    }
  }
}
