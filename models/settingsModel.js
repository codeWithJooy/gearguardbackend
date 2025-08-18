const mongoose=require("mongoose")


const settingsSchema = new mongoose.Schema({
  websiteName: { type: String,default:'' },
  logo: { type: String, default: '' },
  address: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  facebook: { type: String, default: '' },
  twitter: { type: String, default: '' },
  instagram: { type: String, default: '' },
  linkedin: { type: String, default: '' }
});

// Create or update settings
settingsSchema.statics.updateSettings = async function(data) {
  let settings = await this.findOne();
  if (!settings) {
    settings = new this(data);
  } else {
    Object.assign(settings, data);
  }
  return settings.save();
};

// Get settings
settingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

const Settings = mongoose.model('Settings', settingsSchema);

module.exports=Settings