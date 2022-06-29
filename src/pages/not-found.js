export default class NotFound extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="page">
        <h1>404: Not Found</h1>
      </div>
    `;
  }
}

customElements.define("not-found", NotFound);
