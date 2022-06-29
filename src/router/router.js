"use strict";
import { match } from "./util.js";

export default class Router extends HTMLElement {
  /**
   * Router looks for a outlet-component tag for updating the views on history updates.
   * Example:
   *
   * <router-component>
   *  <outlet-component>
   *    <!-- All DOM update will be happening here on route change -->
   *  </outlet-component>
   * </router-component>
   */
  get outlet() {
    return this.querySelector("outlet-component");
  }

  get root() {
    return window.location.pathname;
  }
  get index() {
    return this.activeRoute.index;
  }
  constructor() {
    super();
    this.setAttribute("root", this.root);
    console.log("construct")
    const nav = document.createElement("nav");
    this.nav = nav;
    this.appendChild(nav);
  }
  /**
   * Get all routes from the direct route-component child element.
   * The document title can be updated by proving an
   * title attribute to the route-component tag
   */
  get routes() {
    return Array.from(this.querySelectorAll("route-component"))
      .filter((node) => node.parentNode === this)
      .map((r) => ({
        index: r.getAttribute("index"),
        // page index
        path: r.getAttribute("path"),
        // Optional: document title
        title: r.getAttribute("title"),
        // name of the web component the should be displayed
        component: r.getAttribute("component"),
        // Bundle path if lazy loading the component
        resourceUrl: r.getAttribute("resourceUrl"),
      }));
  }

  connectedCallback() {
    console.log("Router element is rendered");
    this.updateLinks();
    this.navigate(this.root);
    const root = this.getAttribute("root");
    if (root !== '/') {
      this.createMultipleNav();
    } else {
      this.createInitialNav();
    }
    window.addEventListener("popstate", this._handlePopstate);
  }
  disconnectedCallback() {
    window.removeEventListener("popstate", this._handlePopstate);
  }

  _handlePopstate = () => {
    this.navigate(window.location.pathname);
    console.log(PopStateEvent.state);
  };
  static get observedAttributes() {
    return ["root"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (oldValue !== '/' && newValue !== '/') return;
      if (name === "root") {

        this.nav.className = "hide-nav";
        this.nav.onanimationend = () => {
          this.nav.className = "";

          if (oldValue === "/") {
            this.nav.removeChild(this.nav.firstChild);
            this.createMultipleNav();
            return;
          }
          if (newValue === "/") {
            this.nav.removeChild(this.nav.firstChild);
            this.createInitialNav();
            return;
          }
        };
      }

  }
  createInitialNav() {
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.setAttribute("index", 1);
    a.setAttribute("route", "/about");
    this.nav.classList.add("show-nav");
    a.innerText = "START";
    this.nav.appendChild(ul).appendChild(li).appendChild(a);
    a.onclick = (e) => {
      e.preventDefault();
      this.changeBackgroundColor();
      this.setAttribute("root", "/about" );
      this.navigate("/about");
    };
  }
  createMultipleNav() {
    const newNav = document.createElement("ul");
    const links = [
      { index: 2, title: "About", route: "/about" },
      { index: 3, title: "Experience", route: "/experience" },
      { index: 4, title: "Projects", route: "/projects" },
      { index: 5, title: "Hire", route: "/contact" },
    ];
    links.forEach((link) => {
      const li = document.createElement("li");
      const l = document.createElement("a");
      li.setAttribute("index", link.index);
      l.setAttribute("index", link.index);
      l.setAttribute("route", link.route);
      l.onclick = (e) => {
        e.preventDefault()
        if(link.index === this.index) return
        this.setAttribute("root", link.route);
        this.navigate(link.route);
        this.changeBackgroundColor();
      }
      l.innerText = link.title.toLocaleUpperCase();
      newNav.appendChild(li).appendChild(l);
      this.nav.classList.add("show-nav");
      this.nav.appendChild(newNav);
    });
  }

  changeBackgroundColor() {
    const degrees = Math.floor(Math.random() * 360 + 1);
    document.body.style.backgroundColor = `hsl(${degrees}deg 100% 73%)`;
  }
  updateLinks() {
    /**
     * Find all child link elements with route attribute to update the
     * href with route attribute value.
     *
     * Add custom click event handler to prevent the default
     * behavior and navigate to the registered route onclick.
     */
    this.nav.querySelectorAll("a[route]").forEach((link) => {
      const target = link.getAttribute("route");
      const index = link.getAttribute("index");
      link.setAttribute("href", target);

      if (this.activeRoute?.index === index) {
        link.parentNode.style = "transform: scale(1.3)";
      }
      if (this.activeRoute?.index !== index) {
        link.parentNode.style = "transform: scale(1)";
      }
      link.onclick = (e) => {
        e.preventDefault();
        if (this.index === index) return;
        this.handleAnimation(this.index, index);

        this.navigate(target);
      };
    });
  }

  navigate(url) {
    const matchedRoute = match(this.routes, url);
    if (matchedRoute !== null) {
      this.activeRoute = matchedRoute;
      const lastRoute = window.history.state?.index || 1;
      window.history.pushState(
        {
          lastRoute,
          index: this.activeRoute.index,
        },
        null,
        url
      );
      this.update();
    }
  }
  handleAnimation(currentIndex, incoming) {
    this.changeBackgroundColor();
    if (currentIndex - incoming === 1) {
      this.swipe = "right";
    }
    if (currentIndex - incoming === -1) {
      this.swipe = "left";
    }
  }

  /**
   * Update the DOM under outlet based on the active
   * selected route.
   */
  update() {
    const {
      index,
      component,
      title,
      params = {},
      resourceUrl = null,
    } = this.activeRoute;

    if (component) {
      // Remove all child nodes under outlet element

      const updateView = () => {
        const view = document.createElement(component);
        document.title = title || document.title;
        const outgoingChild = this.outlet.firstChild;

        if (this.outlet.childNodes.length > 0) {
          setTimeout(() => {
            this.outlet.removeChild(this.outlet.firstChild);
          }, 500);
          if (this.swipe == "left") {
            outgoingChild.classList.add("leave-left");
            view.classList.add("enter-from-left");
          } else {
            outgoingChild.classList.add("leave-right");
            view.classList.add("enter-from-right");
          }
        }
        for (let key in params) {
          /**
           * all dynamic param value will be passed
           * as the attribute to the newly created element
           * except * value.
           */
          if (key !== "*") view.setAttribute(key, params[key]);
        }
        setTimeout(() => {
          this.outlet.appendChild(view);
        }, 500);
        setTimeout(() => {
          view.classList.remove("enter-from-left");
          view.classList.remove("enter-from-right");
        }, 1000);
        // Update the route links once the DOM is updated
        this.updateLinks();
      };

      if (resourceUrl !== null) {
        import(resourceUrl).then(updateView);
      } else {
        updateView();
      }
    }
  }

  go(url) {
    this.navigate(url);
  }

  back() {
    window.history.go(-1);
  }
}

customElements.define("router-component", Router);
