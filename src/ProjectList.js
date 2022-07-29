// ProjectList --> render() , updateProjectDom()
// render()--> grabbing html markup and assigning values(innertext)
// updateProjectsDom() --> loop through array and call render and mount

import { projectLink } from "./ApiEndPoint.js";
class ProjectList {
  constructor() {
    this.isLoading = true;
    this.projectList = [];
  }



  render() {
    const spinner = document.createElement("h1");
    spinner.innerText = "Spinner";
    this.displayProjects(this.isLoading,spinner)
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
        this.displayProjects(this.isLoading,this.updateProjectsDom(this.allProjects))
      })
      .catch((err) => {
        console.log("Not able to find data", err);
      });
    console.log("This in  render:", this);
    console.log("isLoading:", this.isLoading);
  }

  displayProjects(condition,projectData) {
    const projectList = document.querySelector(".project_list");
    if (condition) {
      console.log("projectdata in displayProjects;",projectData);
      // console.log(spinner);
        projectList.innerHTML = ''
        projectList.appendChild(projectData)
    }
    else{
      console.log(projectData);
      projectList.innerHTML = ""
      projectList.appendChild(projectData)
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
}

export default ProjectList;
