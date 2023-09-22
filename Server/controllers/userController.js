import UserModel from "../models/userModel.js";
import bcrypt, { genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";
//get users
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("user does not exist");
    }
  } catch (error) {
    res.status(200).json(error);
  }
};

// get all user

export const getAllUser = async (req,res)=>{
  try {
    let users = await UserModel.find()
    users = users.map((user)=>{
      const {password, ...otherDetails}=user._doc
      return otherDetails
    })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
}
//update user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentUserAdmin, password } = req.body;
  if (id === _id ) {
    try {
      if (password) {
        const satl = await bcrypt.genSalt(5);
        req.body.password = await bcrypt.hash(password, satl);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        {username: user.username, id:user._id},
        process.env.JWT_KEY,
        {expiresIn:"1h"}
      )
      res.status(200).json({user, token});
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("access denied you can update your own profile only");
  }
};

//delete user

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdmin } = req.body;
  if (id === currentUserId || currentUserAdmin) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("Deleted Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you can only delete your own id");
  }
};

//follow user

export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  if (_id === id) {
    res.status(403).json("forbidden ! cannot follow yourself");
  } else {
    try {
      const followTheUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);
      if (!followTheUser.followers.includes(_id)) {
        await followTheUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("Followed !");
      }
      else{
        res.status(403).json("user is already followed by you")
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};


//unfollow user

export const unFollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  if (_id === id) {
    res.status(403).json("forbidden ! cannot follow yourself");
  } else {
    try {
      const followTheUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);
      if (followTheUser.followers.includes(_id)) {
        await followTheUser.updateOne({ $pull: { followers: _id } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("Unfollowed !");
      }
      else{
        res.status(403).json("user is already unfollowed by you")
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
