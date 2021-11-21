module.exports = app => {
  const shibawatch = require("../controllers/shibawatch.controller.js");
  app.post("/api/list", shibawatch.list);
  app.post("/api/signup", shibawatch.signUp);
  app.post("/api/login", shibawatch.logIn);
  app.post("/api/create_token", shibawatch.createToken);
  app.get("/api/download/:id", shibawatch.downloadFile);
};
