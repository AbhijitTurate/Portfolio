// ProjectList --> render() , updateProjectDom()
// render()--> grabbing html markup and assigning values(innertext)
// updateProjectsDom() --> loop through array and call render and mount

import { projectLink } from "./ApiEndPoint.js";
class ProjectList {
  constructor() {
    this.isLoading = true;
    this.projectList = [];
    this.projectMarkUp = document.createElement("div");
    this.projectMarkUp.id = "#projectList-unique123";
  }

  updatedRender() {
    switch (this.isLoading) {
      case true:
        // return a spinner

        const spinner = document.createElement("h1");
        spinner.innerText = "Projects are loading ...";
        this.projectMarkUp.appendChild(spinner);
        break;

      case false:
        // return actual markup
        // remove the spinner component
        console.log("reached here -=======");
        this.projectMarkUp.innerHTML = "";
        // this.projectMarkUp = this.render();
        this.projectList.forEach((project) => {
          console.log("project", project);
          console.log("project Markup ", this.getProjectMarkup(project));
          this.projectMarkUp.appendChild(this.getProjectMarkup(project));
        });

        this.isLoading = false;
        break;

      default:
        return;
    }
    // this can be optional
    // if you want to maintain the api structure of Component.mount()
    // you can return this.
    // But in any case this is available in the this.projectMarkup
    return this.projectMarkUp;
  }

  fetchData() {
    return new Promise((resolve, reject) => {
      fetch(projectLink)
        .then((response) => response.json())
        .then((projects) => {
          // set the is loading state to false
          console.log("Reached here project", projects);
          this.projectList = [...projects];
          this.isLoading = false;
          // call the new render function
          this.updatedRender();
          resolve(this.projectMarkUp);
        })
        .catch((err) => {
          console.log("Error in loading data");
          // setting the isLoading state to true
          this.isLoading = true;
          // calling the render function
          this.updatedRender();
          reject(this.projectMarkUp);
        });
    });
  }

  render() {
    const spinner = document.createElement("h1");
    spinner.innerText = "Spinner";
    this.displayProjects(this.isLoading, spinner);
    this.url = projectLink;
    fetch(this.url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log("Project list", data);

        this.isLoading = false;
        console.log("this in fetch", this);
        // this.render()
        this.allProjects = data;

        // projectList.appendChild(this.updateProjectsDom(this.allProjects));
        this.displayProjects(
          this.isLoading,
          this.updateProjectsDom(this.allProjects),
        );
      })
      .catch((err) => {
        console.log("Not able to find data", err);
      });
    console.log("This in  render:", this);
    console.log("isLoading:", this.isLoading);
  }

  displayProjects(condition, projectData) {
    const projectList = document.querySelector(".project_list");
    if (condition) {
      console.log("projectdata in displayProjects;", projectData);
      // console.log(spinner);
      projectList.innerHTML = "";
      projectList.appendChild(projectData);
    } else {
      console.log(projectData);
      projectList.innerHTML = "";
      projectList.appendChild(projectData);
    }
  }

  updateProjectsDom(projects) {
    const returnedProjectList = document.createElement("div");
    projects.forEach((element) => {
      returnedProjectList.appendChild(this.getProjectMarkup(element));
      // console.log("project element:", element);
    });
    return returnedProjectList;
  }

  getProjectMarkup(project) {
    // Creating elements

    console.log("Project in render:", project);
    const projectItem = document.createElement("div");
    const projectTitle = document.createElement("h1");
    const projectDescription = document.createElement("div");
    const projectContent = document.createElement("div");
    const projectInfo = document.createElement("p");
    const technology = document.createElement("p");
    const projectLink = document.createElement("a");
    const visitIcon = document.createElement("i");
    const visittext = document.createElement("span");
    const imageDiv = document.createElement("div");
    const projectImage = document.createElement("img");

    // adding classes
    projectItem.classList.add("project_item");
    projectTitle.classList.add("project_title");
    projectDescription.classList.add("project_description");
    projectContent.classList.add("project_content");
    projectInfo.classList.add("project_info");
    technology.classList.add("technology");
    projectLink.classList.add("link_button");
    visitIcon.classList.add("fa-solid", "fa-link");
    imageDiv.classList.add("project_image");
    projectImage.classList.add("project_img");

    // adding innertext and other attributes
    projectTitle.innerText = project.title;
    projectInfo.innerText = project.information;
    technology.innerText = project.technoloy;
    projectLink.href = project.link;
    projectLink.target = "_blank";
    projectImage.src = `${project.image}`;

    // Appending Child
    projectItem.appendChild(projectTitle);
    projectItem.appendChild(projectDescription);
    projectDescription.appendChild(projectContent);
    projectDescription.appendChild(imageDiv);
    projectContent.appendChild(projectInfo);
    projectContent.appendChild(technology);
    projectContent.appendChild(projectLink);
    // projectLink.appendChild(visitIcon)
    imageDiv.appendChild(projectImage);
    // projectLink.innerHTML = visitIcon
    projectLink.innerHTML = `<i class="fa-solid fa-link"></i>VISIT ME`;
    // projectLink.innerText = `VISIT ME`;
    return projectItem;
  }

  mount(el) {
    // this is an asynchronous function.
    this.fetchData()
      .then(() => {
        // since fetch data is not returning anything
        // once that promise is resolved we will mount the project into the given element
        if (el) {
          console.log("Reached here", this.projectMarkUp);
          el.appendChild(this.projectMarkUp);
          return;
        }
        throw new Error("Cannot mount projects without parent container");
      })
      .catch((err) => {
        console.log("Error in mounting the element ", err);
      });
  }
}

export default ProjectList;
