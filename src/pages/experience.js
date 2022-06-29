import {cv} from '/constants/cv.mjs'
export default class Experience extends HTMLElement {
  connectedCallback() {
    
    const style = document.createElement("style");
    style.innerHTML = `
      experience-component:defined {
        display: flex;
        justify-content:center;
        align-items: center;
        flex-direction:column;
        margin: 5rem ;
        padding-inline: 2rem;
        width: 100%;
      }
      section.experience-section  {
        display: flex;
        flex-direction: column;
        gap: 1.1rem; 
        margin-block-start: 2rem;
      }
      div.experience-card  {
        display: flex;
        flex-direction: column;
        gap: .5rem; 
        margin-inline-start: 2rem;
        max-width: 900px;
      }
      @media (max-width: 900px) {
        experience-component:defined{
          margin: 4rem 0 0
        }
      
        .experience-card {
          margin-inline-start: 1rem;
        }
      }
    `;
    const page = document.createElement('div');
    page.classList.add(".experience-page")
    this.appendChild(style);
    this.appendChild(page);

    const experience = document.createElement("section");
    const education = document.createElement("section");
    const certifications = document.createElement("section");
    
    const sections = [
      {
        component: experience, title: "Work Experience"
      },
      {
       component: education, title: "Education"
      },
      {
         component: certifications, title:"Certifications"
      }
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
    cv.experience.certifications.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("experience-card");
      card.innerHTML = `
      <h2>${item.title}</h2>
      <h6>${item.academy}</h6>
      <p>year: ${item.year}</p>
      `;
      certifications.appendChild(card);
    });
    page.appendChild(experience);
    page.appendChild(education);
    page.appendChild(certifications);
    page
      .querySelectorAll("section")
      .forEach((s) => s.classList.add("experience-section"));
  }
}

customElements.define("experience-component", Experience);
