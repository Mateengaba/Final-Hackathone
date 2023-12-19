import Express from "express";
import { createUser, userLogin } from "../Controller/authController.js";
import {checkIn, getAttendence, handleCheckOut, uploadImg} from "../Controller/postController.js"
import authMiddleware from "../Middlewares/index.js";
import upload from "../utils/multer.js";
import { getAllUser, getSingleUser } from "../Controller/userController.js";
const router = Express.Router();

// createUser//
router.post("/api/v1/createuser",[authMiddleware], createUser);

// login//
router.post("/api/v1/userlogin", userLogin);

// getSingleUser
router.get("/api/v1/getuser", [authMiddleware], getSingleUser);

// getAllUsers
router.get("/api/v1/users", [authMiddleware], getAllUser);

// getAllUsers
router.get("/api/v1/attendance",  getAttendence);

// getAllUsers
router.post("/api/v1/checkin",[authMiddleware], checkIn);

router.post("/api/v1/checkout", handleCheckOut);


// uploadImg
router.post("/api/v1/uploadimg", upload.any("image"), uploadImg);


// uploadImg//
router.post("/api/v1/uploadimage", upload.any("image"),uploadImg);






export default router;
