const baseFrontendUrl = process.env.FRONTEND_URL;
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://shoppingcar.io.vn",
  "https://www.shoppingcar.io.vn",
  baseFrontendUrl,
  baseFrontendUrl?.endsWith("/")
    ? baseFrontendUrl.slice(0, -1)
    : `${baseFrontendUrl}/`,
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Check if origin is allowed or if it's a non-browser request (no origin)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
