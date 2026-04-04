import express from "express"
import { generateQRCode } from "../controllers/qr.controller.js"

const qrRouter = express.Router()

qrRouter.get("/qr", generateQRCode)

export default qrRouter