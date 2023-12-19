import { v2 as cloudinary, v2 } from 'cloudinary';
import fs from "fs"
import attendanceModel from "../Model/attendanceSchema.js"
import userModel from '../Model/userSchema.js';

const uploadImg = (req, res) => {
  const path = req.files[0].path;

  if (!path) {
    res.status(400).json({
      status: false,
      message: "file are empty!",
      data: null
    })
    return
  }
  v2.uploader.upload(path, (error, data) => {

    if (error) {
      res.status(500).json({
        status: false,
        message: "Could not upload image to cloud , try again",
        data: null
      });
      return
    }
    res.status(200).json({
      status: true,
      message: "image upload",
      data,
    });
    ///delete file
    fs.unlinkSync(path);
  });
}



const checkIn = async (req, res) => {
  try {
    // const { studentId, courseName, rollNo, picture ,name } = req.body;
    const { studentId } = req.body;

    if (!studentId || !courseName || !rollNo ||  !picture  || !name) {
      res.status(400).json({ message: 'required data missing' });
      return;
    }

    const exist = await userModel.findById(studentId)


    if (!exist) {
      res.status(400).json({ message: 'Invalid Student ID' });
      return;
    }

    const todayStart = new Date().setHours(0, 0, 0, 0);
    const todayEnd = new Date().setHours(23, 59, 59, 999);

    const existingAttendance = await attendanceModel.findOne({
      student_id: studentId,
      course_name: courseName,
      'attendance.date': {
        $gte: todayStart,
        $lt: todayEnd
      }
    });

    if (existingAttendance) {
      res.status(400).json({ message: 'Student already checked in today' });
      return;
    }

    const result = await attendanceModel.create({
      student_id: studentId,
      course_name: courseName,
      roll_no: rollNo,
      picture,
      name,
      attendance: [{ date: new Date() }]
    });

    if (result) {
      res.status(200).json({ message: 'Attendance recorded successfully' });
    } else {
      res.status(500).json({ message: 'Unable to record attendance' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Unable to record attendance' });
  }
};



const handleCheckOut = async (req, res) => {
  try {
    const { studentId } = req.body;

    // Perform necessary operations for check-out (update the database, etc.)
    // ...

    res.status(200).json({ message: 'Check-out successful' });
  } catch (error) {
    console.error('Error in handleCheckOut:', error);
    res.status(500).json({ message: 'Unable to process check-out' });
  }
};

const getAttendence = async (req, res) => {
  try {

    const data = await attendanceModel.find({})
    if(!data){
      return res.status(400).json({
        status : false,
        data ,
        message : "data not exists"
      })
    }
    res.status(200).json({
      status : true,
      data ,
      message : "get all attendence user"
    })
  } catch (error) {
    res.status(500).json({
      status : false,
      data : [],
      message : error.message
    })
  }
}


export {
  uploadImg,
  checkIn,
  getAttendence,
  handleCheckOut
}