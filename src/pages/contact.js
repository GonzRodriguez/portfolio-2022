export default class Contact extends HTMLElement {
  goHome() {
    window.location.pathname = "/";
  }
  alert(message, status) {
    const alert = document.createElement("div");
    alert.classList.add("alert");
    if(status >= 400){
      alert.style.backgroundColor = "#ff5f5f";
    }
    this.querySelector(".page").appendChild(alert);
    alert.innerHTML = `<p>${message}</p>`;
    setTimeout(() =>{this.querySelector(".page").removeChild(alert)}, 2000)
  }
  connectedCallback() {
    this.toggleAttribute("hidden");

    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", "/styles/contact.css");
    link.setAttribute("id", "contact-css");

    this.innerHTML = `
      <div class="page">
      <h1>Contact Me</h1>
      <form>
        <fieldset id="contact-form">
          <input type="text" name="name" placeholder="Name"/>
          <input type="text" name="company" placeholder="Company"/>
          <input type="email" name="email" placeholder="Email"/>
          <textarea type="text" name="message" placeholder="Message..." rows="4"></textarea>
          <input id="submit" type="submit" value="SEND"/>
          <input id="goHome" type="button" value= "Back to Home Page" />
        </fieldset>
      </form>
      </div>
    `;
    document.getElementById("goHome").onclick = this.goHome;
    document.querySelector("form").addEventListener('submit', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const [fieldset, name, company, email, message, ...buttons] = e.target;
      const body = {
        company: company.value,
        name: name.value,
        email: email.value,
        message: message.value,
      };
      const options = {
        method: "POST",
        mode: "cors",
        port: "3000",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      };
      try {
        const response = await fetch("/api/contact", options);
        const data = await response.json();
        this.alert(data, response.status);
      } catch (err) {
        console.error(err);
      }
      e.target.reset()
    })
    this.appendChild(link);
    const contactCss = document.querySelector("#contact-css");
    contactCss.onload = function () {
      this.parentNode.toggleAttribute("hidden")
    };
    
  }
}

customElements.define("contact-component", Contact);
