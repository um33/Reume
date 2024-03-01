const express = require("express");
const { format } = require("date-fns");
const path = require("path");
const app = express();

const resume = require("./public/resume.json");

resume.work.forEach((exp) => {
  exp.startDate = format(new Date(exp.startDate), "MMM yyyy");
  exp.endDate = format(new Date(exp.endDate), "MMM yyyy");
});

resume.education.forEach((edu) => {
  edu.startDate = format(new Date(edu.startDate), "MMM yyyy");
  edu.endDate = format(new Date(edu.endDate), "MMM yyyy");
});

resume.certificates.forEach((cert) => {
  cert.date = format(new Date(cert.date), "MMM do yyyy");
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_, res) => {
  res.render("index", resume);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
