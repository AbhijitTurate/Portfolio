// ProjectList --> render() , updateProjectDom()
// render()--> grabbing html markup and assigning values(innertext)
// updateProjectsDom() --> loop through array and call render and mount

class ProjectList {
  constructor() {
    this.url = "https://abhijitturate.github.io/Portfolio/utils/projects.json";

    fetch(this.url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Project list", data);
        this.updateProjectsDom(data);
      })
      .catch((err) => {
        console.log("Not able to find data",err);
      });
  }

  updateProjectsDom(projects) {
    const projectList = document.querySelector(".project_list");
    projects.forEach((element) => {
      projectList.appendChild(this.render(element));
      console.log("project element:", element);
    });
  }

  render(project) {
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
    const visittext = document.createElement("span")
    const imageDiv = document.createElement("div");
    const projectImage = document.createElement("img");

    // adding class
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
    projectImage.src = `${project.image}`
    console.log("project link:", projectLink);

    // Appending Child
    projectItem.appendChild(projectTitle)
    projectItem.appendChild(projectDescription)
    projectDescription.appendChild(projectContent)
    projectDescription.appendChild(imageDiv)
    projectContent.appendChild(projectInfo)
    projectContent.appendChild(technology)
    projectContent.appendChild(projectLink)
    // projectLink.appendChild(visitIcon)
    imageDiv.appendChild(projectImage)
    // projectLink.innerHTML = visitIcon
    projectLink.innerHTML = `<i class="fa-solid fa-link"></i>VISIT ME`
    // projectLink.innerText = `VISIT ME`;
    return projectItem
  }
}

export default ProjectList;
