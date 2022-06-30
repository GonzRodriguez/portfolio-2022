import { cv } from "/constants/cv.mjs";

export default class Home extends HTMLElement {
  
  connectedCallback() {
    const tags = document.createElement("div");
    tags.className = "tags";
    cv.personal.skills.forEach(skill => {
      const s = document.createElement("span");
      s.className = "skill";
      s.innerText = skill.toLocaleUpperCase();
      tags.appendChild(s);
    })
    const style = document.createElement("style");
    style.innerHTML = `
      home-component:defined {
        display: flex;
        flex-wrap: wrap;
        gap: 0.7rem;
        padding: 5rem;
        width: 100%;
        align-items: center;
        justify-content: center;
      }
      div.home-hero-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 1500px;
        gap: 0.7rem;
      }
      .home-hero-title{
        max-width: 1000px;
      }
      span.skill {
        font-size:.7rem;
        font-weight: bold;
        padding: .5rem;
        font-family: var(--h3-text);
        border: 3px solid #3f1f72;
        color: #3f1f72;
        border-radius: 50px;
      }
      div.tags {
        display:flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin: 2rem 0;
      }
      a#hire {
        width: 150px;
        padding: 1rem;
        border: 5px solid black;
        border-radius: .8rem;
        color: white;
        background-color: hsl(0, 100%, 68%);
        font-family: var(--h6-text);
        font-weight: 900;
        text-align: center;
        cursor: pointer;
      }
      a#hire:hover{
        -webkit-animation: hue 3s infinite;
        animation: hue 1500ms infinite;
      }
      img.home-hero-img {
        width: 20rem;
        margin: 2rem;
      }

      @keyframes hue {
        0% {
        -webkit-filter: hue-rotate(0deg);
        }
        100% {
        -webkit-filter: hue-rotate(360deg);
        }
      }
      @media (max-width: 1200px) {
        home-component:defined{
          margin:0;
        }

      }
      @media (max-width: 700px) {
        home-component:defined{
          padding: 1rem;
        }
        img.home-hero-img {
          width: 13rem;
          margin: 2rem;
        }
      }
    `;
    
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
    this.appendChild(style);

  }
}

customElements.define("home-component", Home);
