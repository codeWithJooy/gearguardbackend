const express=require("express")
const router = express.Router();
const settingsController=require("../../controller/settingsController/settingsController")
const upload = require('../../config/multerConfig');

router.get('/all', settingsController.getSettings);
router.get("/links",settingsController.getLinks)
router.post('/', upload.single('logo'), settingsController.updateSettings);

module.exports=router