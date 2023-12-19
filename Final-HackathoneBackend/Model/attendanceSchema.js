import mongoose from "mongoose"

const attendanceSchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true
  },
  course_name: {
    type: String,
    required: true
  },
  roll_no: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  attendance: [
    {
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  created_on: {
    type: Date,
    default : Date.now
  }
});

const attendanceModel = mongoose.model('Attendance', attendanceSchema);

export default  attendanceModel;
