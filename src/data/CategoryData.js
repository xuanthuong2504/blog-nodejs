let categories = [
  { id: 1, name: "Điện thoại",  description: "Các loại điện thoại thông minh" },
  { id: 2, name: "Laptop",      description: "Máy tính xách tay các loại"     },
  { id: 3, name: "Phụ kiện",    description: "Tai nghe, sạc, ốp lưng..."      },
];
 

let nextId = 4;
 
module.exports = { categories, getNextId: () => nextId++ };