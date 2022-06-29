import { cv } from "/constants/cv.mjs";

export default class About extends HTMLElement {

  connectedCallback() {
    const style = document.createElement("style");
    const icons = document.createElement("section");
    const quotes = document.createElement("section");
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
    style.innerHTML = `
      about-component:defined {
        display: flex;
        justify-content:center;
        align-items: center;
        flex-direction:column;
        margin: 5rem ;
        padding-inline: 2rem;
        width: 100%;
      }
      section.about-info  {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 800px;
        margin-inline-start: 2rem;
        margin-block-start: 2rem;
      }
      .about-quotes article {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        max-width: 800px;
        margin: 5rem 0;
      }
      .about-quotes span {
        font-size: 4.8rem;
        max-height: 2.5rem;
      }
      .about-quotes h2,
      .about-quotes h6{
        display:block;
        text-align: end;
        font-weight: bolder;
      }

      .about-quotes p{
        margin-left: 2rem;
      }
      .about-icons {
        margin: 3rem 0;
      }
      .about-icons-grid  {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 2rem;
      }
      .about-icons-grid img {
        width: 40px;
        height: 40px;
      }
      .about-icons-grid div {
        width: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .about-icons-grid label {
        font-family: var(--p-text);
      }


      @media (max-width: 900px) {
        about-component:defined{
          margin: 4rem 0 0
        }
        section.about-info  {
        margin-inline-start: .5rem;
      }
    }`;

    this.appendChild(icons);
    this.appendChild(quotes);
    this.appendChild(style);
  }
}

customElements.define("about-component", About);
