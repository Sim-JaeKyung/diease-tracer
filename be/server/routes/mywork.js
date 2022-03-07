const express = require("express");
const db = require("../database/pool");
const router = express.Router();

router.post("/loadWorkList", async (req, res) => {
  if (req.session.userData.role === "관리자") {
    const data = await db.query(`select * from patient;`);
    res.json(data);
  }
});

module.exports = router;
