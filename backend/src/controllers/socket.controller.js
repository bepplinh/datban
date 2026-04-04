import { socketService } from "../services/socket.service.js";

const socketController = {
  sendNotification: async (req, res) => {
    const { message } = req.body;
    socketService.emitToRoom("staff-room", "new-notification", message);
    res.status(200).json({ message: "Notification sent successfully" });
  },
};

export default socketController;
