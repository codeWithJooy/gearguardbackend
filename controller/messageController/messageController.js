const Contact = require("../../models/messageModel"); // Adjust path to your schema file

// @desc    Create new contact message
// @route   POST /api/contacts
const createMessage = async (req, res) => {
  try {
    const {
      first,
      last,
      phone,
      email,
      message,
      lookingFor,
      buyingFor,
      who,
      frequency,
    } = req.body;

    const newContact = await Contact.create({
      first,
      last,
      phone,
      email,
      message,
      lookingFor,
      buyingFor,
      who,
      frequency,
    });

    res.status(201).json({
      code: 200,
      data: newContact,
      message: "Messag Submitted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contacts
const getMessages = async (req, res) => {
  try {
    const { status } = req.query;
    console.log(status)
    let query = {};
    if (status && status !== "all") {
      query.status = status;
    }
   
    const contacts = await Contact.find(query).sort({ date: -1 }); // Newest first

    res.status(200).json({
      code: 200,
      count: contacts.length,
      data: contacts,
      message: "Messages Fetched Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get single contact message
// @route   GET /api/contacts/:id
const getMessage = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: "Message not found",
      });
    }

    res.status(200).json({
      code: 200,
      data: contact,
      message: "Message Fetched",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Update contact status
// @route   PATCH /api/contacts/:id
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    console.log(status)
    if (!status || !["unread", "contacted", "archived"].includes(status)) {
      return res.status(400).json({
        code: 400,
        success: false,
        error: "Invalid status value",
      });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status:status ,responseDate:Date.now()},
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        code: 404,
        success: false,
        error: "Message not found",
      });
    }

    res.status(200).json({
      code: 200,
      message: "Message Updated",
      data: updatedContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createMessage,
  getMessages,
  getMessage,
  updateStatus,
};
