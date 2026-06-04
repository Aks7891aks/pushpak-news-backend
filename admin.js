console.log("Pushpak News Admin Panel Loaded");

/* LOGIN FORM VALIDATION */

const loginForm = document.getElementById("loginForm");

if(loginForm){

  loginForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const username =
      loginForm.querySelector("input[type='text']").value;

    const password =
      loginForm.querySelector("input[type='password']").value;

    if(username === "" || password === ""){

      alert("Please fill all fields");

    }else{

      alert("Login Successful");

      window.location.href = "dashboard.html";

    }

  });

}

/* SIDEBAR ACTIVE MENU */

const sidebarLinks =
  document.querySelectorAll(".sidebar ul li");

sidebarLinks.forEach((item)=>{

  item.addEventListener("click",()=>{

    sidebarLinks.forEach((link)=>{
      link.classList.remove("active");
    });

    item.classList.add("active");

  });

});

/* DASHBOARD CARD ANIMATION */

const cards =
  document.querySelectorAll(".card");

cards.forEach((card,index)=>{

  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = "0.5s ease";

  setTimeout(()=>{

    card.style.opacity = "1";
    card.style.transform = "translateY(0px)";

  },index * 200);

});

/* TABLE ROW HOVER EFFECT */

const rows =
  document.querySelectorAll("table tbody tr");

rows.forEach((row)=>{

  row.addEventListener("mouseover",()=>{

    row.style.transform = "scale(1.01)";
    row.style.transition = "0.3s";

  });

  row.addEventListener("mouseout",()=>{

    row.style.transform = "scale(1)";

  });

});

/* LIVE TIME */

const topbar =
  document.querySelector(".topbar");

if(topbar){

  const timeBox =
    document.createElement("div");

  timeBox.classList.add("live-time");

  timeBox.style.fontWeight = "600";
  timeBox.style.color = "#e50914";

  topbar.appendChild(timeBox);

  setInterval(()=>{

    const now = new Date();

    timeBox.innerHTML =
      now.toLocaleTimeString();

  },1000);

}

/* DARK MODE TOGGLE */

const darkBtn =
  document.createElement("button");

darkBtn.innerHTML =
  '<i class="fa-solid fa-moon"></i>';

darkBtn.style.position = "fixed";
darkBtn.style.bottom = "25px";
darkBtn.style.left = "25px";
darkBtn.style.width = "50px";
darkBtn.style.height = "50px";
darkBtn.style.border = "none";
darkBtn.style.borderRadius = "50%";
darkBtn.style.background = "#111827";
darkBtn.style.color = "#fff";
darkBtn.style.cursor = "pointer";
darkBtn.style.fontSize = "18px";
darkBtn.style.zIndex = "999";

document.body.appendChild(darkBtn);

darkBtn.addEventListener("click",()=>{

  document.body.classList.toggle("dark-admin");

});

/* NOTIFICATION ALERT */

setTimeout(()=>{

  const notification =
    document.createElement("div");

  notification.innerHTML =
    "Welcome To Pushpak News Admin Panel";

  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.right = "20px";
  notification.style.background = "#16a34a";
  notification.style.color = "#fff";
  notification.style.padding = "15px 25px";
  notification.style.borderRadius = "10px";
  notification.style.boxShadow =
    "0 5px 20px rgba(0,0,0,0.2)";
  notification.style.zIndex = "9999";

  document.body.appendChild(notification);

  setTimeout(()=>{

    notification.remove();

  },3000);

},1000);

/* RESPONSIVE SIDEBAR */

const sidebar =
  document.querySelector(".sidebar");

const mobileMenuBtn =
  document.createElement("button");

mobileMenuBtn.innerHTML =
  '<i class="fa-solid fa-bars"></i>';

mobileMenuBtn.style.position = "fixed";
mobileMenuBtn.style.top = "20px";
mobileMenuBtn.style.left = "20px";
mobileMenuBtn.style.width = "50px";
mobileMenuBtn.style.height = "50px";
mobileMenuBtn.style.border = "none";
mobileMenuBtn.style.borderRadius = "10px";
mobileMenuBtn.style.background = "#e50914";
mobileMenuBtn.style.color = "#fff";
mobileMenuBtn.style.cursor = "pointer";
mobileMenuBtn.style.fontSize = "20px";
mobileMenuBtn.style.display = "none";
mobileMenuBtn.style.zIndex = "999";

document.body.appendChild(mobileMenuBtn);

function checkScreen(){

  if(window.innerWidth < 991){

    mobileMenuBtn.style.display = "block";

    sidebar.style.display = "none";

  }else{

    mobileMenuBtn.style.display = "none";

    sidebar.style.display = "block";

  }

}

checkScreen();

window.addEventListener("resize",checkScreen);

mobileMenuBtn.addEventListener("click",()=>{

  if(sidebar.style.display === "none"){

    sidebar.style.display = "block";

  }else{

    sidebar.style.display = "none";

  }

});

/* AUTO PAGE FADE */

document.body.style.opacity = "0";

window.addEventListener("load",()=>{

  document.body.style.transition = "0.8s";
  document.body.style.opacity = "1";

});

/* ADD NEWS API */

const newsForm =
  document.getElementById("newsForm");

if(newsForm){

  newsForm.addEventListener(
    "submit",
    async(e)=>{

      e.preventDefault();

      const title =
        document.getElementById("title").value;

      const category =
        document.getElementById("category").value;

      const author =
        document.getElementById("author").value;

      const videoUrl =
        document.getElementById("videoUrl").value;

      const shortDescription =
        document.getElementById("shortDescription").value;

      const content =
        document.getElementById("content").value;

      const isBreaking =
        document.getElementById("breaking").checked;

      const slug =
        title
          .toLowerCase()
          .replace(/\s+/g,"-");

      const newsData = {

        title,

        slug,

        category,

        author,

        shortDescription,

        content,

        image:
"https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop",

        videoUrl,

        tags:[category],

        isBreaking,

        status:"published",

        views:0,

        featured:false

      };

      try{

        const response =
          await fetch(
            "https://pushpak-news-backend.onrender.com/api/news/add",
            {

              method:"POST",

              headers:{
                "Content-Type":"application/json"
              },

              body:JSON.stringify(newsData)

            }
          );

        const data =
          await response.json();

        if(data.success){

          alert("News Published Successfully");

          newsForm.reset();

        }else{

          alert(data.message);

        }

      }

      catch(error){

        console.log(error);

      }

    }
  );

}

/* CONSOLE */

console.log(
  "Pushpak News Professional Admin Activated"
);