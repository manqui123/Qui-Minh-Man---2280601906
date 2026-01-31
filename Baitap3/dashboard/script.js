const API = "https://api.escuelajs.co/api/v1/products";

let products = [];
let filtered = [];
let currentPage = 1;
let pageSize = 5;
let sortTitleAsc = true;
let sortPriceAsc = true;

/* ===== GET ALL ===== */
async function getAll() {
    const res = await fetch(API);
    products = await res.json();
    filtered = [...products];
    render();
}

getAll();

/* ===== RENDER ===== */
function render() {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageData = filtered.slice(start, end);

    pageData.forEach(p => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p.id}</td>
            <td><img src="${p.images[0]}" /></td>
            <td class="title-cell">
                ${p.title}
                <div class="desc">${p.description}</div>
            </td>
            <td>$${p.price}</td>
            <td>${p.category.name}</td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById("pageInfo").innerText =
        `Trang ${currentPage} / ${Math.ceil(filtered.length / pageSize)}`;
}

/* ===== SEARCH onChange ===== */
document.getElementById("search").addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    filtered = products.filter(p =>
        p.title.toLowerCase().includes(value)
    );
    currentPage = 1;
    render();
});

/* ===== PAGE SIZE ===== */
document.getElementById("pageSize").addEventListener("change", (e) => {
    pageSize = +e.target.value;
    currentPage = 1;
    render();
});

/* ===== PAGINATION ===== */
document.getElementById("prev").onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        render();
    }
};

document.getElementById("next").onclick = () => {
    if (currentPage < Math.ceil(filtered.length / pageSize)) {
        currentPage++;
        render();
    }
};

/* ===== SORT ===== */
document.getElementById("sortTitle").onclick = () => {
    filtered.sort((a, b) =>
        sortTitleAsc
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
    );
    sortTitleAsc = !sortTitleAsc;
    render();
};

document.getElementById("sortPrice").onclick = () => {
    filtered.sort((a, b) =>
        sortPriceAsc ? a.price - b.price : b.price - a.price
    );
    sortPriceAsc = !sortPriceAsc;
    render();
};
