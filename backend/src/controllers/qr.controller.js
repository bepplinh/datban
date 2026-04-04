import QRCode from "qrcode";
import tableRepo from "../repositories/table.repository.js";

export const generateQRCode = async (req, res) => {
  try {
    const { tableId } = req.query;

    if (!tableId) {
      return res.status(400).json({
        message: "tableId is required",
      });
    }

    const table = await tableRepo.findTableById(tableId);
    if (!table) {
      return res.status(404).json({
        message: "Table not found",
      });
    }

    const url = `http://localhost:3000/table/${tableId}?token=${table.token}`;

    // tạo QR dạng buffer (image)
    const qrBuffer = await QRCode.toBuffer(url);

    res.setHeader("Content-Type", "image/png");
    return res.send(qrBuffer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to generate QR",
    });
  }
};
