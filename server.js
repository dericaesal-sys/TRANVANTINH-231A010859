const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// 1. Cấu hình Middleware
app.use(cors()); // Quan trọng: Cho phép Frontend gọi API
app.use(express.json());

// 2. Kết nối MongoDB
const MONGO_URI = 'mongodb+srv://admin:123456A@cluster0.kwijtry.mongodb.net/?appName=Cluster0';

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Đã kết nối MongoDB thành công!"))
    .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// 3. Định nghĩa Model Sản Phẩm (Phải khớp với file seed.js)
const ProductSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    oldPrice: Number,
    brand: String,
    category: String,
    subCategory: String,
    inStock: Boolean,
    imageUrl: String,
    isHot: Boolean,
    isNew: Boolean,
    description: String
});

const Product = mongoose.model('Product', ProductSchema);

// --- 4. CÁC API (Đường dẫn phục vụ Frontend) ---

// API 1: Lấy danh sách sản phẩm (Có lọc và tìm kiếm)
app.get('/api/products', async (req, res) => {
    try {
        const { brand, category, search, isHot } = req.query;
        let query = {};

        // Lọc theo Brand
        if (brand && brand !== 'All') {
            query.brand = brand;
        }
        
        // Lọc theo Category
        if (category) {
            query.category = category;
        }

        // Lọc sản phẩm Hot
        if (isHot === 'true') {
            query.isHot = true;
        }
        
        // Tìm kiếm (Theo tên)
        if (search) {
            query.name = { $regex: search, $options: 'i' }; // 'i' nghĩa là không phân biệt hoa thường
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// API 2: Lấy chi tiết 1 sản phẩm theo ID (Cho trang chi tiết)
app.get('/api/products/:id', async (req, res) => {
    try {
        // Tìm theo _id của Mongo hoặc id tự đặt
        let product = await Product.findById(req.params.id);
        if (!product) {
             product = await Product.findOne({ id: req.params.id });
        }
        
        if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// API 3: Tạo đơn hàng (Cho trang thanh toán)
app.post('/api/orders', (req, res) => {
    console.log("Đơn hàng mới:", req.body);
    // Tạm thời trả về thành công, sau này sẽ lưu vào DB
    res.json({ success: true, message: "Đã nhận đơn hàng" });
});

// 5. Khởi động Server
app.listen(PORT, () => {
    console.log(`🚀 Server Full-tính-năng đang chạy tại: http://localhost:${PORT}`);
});