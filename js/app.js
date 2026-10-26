// Load Featured Cars on Homepage
function loadFeaturedCars() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;
    
    const featured = getFeaturedCars();
    featuredGrid.innerHTML = '';
    
    featured.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'product-card';
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="product-image" onerror="this.src='Orange.jpg'">
            <div class="product-info">
                <h3 class="product-name">${car.name}</h3>
                <div class="product-price">${formatPrice(car.price)}</div>
                <p class="product-description">${car.description.substring(0, 100)}...</p>
                <div class="product-meta">
                    <span class="product-version">${car.version}</span>
                    <span class="product-availability ${car.availability ? 'available' : 'unavailable'}">
                        <i class="fas fa-circle"></i>
                        ${car.availability ? 'Available' : 'Sold Out'}
                    </span>
                </div>
                <button class="btn btn-primary product-btn" onclick="viewProduct(${car.id})">
                    <i class="fas fa-eye"></i>
                    View Details
                </button>
            </div>
        `;
        featuredGrid.appendChild(carCard);
    });
}

// Load All Products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const productsCount = document.getElementById('productsCount');
    
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    if (productsCount) {
        productsCount.textContent = `${cars.length} Vehicle${cars.length !== 1 ? 's' : ''} Available`;
    }
    
    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'product-card';
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="product-image" onerror="this.src='Orange.jpg'">
            <div class="product-info">
                <h3 class="product-name">${car.name}</h3>
                <div class="product-price">${formatPrice(car.price)}</div>
                <p class="product-description">${car.description.substring(0, 90)}...</p>
                <div class="product-meta">
                    <span class="product-version">${car.version}</span>
                    <span class="product-availability ${car.availability ? 'available' : 'unavailable'}">
                        <i class="fas fa-circle"></i>
                        ${car.availability ? 'Available' : 'Sold Out'}
                    </span>
                </div>
                <button class="btn btn-primary product-btn" onclick="viewProduct(${car.id})">
                    <i class="fas fa-eye"></i>
                    View Details
                </button>
            </div>
        `;
        productsGrid.appendChild(carCard);
    });
}

// View Product Details
function viewProduct(carId) {
    window.location.href = `product-detail.html?id=${carId}`;
}
