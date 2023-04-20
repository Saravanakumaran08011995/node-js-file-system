//? Thirty Party Packages..
const express = require("express");
const cors = require("cors");
const fs = require("fs");
// ---------------------
const app = express();
app.use(express.json());

// ---------------------
//? PORT_NO...
const PORT = process.env.PORT || 8000;

// ---------------------
//? Middleware...
app.use(
  cors({
    origin: "http://localhost:8000",
  })
);
// ---------------------

//? Testing API endpoint..
app.get("/", (req, res) => {
  res.send("Welcome!");
});
// ---------------------

//? API endpoint to create a new Folder...
app.post("/Create-Folder", async (req, res) => {
  try {
    fs.mkdir("./File_System", function (err) {
      if (err) {
        // console.log("Failed to Create Folder");
        res.status(500).json({ error: err });
      }
    });
    res.status(200).json({ message: "File_System Folder created" });
  } catch (error) {
    console.log(error);
  }
});
// ---------------------

//? 1) API endpoint to create a Text File in a particular folder.
app.post("/Create-File", (req, res) => {
  // ---------------------
  const Get_Date = new Date();
  const Current_Date = Get_Date.getDate();
  //? Month will be generated from 0 so add 1
  const Month = Get_Date.getMonth() + 1;
  const Year = Get_Date.getFullYear();
  const Time = Get_Date.getTime();
  // ---------------------
  //? FileName - CurrentDate and Time...
  const FileName = `${Current_Date}-${Month}-${Year}-${Time}`;
  // ---------------------
  //? Timestamp...
  const TimeStamp = new Date().toISOString();
  // ---------------------
  fs.writeFile(`./File_System/${FileName}.txt`, TimeStamp, (err) => {
    if (err) {
      // console.log(err);
      return res.status(500).json({ error: "Failed to create text file" });
    }
    // console.log(`Text file ${FileName} created successfully`);
    return res.status(200).json({ message: "Text file created successfully" });
  });
  // ---------------------
});
// ---------------------

//? 2) Write a API endpoint to retrieve the Text File in the specified Folder.
app.get("/Read-File", (req, res) => {
  fs.readdir("./File_System", (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
// ---------------------

app.listen(PORT, () => console.log("APP LISTENING ON :", PORT));
// ---------------------
