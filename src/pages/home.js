import { cv } from "/constants/cv.mjs";

export default class Home extends HTMLElement {
  
  connectedCallback() {
    const link = document.createElement("link");
    
    this.toggleAttribute("hidden");
    
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", "/styles/home.css");
    link.setAttribute("id", "home-css");
    
    const tags = document.createElement("div");
    tags.className = "tags";
    cv.personal.skills.forEach(skill => {
      const s = document.createElement("span");
      s.className = "skill";
      s.innerText = skill.toLocaleUpperCase();
      tags.appendChild(s);
    })
      
    
    this.innerHTML = `
    <figure>
      <picture>
        <source srcset="assets/profile-badge-.svg" media="(min-width: 800px)">
        <img src="assets/profile-badge-.svg" alt="profile" class="home-hero-img"/>
      </picture>
    </figure>
    <div class="home-hero-container">
      <h1 class="home-hero-title"> ${cv.personal.title} </h1>
      <h2><em>${cv.personal.name} </em></h2>
      <p>${cv.personal.tools}</p>
      <p>${cv.personal.occupation}</p>
      <a index="5" id="hire" href="/contact">HIRE</a>
    </div>
    `;
    const heroContainer = document.querySelector(".home-hero-container");
    heroContainer.appendChild(tags);
    this.appendChild(link);
    const homeCSS = document.querySelector("#home-css");
    homeCSS.onload = function () {
      this.parentNode.toggleAttribute("hidden");
    };

  }
}

customElements.define("home-component", Home);
