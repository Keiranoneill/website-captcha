import Image from "next/image";

export default function Home() {
  return (
    <>
      <div id="navbar">
    <div id="navbar-left">
      <h1>logo</h1>
      
    </div>
      <a href="peripherals.html">Peripherals</a>
      <a href="console.html">Console</a>
      <a href="customer_service.html">Customer Service</a>
      <a href="signup.html">sign-up </a>
      <a href="login.html">login page</a>
    </div>
    <div id="search-container">
      <input type="text" placeholder="Search..." id="search-bar"></input>
      <a href="customer_service.html">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678-.678-.83 1.418-.832 1.664h10Z"/>
        </svg>
      </a>
     </div>

     <div className="gallery">
    <div className="gallery-item">
      <a href="Gaming pc's.html">
        <img src="img/72526Image1.webp" alt="Gaming PC 1"></img>
        <p>£750</p>
      </a>
    </div>
    <div className="gallery-item">
      <a href="peripherals.html">
        <img src="img/hgy.jpg" alt="Gaming PC 2"></img>
        <p>£55</p>
      </a>
    </div>
    <div className="gallery-item">
      <a href="console.html">
        <img src="img/nintendo-switch-blue-red-sku-header-050521.png" alt="Nintendo Switch"></img>
        <p>£300</p>
      </a>
    </div>
    <div className="gallery-item">
      <a href="Gaming pc's.html">
        <img src="img/pc2.jpeg" alt="pc's"></img>
        <p>£900</p>
      </a>
    </div>
    <div className="gallery-item">
      <img src="img/download.jfif" alt="ps4"></img>
      <p>£230</p>
    </div>
    <div className="gallery-item">
      <a href="peripherals.html">
        <img src="img/download.jpeg" alt="monitor"></img>
        <p>£120</p>
      </a>
    </div>
    <div className="gallery-item">
      <a href="peripherals.html">
        <img src="base64img/EHYOqYZwj4pFhxmF6k5SxtVbaZtUnGQzWsQZfswt.webp" alt="headphones"></img>
        <p>£110</p>
      </a>
    </div>
    <div className="gallery-item">
      <a href="peripherals.html">
        <img src="img/images.jfif" alt="mices"></img>
        <p>£25</p>
      </a>
    </div>
  </div>
  <div className="container">
    <div className="text-box">
      <textarea className="no-resize">We offer a wide range of gaming products, including gaming PCs, peripherals, and consoles. Our goal is to provide high-quality products and excellent customer service. Explore our selection and find the perfect gaming gear for you!</textarea>
    </div>
  </div>
  
  <div className="bottom-span">
    <span>&copy; 2024 Gaming Shop. All rights reserved.</span>
  </div>
    </>
  );
}
