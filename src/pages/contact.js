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

    const style = document.createElement("style");
    style.innerHTML = `
      contact-component:defined {
        display: flex;
        justify-content: center;
        padding: 4rem;
        width: 100%;
      }

      form#contact-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content:center;
        align-items: stretch;
        max-width: 800px;
        margin-top: 2.5rem;
      }
      input,
      textarea {
        padding: 1rem;
        border: 5px solid black;
        border-radius: 10px;
        font-family: var(--p-text);
      }
      input#submit {
        border: 5px solid black;
        border-radius: 10px;
        color: white;
        background-color: hsl(0, 100%, 68%);
        font-size: var(--h6-text);
        font-weight: 900;
        cursor: pointer;
      }
      input#submit:hover{
        -webkit-animation: hue 3s infinite;
        animation: hue 1500ms infinite;
      }
      input#goHome{
        padding: 1rem;
        border-radius: 10px;
        border: 0;
        color: white;
        background-color: #2e2e2e;
        font-size: var(--h6-text);
        font-weight: 900;
        cursor: pointer;
      }
      input#goHome:hover{
        background-color:#6b6b6b;
      }
      div.alert {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        padding-inline: 3rem;
        height: 50px;
        margin-inline: 2rem;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #5f77ff;
        color: white;
        font-family: var(--h6-text);
        font-weight: 900;
        animation: alert 2s ease-in-out;
      }
      @keyframes hue {
        0% {
        -webkit-filter: hue-rotate(0deg);
        }
        100% {
        -webkit-filter: hue-rotate(360deg);
        }
      }
      @keyframes alert {
        0% {
        top: -5%;
        }
        10% {
        top: 5%;
        }
        90% {
        top: 5%;
        }
        100% {
          top: -5%;
        }
      }
      @media (max-width: 900px) {
        input,
        textarea {
          border: 3px solid black;
        }
      }
    `;
    
    this.innerHTML = `
      <div class="page">
        <h1>Contact Me</h1>
        <form method="POST" action="http://localhost:3000/api/contact" id="contact-form">
          <input type="text" placeholder="Name"/>
          <input type="text" placeholder="Company"/>
          <input type="email" placeholder="Email"/>
          <textarea type="text" placeholder="Message..." rows="4"></textarea>
          <input id="submit" type="submit" value="SEND"/>
          <input id="goHome" type="button" value= "Go Home" />
        </form>
      </div>
    `;
    document.getElementById("goHome").onclick = this.goHome;
    document.querySelector("form").addEventListener('submit', async (e) => {
      e.preventDefault();
      const [name, company, email, message, ...buttons] = e.target;

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
        const response = await fetch("http://localhost:3000/api/contact", options);
        const data = await response.json();
        this.alert(data, response.status);
      } catch (err) {
        console.error(err);
      }
      e.target.reset()
    })
    this.appendChild(style);
  }
}

customElements.define("contact-component", Contact);
