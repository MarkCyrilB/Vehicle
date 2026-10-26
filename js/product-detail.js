// Load Product Details
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');
    const productDetailContent = document.getElementById('productDetailContent');
    const breadcrumbCar = document.getElementById('breadcrumbCar');
    
    if (!productDetailContent) return;
    
    const car = getCarById(carId);
    
    if (!car) {
        productDetailContent.innerHTML = `
            <div style="text-align: center; padding: 3rem; grid-column: 1 / -1;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--danger); margin-bottom: 1rem;"></i>
                <h2>Product Not Found</h2>
                <p style="color: var(--text-secondary); margin: 1rem 0;">The vehicle you're looking for doesn't exist.</p>
                <a href="products.html" class="btn btn-primary">
                    <i class="fas fa-arrow-left"></i>
                    Back to Inventory
                </a>
            </div>
        `;
        return;
    }
    
    if (breadcrumbCar) {
        breadcrumbCar.textContent = car.name;
    }
    
    productDetailContent.innerHTML = `
        <div class="product-detail-image-container">
            <img src="${car.image}" alt="${car.name}" class="product-detail-image" onerror="this.src='Orange.jpg'">
        </div>
        
        <div class="product-detail-info">
            <div>
                <h1 class="product-detail-name">${car.name}</h1>
                <p style="color: var(--primary-orange); font-size: 1.2rem; font-weight: 600;">${car.version}</p>
            </div>
            
            <div class="product-detail-price">${formatPrice(car.price)}</div>
            
            <div class="product-detail-badges">
                <span class="detail-badge">
                    <i class="fas fa-car"></i>
                    ${car.breed}
                </span>
                <span class="detail-badge">
                    <i class="fas fa-calendar"></i>
                    ${car.year}
                </span>
                <span class="detail-badge ${car.availability ? 'available' : 'unavailable'}" style="background: ${car.availability ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)'}; color: ${car.availability ? 'var(--success)' : 'var(--danger)'};">
                    <i class="fas fa-circle"></i>
                    ${car.availability ? 'Available' : 'Sold Out'}
                </span>
            </div>
            
            <div class="product-detail-section">
                <h3><i class="fas fa-info-circle"></i> Description</h3>
                <p class="product-detail-description">${car.description}</p>
            </div>
            
            <div class="product-detail-section">
                <h3><i class="fas fa-cogs"></i> Vehicle Specifications</h3>
                <div class="product-specs">
                    <div class="spec-item">
                        <span class="spec-label">Engine</span>
                        <span class="spec-value">${car.engine}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Horsepower</span>
                        <span class="spec-value">${car.horsepower}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Transmission</span>
                        <span class="spec-value">${car.transmission}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Drivetrain</span>
                        <span class="spec-value">${car.drivetrain}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Year</span>
                        <span class="spec-value">${car.year}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Category</span>
                        <span class="spec-value">${car.breed}</span>
                    </div>
                </div>
            </div>
            
            <div class="product-detail-section">
                <h3><i class="fas fa-star"></i> Key Features</h3>
                <ul style="color: var(--text-secondary); line-height: 2; padding-left: 1.5rem;">
                    ${car.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="product-detail-actions">
                <button class="btn btn-primary btn-detail" onclick="${car.availability ? 'inquireAboutCar()' : 'alertSoldOut()'}">
                    <i class="fas ${car.availability ? 'fa-envelope' : 'fa-times-circle'}"></i>
                    ${car.availability ? 'Inquire Now' : 'Sold Out'}
                </button>
                <a href="products.html" class="btn btn-secondary btn-detail">
                    <i class="fas fa-arrow-left"></i>
                    Back to Inventory
                </a>
            </div>
        </div>
    `;
}

// Inquire about car
function inquireAboutCar() {
    const currentUser = localStorage.getItem('velocita_currentUser');
    if (!currentUser) {
        alert('Please login to inquire about this vehicle.');
        window.location.href = 'login.html';
        return;
    }
    const user = JSON.parse(currentUser);
    alert(`Thank you ${user.fullName}! Your inquiry has been sent to our sales team. We will contact you soon regarding this vehicle.`);
}

// Alert for sold out
function alertSoldOut() {
    alert('This vehicle has been sold. Please check our inventory for similar vehicles.');
}

// Initialize product detail page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('product-detail.html')) {
        loadProductDetail();
    }
    checkAuth();
    initMobileNav();
});
