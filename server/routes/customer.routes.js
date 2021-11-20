module.exports = app => {
  const laserhelp = require("../controllers/laserhelp.controller.js");

  app.post("/api/signup", laserhelp.signUp);
  app.post("/api/login", laserhelp.logIn);
  app.post("/api/submit_question", laserhelp.Request);
  app.get("/api/fetch_response", laserhelp.fetchResponse);
  app.get("/api/download/:id", laserhelp.downloadFile);
  app.post("/api/submitResponse", laserhelp.submitResponse);
  app.get("/api/user/:id", laserhelp.getUser);
};
