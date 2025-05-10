const mongoose = require('mongoose');
const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  const { user1, user2 } = req.query;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(user1) || !mongoose.Types.ObjectId.isValid(user2)) {
    return res.status(400).json({ error: 'Invalid user ID(s)' });
  }

  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.sendMessage = async (req, res) => {
  const { sender, receiver, content } = req.body;

  try {
    const message = new Message({
      sender,
      receiver,
      content,
    });

    await message.save();
    res.status(201).json(message); // Return the saved message to the client
  } catch (error) {
    res.status(500).json({ msg: 'Failed to send message', error: error.message });
  }
};
