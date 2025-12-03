const mongoose = require('mongoose');

// 1. Kết nối MongoDB
mongoose.connect('mongodb+srv://admin:123456A@cluster0.kwijtry.mongodb.net/?appName=Cluster0')
    .then(() => console.log("✅ Đã kết nối DB để nạp dữ liệu"))
    .catch(err => console.log(err));

// 2. Định nghĩa Schema
const ProductSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    oldPrice: Number,
    brand: String,
    category: String, // Ví dụ: LinhKien, DayCap, Sale, Freeship...
    subCategory: String,
    inStock: Boolean,
    imageUrl: String,
    isHot: Boolean, // Sản phẩm nổi bật
    isNew: Boolean,
    description: String
});

const Product = mongoose.model('Product', ProductSchema);

// 3. DANH SÁCH SẢN PHẨM TỔNG HỢP (ALL IN ONE)
const products = [
    // ============================================================
    // PHẦN 1: DỮ LIỆU TỪ TRANG GROUP (Linh kiện chi tiết)
    // ============================================================
    { id: 'cable-usb', name: 'Dây cáp bọc lưới 4 dây đầu USB type C', price: 35000, oldPrice: 40000, category: 'DayCap', inStock: true, imageUrl: 'https://lucas.vn/wp-content/uploads/2024/11/Cap-Satechi-USB4-Cap-nguon-100W-Truyen-Du-Lieu-40Gbps-Dai-25cm-ST-U4C25M-3-1.png', isHot: true, isNew: true },
    { id: 'solder-tool', name: 'Mạch LED 7 đoạn 2 số 0.5inch 74HC595', price: 39000, category: 'DungCu', inStock: true, imageUrl: 'https://file.linhkienx.com/upload/medium/58323.jpg?1760022819717', isNew: true },
    { id: 'servo-cable', name: 'Dây Cáp Nối Dài Cho Động Cơ Servo 15cm', price: 32000, category: 'DayCap', inStock: true, imageUrl: 'https://bizweb.dktcdn.net/100/045/105/products/day-cap-noi-dai-cho-dong-co-servo-15-20-30-50cm-c.jpg?v=1703411269907' },
    { id: 'poten-10k', name: 'Biến trở tam giác RM065 50K', price: 11000, category: 'LinhKien', subCategory: 'DienTro', inStock: true, imageUrl: 'https://product.hstatic.net/200000551749/product/rm065_100r_3478bf853c19488c9eed935c566d0fd6_grande.jpg' },
    { id: 'button-blue', name: 'Nút nguồn kim loại có đèn 16mm (Xanh)', price: 42000, oldPrice: 68000, category: 'LinhKien', subCategory: 'NutNhan', inStock: true, imageUrl: 'https://dientunguyenhien.vn/public/images/nut_nguon_16mm_co_den_tu_giu_2.jpg', isHot: true },
    { id: 'arduino-uno', name: 'Board mạch Arduino Uno R3', price: 125000, category: 'Arduino', inStock: true, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg', isHot: true },
    { id: 'temp-sensor', name: 'Cảm Biến Nhiệt Độ DHT11', price: 18000, oldPrice: 25000, category: 'CamBien', inStock: false, imageUrl: 'https://nshopvn.com/wp-content/uploads/2019/03/anh-dai-dienmodule-cam-bien-do-am-nhiet-do-dht11-uij3-1.jpg' },
    { id: 'dc-motor', name: 'Mạch điều khiển động cơ DC 5A', price: 22000, category: 'DongCo', inStock: true, imageUrl: 'https://nshopvn.com/wp-content/uploads/2019/03/mach-dieu-khien-dong-co-dc-5a-rqcg-2-600x600.jpg' },
    { id: 'oled-display', name: 'Màn hình OLED 0.96inch I2C', price: 85000, category: 'Module', inStock: true, imageUrl: 'https://bizweb.dktcdn.net/thumb/grande/100/005/602/products/ef5ec63d-c388-4d91-8cf1-ed27e15d9dc0-1684483392723.png?v=1687370969540' },
    { id: 'soldering-iron', name: 'Máy Hàn Tay No.907 60W', price: 95000, oldPrice: 120000, category: 'DungCu', inStock: true, imageUrl: 'https://bizweb.dktcdn.net/thumb/grande/100/005/602/products/412f1116-391b-4844-b97e-976c10e9511f.jpg?v=1679481687130' },

    // ============================================================
    // PHẦN 2: DỮ LIỆU TỪ TRANG BRAND (Thương hiệu)
    // ============================================================
    // CADIVI
    { name: "Dây Cáp Điện Cadivi CV 1.5mm", price: 150000, brand: "Cadivi", category: "DayCap", inStock: true, imageUrl: "/_CyberCorePage/Product_Brand_Page/_image/content/anh1.jpg" },
    { name: "Cáp Đồng Cadivi VCM 2x1.0", price: 210000, brand: "Cadivi", category: "DayCap", inStock: true, imageUrl: "/_CyberCorePage/Product_Brand_Page/_image/content/anh2.jpg" },
    { name: "Dây Điện Đơn CV 2.5mm (100m)", price: 450000, brand: "Cadivi", category: "DayCap", inStock: false, imageUrl: "/_CyberCorePage/Product_Brand_Page/_image/content/anh4.jpg" },
    
    // ĐIỆN QUANG
    { name: "Bóng Đèn LED Trụ 15W Điện Quang", price: 45000, brand: "Điện Quang", category: "ThietBiDien", inStock: true, imageUrl: "/_CyberCorePage/Product_Brand_Page/_image/content/anh6.jpg" },
    { name: "Ổ Cắm Điện Chịu Nhiệt", price: 290000, brand: "Điện Quang", category: "ThietBiDien", inStock: false, imageUrl: "/_CyberCorePage/Product_Brand_Page/_image/content/anh7.jpg" },
    { name: "Bộ Chiếu Sáng Khẩn Cấp", price: 350000, brand: "Điện Quang", category: "ThietBiDien", inStock: true, imageUrl: "/_CyberCorePage/Product_Brand_Page/_image/content/anh9.jpg" },

    // MPE
    { name: "Aptomat Tự Động MPE 20A", price: 85000, brand: "MPE", category: "ThietBiDien", inStock: true, imageUrl: "/_CyberCorePage/Product_Brand_Page/_image/content/anh12.jpg" },
    { name: "Module LED Siêu Sáng", price: 150000, brand: "MPE", category: "Module", inStock: true, imageUrl: "/_CyberCorePage/Product_Brand_Page/_image/content/anh15.jpg" },

    // PRO'SKIT
    { name: "Kìm Cắt Linh Kiện Pro'sKit", price: 350000, brand: "Pro'sKit", category: "DungCu", inStock: true, imageUrl: "/_CyberCorePage/Product_Brand_Page/_image/content/anh16.jpg" },
    { name: "Kìm Tuốt Dây Đa Năng", price: 520000, brand: "Pro'sKit", category: "DungCu", inStock: false, imageUrl: "/_CyberCorePage/Product_Brand_Page/_image/content/anh19.jpg" },

    // RẠNG ĐÔNG
    { name: "Thiếc Chì Hàn Rạng Đông", price: 1200000, brand: "Rạng Đông", category: "VatLieuHan", inStock: true, imageUrl: "/_CyberCorePage/Product_Brand_Page/_image/content/anh23.jpg" },
    
    // SCHNEIDER
    { name: "Khởi Động Từ Schneider", price: 450000, brand: "Schneider Electric", category: "TuDongHoa", inStock: true, imageUrl: "/_CyberCorePage/Product_Brand_Page/_image/content/anh26.jpg" },
    { name: "Biến Tần Altivar ATV12", price: 3200000, brand: "Schneider Electric", category: "TuDongHoa", inStock: false, imageUrl: "/_CyberCorePage/Product_Brand_Page/_image/content/anh29.jpg" },

    // TEXAS INSTRUMENTS
    { name: "Vi Điều Khiển MSP430G2553", price: 45000, brand: "Texas Instruments", category: "ViDieuKhien", inStock: true, imageUrl: "/_CyberCorePage/Product_Brand_Page/_image/content/anh11.jpg" },
    { name: "Kit Phát Triển Tiva C Series", price: 850000, brand: "Texas Instruments", category: "KitPhatTrien", inStock: true, imageUrl: "/_CyberCorePage/Product_Brand_Page/_image/content/anh33.jpg" },

    // VINASEMI
    { name: "Transistor NPN C1815", price: 2000, brand: "VinASEMI", category: "LinhKien", inStock: true, imageUrl: "/_CyberCorePage/Product_Brand_Page/_image/content/anh16.jpg" },
    { name: "IC Ổn Áp 7805", price: 5000, brand: "VinASEMI", category: "IC", inStock: true, imageUrl: "/_CyberCorePage/Product_Brand_Page/_image/content/anh19.jpg" },

    // ============================================================
    // PHẦN 3: DỮ LIỆU TỪ TRANG CHỦ (Home Page - Sale & Freeship)
    // ============================================================
    // Tab SALE
    { name: "CD4511 - IC Giải Mã", price: 30000, oldPrice: 34000, category: "Sale", inStock: true, imageUrl: "/_image/content_1/sale_product/pic_1.jpg", isHot: true },
    { name: "YYNMOS-1 Module", price: 20000, oldPrice: 23000, category: "Sale", inStock: true, imageUrl: "/_image/content_1/sale_product/pic_2.jpg" },
    { name: "Grove LCD-1602", price: 100000, oldPrice: 113000, category: "Sale", inStock: true, imageUrl: "/_image/content_1/sale_product/pic_3.jpg" },
    { name: "Opto EL817", price: 30000, oldPrice: 39000, category: "Sale", inStock: true, imageUrl: "/_image/content_1/sale_product/pic_4.jpg" },
    { name: "Cảm biến APDS-9900", price: 45000, oldPrice: 55000, category: "Sale", inStock: true, imageUrl: "/_image/content_1/sale_product/pic_5.jpg" },
    { name: "Cảm biến RE200B", price: 7000, oldPrice: 13000, category: "Sale", inStock: true, imageUrl: "/_image/content_1/sale_product/pic_6.jpg" },
    
    // Tab FREESHIP
    { name: "Diode BAV99LT1G", price: 3000, oldPrice: 6000, category: "FreeShip", inStock: true, isHot: true, imageUrl: "/_image/content_1/freeship_product/pic_1.jpg" },
    { name: "Module E180-ZG120B-TB", price: 355000, oldPrice: 375000, category: "FreeShip", inStock: true, isHot: true, imageUrl: "/_image/content_1/freeship_product/pic_2.jpg" },
    { name: "Mạch Cầu H L298", price: 50000, oldPrice: 60000, category: "FreeShip", inStock: true, isHot: true, imageUrl: "/_image/content_1/freeship_product/pic_3.jpg" },
    { name: "Chip FT232", price: 110000, oldPrice: 125000, category: "FreeShip", inStock: true, isHot: true, imageUrl: "/_image/content_1/freeship_product/pic_4.jpg" },
    { name: "Mosfet Cấp Nhiệt", price: 65000, oldPrice: 79000, category: "FreeShip", inStock: true, isHot: true, imageUrl: "/_image/content_1/freeship_product/pic_5.jpg" },
    
    // Tab NỔI BẬT (Content 2)
    { name: "CD4066BM IC", price: 3000, category: "Hot", inStock: true, imageUrl: "/_image/content_2/product/product_1.jpg", isHot: true },
    { name: "KIT PIC 16F", price: 1300000, category: "Hot", inStock: true, imageUrl: "/_image/content_2/product/product_2.jpg", isHot: true },
    { name: "Nano Pi M1 Kit", price: 500000, category: "Hot", inStock: true, imageUrl: "/_image/content_2/product/product_3.jpg", isHot: true },
    { name: "Raspberry Pi 5", price: 1670000, category: "Hot", inStock: true, imageUrl: "/_image/content_2/product/product_8.jpg", isHot: true },
    { name: "ASUS Tinker Edge T", price: 4850000, category: "Hot", inStock: true, imageUrl: "/_image/content_2/product/product_11.jpg", isHot: true }
];

// 4. Hàm nạp dữ liệu
const seedDB = async () => {
    try {
        await Product.deleteMany({}); // Xóa sạch dữ liệu cũ
        console.log("🗑️  Đã xóa sạch dữ liệu cũ.");

        await Product.insertMany(products); // Thêm dữ liệu mới
        console.log(`🎉 Đã thêm thành công ${products.length} sản phẩm (từ Group, Brand, Home) vào Database!`);
    } catch (e) {
        console.log("❌ Lỗi nạp dữ liệu:", e);
    } finally {
        mongoose.connection.close(); // Đóng kết nối
    }
};

seedDB();