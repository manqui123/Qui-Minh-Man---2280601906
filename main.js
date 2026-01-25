// ===============================
// CÂU 1: Constructor Product
// ===============================
function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
}

// ===============================
// CÂU 2: Khởi tạo mảng products
// (ít nhất 5 sản phẩm, ≥ 2 danh mục)
// ===============================
function createProducts() {
    return [
        new Product(1, "iPhone 15", 1200, 10, "Electronics", true),
        new Product(2, "Laptop Dell", 1500, 5, "Electronics", true),
        new Product(3, "AirPods", 200, 0, "Accessories", true),
        new Product(4, "Charger", 25, 50, "Accessories", true),
        new Product(5, "Mouse", 30, 20, "Accessories", false)
    ];
}

// ===============================
// CÂU 3: Tạo mảng chỉ chứa name, price
// ===============================
function getNameAndPrice(products) {
    return products.map(p => ({
        name: p.name,
        price: p.price
    }));
}

// ===============================
// CÂU 4: Lọc sản phẩm còn hàng (quantity > 0)
// ===============================
function getInStockProducts(products) {
    return products.filter(p => p.quantity > 0);
}

// ===============================
// CÂU 5: Kiểm tra có ít nhất 1 SP giá > 30
// ===============================
function hasProductPriceAbove30(products) {
    return products.some(p => p.price > 30);
}

// ===============================
// CÂU 6: Kiểm tra tất cả Accessories có isAvailable = true
// ===============================
function checkAccessoriesAvailable(products) {
    return products
        .filter(p => p.category === "Accessories")
        .every(p => p.isAvailable === true);
}

// ===============================
// CÂU 7: Tính tổng giá trị kho
// price * quantity
// ===============================
function calculateTotalInventoryValue(products) {
    let total = 0;
    for (const p of products) {
        total += p.price * p.quantity;
    }
    return total;
}

// ===============================
// CÂU 8: for...of in ra
// Tên - Danh mục - Trạng thái
// ===============================
function printProductInfo(products) {
    for (const p of products) {
        console.log(
            p.name + " - " +
            p.category + " - " +
            (p.isAvailable ? "Đang bán" : "Ngừng bán")
        );
    }
}

// ===============================
// CÂU 9: for...in in tên thuộc tính & giá trị
// ===============================
function printProductProperties(product) {
    for (const key in product) {
        console.log("Thuộc tính:", key);
        console.log("Giá trị:", product[key]);
    }
}

// ===============================
// CÂU 10: Danh sách tên SP đang bán & còn hàng
// ===============================
function getSellingAndInStockProductNames(products) {
    return products
        .filter(p => p.isAvailable === true && p.quantity > 0)
        .map(p => p.name);
}


const products = createProducts();

console.log("Câu 3:", getNameAndPrice(products));
console.log("Câu 4:", getInStockProducts(products));
console.log("Câu 5:", hasProductPriceAbove30(products));
console.log("Câu 6:", checkAccessoriesAvailable(products));
console.log("Câu 7: Tổng giá trị kho =", calculateTotalInventoryValue(products));

console.log("Câu 8:");
printProductInfo(products);

console.log("Câu 9:");
printProductProperties(products[0]);

console.log("Câu 10:", getSellingAndInStockProductNames(products));
