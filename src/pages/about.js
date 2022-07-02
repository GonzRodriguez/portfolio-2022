import { cv } from "/constants/cv.mjs";

export default class About extends HTMLElement {

  connectedCallback() {
    const link = document.createElement("link");
    const icons = document.createElement("section");
    const quotes = document.createElement("section");
    this.toggleAttribute("hidden");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", "/styles/about.css");
    link.setAttribute("id", "about-css");


    quotes.className = "about-quotes";
    icons.className = "about-icons";
    const grid = document.createElement("div");
    grid.className = "about-icons-grid";
    icons.appendChild(grid);
    cv.tools.forEach((tool) => {
      const div = document.createElement("div");
      const image = document.createElement("img");
      image.src = tool.href;
      image.alt = tool.name;
      image.title = tool.name;
      const label = document.createElement("label");
      label.innerHTML = tool.name;
      label.htmlFor = tool.name;
      div.appendChild(image);
      div.appendChild(label);
      grid.appendChild(div);
    });
    cv.quotes.forEach((quote) => {
      const article = document.createElement("article");
      article.innerHTML = `
      <h3>References</h3>
      <figure>
      <span>&quot;</span>
        <blockquote cite="">
            <p>${quote.message}</p>
            <h6>${quote.date}</h6>
        </blockquote>
        <figcaption><h2><em>${quote.name}</em></h2> <cite><h6> ${quote.role} </h6></cite></figcaption>
    </figure>
    
    
    `;
      quotes.appendChild(article);
    });
    this.innerHTML = `
      <div class="page">
      <h1>About Me</h1>
      <h3>Personal Information</h3>
        <section class="about-info">
          <h6>${cv.personal.city}</h6>
          <h2>${cv.personal.name}</h2>
          <h6>${cv.personal.occupation}</h6>
          <p>${cv.personal.description}</p>
          <p> Email: <a href="mailto:${cv.personal.links.email}" target="_blank" rel="noopener noreferrer">${cv.personal.links.email}</a> </p>
          <p> GitHub: <a href="${cv.personal.links.github}" target="_blank" rel="noopener noreferrer">${cv.personal.links.github}</a> </p>
          <p> LinkedIn: <a href="${cv.personal.links.linkedin}" target="_blank" rel="noopener noreferrer">${cv.personal.links.linkedin}</a> </p>
        </section>
      </div>
    `;


    
    this.appendChild(link);
    const aboutCSS = document.querySelector("#about-css");
    aboutCSS.onload = function () {
      this.parentNode.toggleAttribute("hidden");
      this.parentNode.appendChild(icons);
      this.parentNode.appendChild(quotes);
    };
  }
}

customElements.define("about-component", About);
