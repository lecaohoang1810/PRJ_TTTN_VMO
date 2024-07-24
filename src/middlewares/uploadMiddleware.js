const multer = require('multer');
const path = require('path');

// Cấu hình lưu trữ file cho Category
const categoryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '');
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname.replace(/\s+/g, '-'); // Thay khoảng trắng bằng dấu gạch ngang
    cb(null, originalName);
  }
});

// Cấu hình lưu trữ file cho Item
const itemStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'thumbnail') {
      cb(null, '');
    } else if (file.fieldname === 'details') {
      cb(null, '');
    } else {
      cb(new Error('Invalid fieldname for file upload'), false);
    }
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname.replace(/\s+/g, '-'); // Thay khoảng trắng bằng dấu gạch ngang
    cb(null, originalName);
  }
});

// Kiểm tra loại file
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

// Khởi tạo upload middleware cho Category
const categoryUpload = multer({
  storage: categoryStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Giới hạn kích thước file là 5MB
}).single('banner'); // single('banner') chỉ ra rằng chỉ có 1 file được upload với fieldname là 'banner'

// Khởi tạo upload middleware cho Item
const itemUpload = multer({
  storage: itemStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Giới hạn kích thước file là 5MB
}).fields([
  { name: 'thumbnail', maxCount: 1 }, // 'thumbnail' là fieldname của ảnh chính, tối đa 1 ảnh
  { name: 'details', maxCount: 5 }    // 'details' là fieldname của các ảnh chi tiết, tối đa 5 ảnh
]);

module.exports = { categoryUpload, itemUpload };
