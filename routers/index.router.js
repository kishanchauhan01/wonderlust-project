import { Router } from "express";
const router = Router();

router.route("/").get((req, res) => {
  res.send("Hi, I am root");
});

export default router;
