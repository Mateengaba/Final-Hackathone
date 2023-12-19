import mongoose from "mongoose";
import userModel from "../Model/userSchema.js";

const getAllUser = async (req, res) => {
    try {
      const allUser = await userModel.find({isAdmin: false});
      res.status(200).json({
        status: true,
        message: "get all user successfully",
        data: allUser,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  };

  const getSingleUser = async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
          status: false,
          message: "Invalid user ID",
          data: null
        });
      }
  
      const data = await userModel.findById(id);
  
      if (!data) {
        return res.status(404).json({
          status: false,
          message: "user not found",
          data: null
        });
      }
  
      res.status(200).json({
        status: true,
        message: "user found",
        data
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: err.message,
        data: null
      });
    }
  };

  export {
    getAllUser,
    getSingleUser
  }