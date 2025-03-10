import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Cho phép nhận dữ liệu JSON trong request body

// Routes
app.use('/api/products', productRoutes);

// Serve frontend nếu ở chế độ production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Middleware xử lý lỗi chung
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Khởi động server sau khi kết nối database
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Dừng server nếu không kết nối được DB
  }
};

// Gọi hàm khởi động server
startServer();
