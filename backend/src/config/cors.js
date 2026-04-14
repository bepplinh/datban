const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://shoppingcar.io.vn",
  "https://www.shoppingcar.io.vn",
  process.env.FRONTEND_URL,
].filter(Boolean);

// Add variants for each origin (with/without trailing slash)
const finalAllowedOrigins = [];
allowedOrigins.forEach((origin) => {
  const clean = origin.endsWith("/") ? origin.slice(0, -1) : origin;
  finalAllowedOrigins.push(clean);
  finalAllowedOrigins.push(`${clean}/`);
});

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || finalAllowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`🚫 CORS Blocked origin: ${origin}`);
      console.log(`✅ Allowed origins: ${finalAllowedOrigins.join(", ")}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
