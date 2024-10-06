const express = require("express");
const {EmailAlreadyExistsError} = require("")

const registerUser = async (req, res) => {
    //Request Body Variables
  const { fname, lname, email, password, phone } = req.body;
  //Service Call
  const newUser = await 
};
