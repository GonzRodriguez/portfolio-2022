export default class Projects extends HTMLElement {
  repos = [];
  async fetchRepos() {
    const response = await fetch(
      "https://api.github.com/users/gonzrodriguez/repos"
    );
    const jsonResponse = await response.json();
    this.repos = jsonResponse
      .sort((a, b) => {
        const BDay = new Date(b.pushed_at).getTime();
        const ADay = new Date(a.pushed_at).getTime();
        return ADay - BDay;
      })
      .filter((repo) => repo.name !== "GonzRodriguez")
      .slice(-8)
      .reverse();
    this.setAttribute("fetched", true);
  }
  connectedCallback() {
    // super.connectedCallback();
    if (!this.repos.length) {
      this.fetchRepos();
    }
    const link = document.createElement("link");



    this._render();
  }

  _render() {
    
    if (!this.attributes.length) return;
    
    this.toggleAttribute("hidden");
    const link = document.createElement("link");

    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", "/styles/projects.css");
    link.setAttribute("id", "projects-css");
    // adds the structure of the page 
    this.innerHTML = `
    <section class="projects">
    <h1>Projects</h1>
    <div class="projects-cards-grid"> </div>
    </section>
    `;


    const div = document.querySelector("div.projects-cards-grid");
    this.repos.map((repo) => {

      const card = document.createElement('div');
      const title = document.createElement('h3');
      const date = document.createElement('h6');
      const description = document.createElement('p');
      const chips = document.createElement('div')
      
      card.classList.add("projects-card");
      chips.classList.add("chips")

      card.onclick = () => (window.location.href = repo.html_url);

      title.innerText = repo.name;
      description.innerText = repo.description;
      date.innerText = ` Last update: ${new Date(repo.pushed_at).getDate()} / ${new Date(repo.pushed_at).getMonth()} / ${new Date(repo.pushed_at).getFullYear()} `;
      repo.topics.forEach(topic => {
        const chip = document.createElement('span');
        chip.className = "chip";
        chip.innerText = topic;
        chips.appendChild(chip)
      })
      card.appendChild(title);
      card.appendChild(date);
      card.appendChild(description);
      card.appendChild(chips);

      div.appendChild(card)
    })
    this.appendChild(link);
    const projectsCSS = document.querySelector("#projects-css");
    projectsCSS.onload = function () {
      this.parentNode.toggleAttribute("hidden");
    };
  }
  static get observedAttributes() {
    return ["fetched" ];
  }
  // makes sure to render only if the cards have been fetched
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._render()
    }
  }
}

customElements.define("projects-component", Projects);
