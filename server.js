const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const connectDb = require("./config/ConnectDb");
const User = require("./model/user");
const { findByIdAndUpdate } = require("./model/user");
const app = express();
connectDb();
app.use(express.json());
app.post("/add", async (req, res) => {
  const { name, email, number } = req.body;
  try {
    const newUser = new User({
      name,
      email,
      number,
    });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log(error.message);
  }
});

//get Data

app.get("/get", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error.message);
  }
});
//get one User
app.get("/monji/get/:id", async (req, res) => {
  try {
    const theUser = await User.findById(req.params.id);
    res.send(theUser);
  } catch (error) {
    console.log(error.message);
  }
});

//delete user
app.delete("/user/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.send("user is gone");
  } catch (error) {}
});
// edit user
app.put("/user/edit/:id",async(req,res)=>{
    try {
        const editedUser=await User.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
        res.send(editedUser)
    } catch (error) {
    console.log(error.message);
        
    }
})
const PORT = process.env.PORT || 6000;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server is runing on PORT ${PORT}`)
);
