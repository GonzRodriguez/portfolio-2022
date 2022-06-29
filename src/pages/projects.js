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
    this._render();
  }

  _render() {
    
    if (!this.attributes.length) return;
    
    // adds the structure of the page 
    this.innerHTML = `
    <section class="projects">
    <h1>Projects</h1>
    <div class="projects-cards-grid"> </div>
    </section>
    `;
    // sets the animation of the page depending on the index  
      // renders each card
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
    const style = document.createElement("style");
    style.innerHTML = `
      projects-component:defined {
        display: flex;
        justify-content:center;
        align-items: center;
        flex-direction:column;
        margin: 5rem ;
        padding-inline: 2rem;
        width: 100%;
        /* min-height: 80%; */
      }
      
      section.projects {
        width: 100%;
        max-width: 1050px;
        margin-top: 2.5rem;
      }
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      .projects-cards-grid {
        margin: 1.5rem auto ;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
        --stagger-delay: 100ms;
      }
      .projects-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: .75rem;
        border: solid 6px black;
        background: #fff;
        padding: 0.75rem;
        border-radius: 1rem;
        animation: cardEntrance 500ms ease-out;
        animation-fill-mode: backwards;
        box-shadow: 0 8px 2px rgba(0, 0, 0, 0.15);
        transform: scale(1);
        transition-duration: 200ms;
      }
      .projects-card:hover {
        transform: scale(1.1);
        transition-duration: 200ms;
        box-shadow: 0 8px 8px 4px rgba(0, 0, 0, 0.15);
        cursor: pointer;
      }
      
      .projects-card:nth-child(1) {
        animation-delay: calc(1 * var(--stagger-delay));
      }
      .projects-card:nth-child(2) {
        animation-delay: calc(2 * var(--stagger-delay));
      }
      .projects-card:nth-child(3) {
        animation-delay: calc(3 * var(--stagger-delay));
      }
      .projects-card:nth-child(4) {
        animation-delay: calc(4 * var(--stagger-delay));
      }
      .projects-card:nth-child(5) {
        animation-delay: calc(5 * var(--stagger-delay));
      }
      .projects-card:nth-child(6) {
        animation-delay: calc(6 * var(--stagger-delay));
      }
      .projects-card:nth-child(7) {
        animation-delay: calc(7 * var(--stagger-delay));
      }
      .projects-card:nth-child(8) {
        animation-delay: calc(8 * var(--stagger-delay));
      }
      .projects-card::after {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }
      .projects-card:hover::after {
        opacity: 1;
      }
      div.chips {
        display: flex;
        flex-wrap: wrap;
        gap: .25rem;
      }
      div.chip {
          color: #b05cff;
          padding: 0.3rem;
          font-family: var(--h3-text);
          border: 4px solid #b05cff;
          border-radius: 15px;
          background: #f1e2ff;
      }
      
      @keyframes cardEntrance {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0px);
        }
      }
    `;
  
    div.appendChild(style);
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
