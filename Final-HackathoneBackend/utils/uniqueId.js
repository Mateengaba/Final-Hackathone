import userModel from "../Model/userSchema.js";

async function generateUniqueRandomId(length) {
  const characters = '0123456789';
  let result = '';

  let existingDocument;
  do {
    result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    // Check if the generated ID already exists in the collection
    existingDocument = await userModel.findOne({ roll_no: result });
    // Repeat generation if the ID already exists
  } while (existingDocument);

  return result;
}

export default generateUniqueRandomId;
