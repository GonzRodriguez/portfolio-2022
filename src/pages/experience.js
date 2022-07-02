import {cv} from '/constants/cv.mjs'
export default class Experience extends HTMLElement {
  connectedCallback() {
    
    const page = document.createElement('div');
    const link = document.createElement("link");

    page.classList.add(".experience-page")

    this.toggleAttribute("hidden");

    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", "/styles/experience.css");
    link.setAttribute("id", "experience-css");

    this.appendChild(link);
    this.appendChild(page);

    const experienceCSS = document.querySelector("#experience-css");
    experienceCSS.onload = function () {
      this.parentNode.toggleAttribute("hidden");
    };

    const experience = document.createElement("section");
    const education = document.createElement("section");
    const certificates = document.createElement("section");
    
    const sections = [
      {
        component: experience,
        title: "Work Experience",
      },
      {
        component: education,
        title: "Education",
      },
      {
        component: certificates,
        title: "Certificates",
      },
    ];
    sections.forEach(sec => {
      const h1 = document.createElement("h1");
      h1.innerText = sec.title;
      sec.component.appendChild(h1);
    })
    cv.experience.work_experience.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("experience-card");
      card.innerHTML = `
        <h3><strong>${item.company}</strong></h3>
        <h6>${item.role}</h6>
        <p>${item.startDate} to ${item.endDate}</p>
        <p>${item.description}</p>
      `;
      experience.appendChild(card)
    })
    cv.experience.education.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("experience-card");
      card.innerHTML = `
      <h3><strong>${item.title}</strong></h3>
      <p>${item.period}</p>
      <h6>${item.school}</h6>
      `;
      education.appendChild(card)
    })
    cv.experience.certificates.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("experience-card");
      card.innerHTML = `
      <h2>${item.title}</h2>
      <h6>${item.academy}</h6>
      <p>year: ${item.year}</p>
      `;
      certificates.appendChild(card);
    });
    page.appendChild(experience);
    page.appendChild(education);
    page.appendChild(certificates);
    page
      .querySelectorAll("section")
      .forEach((s) => s.classList.add("experience-section"));


  }
}

customElements.define("experience-component", Experience);
