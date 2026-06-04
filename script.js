const BACKEND_URL = "https://pushpak-news-backend.onrender.com";

// 🛠️ SAFE IMAGE RESOLVER: Localhost paths ko render base URL se replace karta hai
function getSafeImageUrl(imagePath) {
  const fallbackImg = "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop";
  
  if (!imagePath || imagePath.trim() === "") {
    return fallbackImg;
  }
  
  let path = imagePath.trim();
  
  // Localhost string references ko clean karein
  if (path.includes("http://127.0.0.1") || path.includes("localhost")) {
    try {
      const urlObj = new URL(path);
      path = urlObj.pathname; 
    } catch(e) {
      console.error(e);
    }
  }

  if (path.startsWith("http")) {
    return path; 
  }
  
  return `${BACKEND_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

// 🌐 CATEGORY PAGES ENGINE: World, Sports, Politics etc. ke liye auto-loader
async function loadCategoryNews() {
  // Page ke naam se category pata karna (e.g., sports.html -> sports)
  const path = window.location.pathname;
  const page = path.split("/").pop().replace(".html", "").toLowerCase();
  
  // Agar home ya dynamic page hai toh is engine ko skip karein
  if (page === "index" || page === "" || page === "news-details" || page === "login" || page === "register") return;

  const container = document.getElementById("categoryNewsGrid") || document.querySelector(".trending-grid") || document.querySelector(".video-grid");
  if (!container) return;

  try {
    const response = await fetch(`${BACKEND_URL}/api/news`);
    const data = await response.json();
    
    if (!data || !data.news) return;
    
    // Sirf is page ki category wali news filter karein
    let filteredNews = data.news.reverse().filter(item => {
      return item.category && item.category.toLowerCase() === page;
    });

    // Videos page ke liye special validation support
    if (page === "videos") {
      filteredNews = data.news.reverse(); // Videos block mein saari video waali news dikhane ke liye
    }

    if (filteredNews.length === 0) {
      container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888; padding: 40px 0;">No news found in this category yet.</p>`;
      return;
    }

    container.innerHTML = "";
    filteredNews.forEach(item => {
      container.innerHTML += `
        <div class="trending-card" onclick="window.location.href='news-details.html?id=${item._id}'" style="cursor:pointer;">
          <div style="position:relative;">
            <img src="${getSafeImageUrl(item.image)}" alt="${item.title}" style="width:100%; height:200px; object-fit:cover; display:block;" onerror="this.src='https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop';">
            ${page === "videos" ? `<div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); background:rgba(255,60,0,0.9); color:#fff; width:45px; height:45px; border-radius:50%; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-play"></i></div>` : ''}
          </div>
          <div style="padding:15px;">
            <span class="tag" style="color:#ff3c00; font-size:12px; font-weight:600; text-transform:uppercase;">${item.category || page}</span>
            <h3 style="font-size:16px; margin-top:5px; line-height:1.4; color:inherit;">${item.title}</h3>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error("Category loading failed:", error);
  }
}

// Global invocation call
document.addEventListener("DOMContentLoaded", loadCategoryNews);