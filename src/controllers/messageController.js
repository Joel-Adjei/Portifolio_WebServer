import { validationResult } from "express-validator";
import Message from "../models/Message.js";

const sendMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { firstName, lastName, email, subject, message } = req.body;

  const newMessage = await Message.create({
    firstName,
    lastName,
    email,
    subject,
    message,
  });

  res.status(201).json({ message: newMessage });
};

const getAllMessages = async (_req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json({ messages });
};

const markAsRead = async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) return res.status(404).json({ message: "Message not found" });

  message.read = true;
  await message.save();
  res.json({ message });
};

const deleteMessage = async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) return res.status(404).json({ message: "Message not found" });

  await message.deleteOne();
  res.json({ message: "Message deleted successfully" });
};

export { sendMessage, getAllMessages, markAsRead, deleteMessage };
