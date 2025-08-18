const { response } = require("express");
const Settings=require("../../models/settingsModel.js")
const {uploadFileToS3}=require("../../utils/awsUtil.js")

const getSettings = async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    res.json({code:200,data:settings});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings', error });
  }
};

const getLinks=async(req,res)=>{
   try{
     const settings=await Settings.getSettings();
     const data={
      "facebook":settings.facebook,
      "linkedin":settings.linkedin
     }
     return res.json({code:200,data})
   }catch(error){
     return res.status(500).json({code:500,message:error.message})
   }
}

const updateSettings = async (req, res) => {
  try {
    let logoUrl = req.body.existingLogo;
    
    // Handle file upload if new logo is provided
    if (req.file) {
      console.log("Present")
      logoUrl = await uploadFileToS3(req.file);
    }

    const settingsData = {
      websiteName: req.body.websiteName,
      logo: logoUrl,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      facebook:req.body.facebook,
      twitter:req.body.twitter,
      instagram:req.body.instagram,
      linkedin:req.body.linkedin,
    };

    const updatedSettings = await Settings.updateSettings(settingsData);
    res.json({
      message: 'Settings updated successfully',
      settings: updatedSettings
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating settings', error:error.message });

  }
};

module.exports={
getSettings,
getLinks,
updateSettings
}