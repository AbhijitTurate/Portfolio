// ProjectList --> render() , updateProjectDom()
// render()--> grabbing html markup and assigning values(innertext)
// updateProjectsDom() --> loop through array and call render and mount

import { projectLink } from "./ApiEndPoint.js";
import Component from "./Component.js";
class ProjectList {
  constructor() {
    // super();
    this.isLoading = true;
    this.projectList = [];
    this.projectSection = document.createElement("div");
    this.projectSection.classList.add("project" , "section")
    this.projectSection.id = "project"
    this.projectsLink = projectLink;
  }

  render(){
    if(this.isLoading){
       const spinner = document.createElement("h1")
       spinner.innerText ="Wait! Your projects are loading"
      this.projectSection.appendChild(spinner)
    }
    else{
      // wrapping projectList in project wrapper
      const projectSectionTitle = document.createElement("h1")
      const projectsMarkup = document.createElement("div");
      projectSectionTitle.classList.add("project_heading","section_name")
      projectsMarkup.classList.add("project_list")

      projectSectionTitle.innerText = "< projects />"

      this.projectSection.appendChild(projectSectionTitle)
      console.log("All projects in render:",this.projectList);
      
      // this.projectsMarkup.innerHTML = ''
      this.projectList.forEach(project => {
      projectsMarkup.appendChild(this.getProjectMarkup(project))
    });
    this.projectSection.appendChild(projectsMarkup)
    }
    
 
    return this.projectSection
    console.log("All projects markup:",this.projectsMarkup);
  }

  fetchData()
  {
    return new Promise((resolve, reject) =>{
      fetch(this.projectsLink)
      .then((response) => {return response.json()})
      .then((allProjects) => {
        this.projectList = [...allProjects]
        console.log("this.projectList" , this.projectList);

        this.isLoading = false
        this.render()

        resolve(this.projectSection)
      })
      .catch((err) => {
        console.log("unable to find project data",err);
        this.isLoading = true
        this.render()
        reject(this.projectSection)
      })
    
  })

  }
  
  mount(el) {
    this.fetchData()
      .then((data) => {
       
        if (el) {
          // this.render()
          // console.log("render in mount",this.render());
          el.appendChild(this.projectSection);
         return;
        }
        throw new Error("Cannot mount projects without parent container");
      })
      .catch((err) => {
        console.log("error in mounting element", err);
      });
  }


  
  getProjectMarkup(project) {
    // Creating elements

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
 

  // fetchData() {
  //   return new Promise((resolve, reject) => {
  //     fetch(this.projectsLink)
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then(
  //         (projectsData) =>
  //         {
  //           console.log("projects data in fetch:", projectsData),
  //           this.projectList = [...projectsData],
  //           console.log("fetched data :", this.projectList),
  //           this.isLoading = true,
  //           this.render(),
  //           resolve(this.projectsMarkup)
  //         }
  //       )
  //       .catch((err) => {
  //         console.log("unable to fetch data", err);
  //         this.isLoading = true,
  //         this.render();
  //         reject(this.projectsMarkup);
  //       });
  //   });
  // }

  // getProjectdata()
  // {

  //     const spinner = document.createElement("h1");
  //     spinner.innerText = "Spinner";
  //     this.displayProjects(this.isLoading,spinner)
  //     this.url = projectLink;
  //     fetch(this.url)
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         // console.log("Project list", data);

  //         this.isLoading = false;
  //         console.log("this in fetch", this);
  //         // this.render()
  //         this.allProjects = data;

  //         // projectList.appendChild(this.updateProjectsDom(this.allProjects));
  //         return this.displayProjects(this.isLoading,this.updateProjectsDom(this.allProjects))
  //       })
  //       .catch((err) => {
  //         console.log("Not able to find data", err);
  //       });
  //     console.log("This in  render:", this);
  //     console.log("isLoading:", this.isLoading);

  // }

  // render() {
  //   if (this.isLoading) {
  //     const spinner = document.createElement("h1");
  //     spinner.innerText = "Spinner";
  //     console.log("rendering for first time");
  //     // this.projectsMarkup.innerHTML = "";
  //     // this.projectsMarkup.appendChild(spinner);
  //     return spinner
  //   }
  //   else{
  //     this.projectsMarkup.innerHTML = "";
  //     this.projectList.forEach((project) =>
  //       this.projectsMarkup.appendChild(this.getProjectMarkup(project))
  //     );
  //     this.isLoading = false;
  //     return this.projectsMarkup
  //   }
   

   
  //   // this.url = projectLink;
  //   // fetch(this.url)
  //   //   .then((response) => {
  //   //     return response.json();
  //   //   })
  //   //   .then((data) => {
  //   //     // console.log("Project list", data);

  //   //     this.isLoading = false;
  //   //     console.log("this in fetch", this);
  //   //     // this.render()
  //   //     this.allProjects = data;

  //   //     // projectList.appendChild(this.updateProjectsDom(this.allProjects));
  //   //     return this.displayProjects(
  //   //       this.isLoading,
  //   //       this.updateProjectsDom(this.allProjects)
  //   //     );
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log("Not able to find data", err);
  //   //   });
  //   // return this.displayProjects(this.isLoading, spinner);
  //   // console.log("This in  render:", this);
  //   // console.log("isLoading:", this.isLoading);
  // }


// displayProjects(condition, projectData) {
//   const projectList = document.querySelector(".project_list");
//   if (condition) {
//     console.log("projectdata in displayProjects;", projectData);
//     // console.log(spinner);
//     projectList.innerHTML = "";
//     return projectList.appendChild(projectData);
//   } else {
//     console.log(projectData);
//     projectList.innerHTML = "";
//     return projectList.appendChild(projectData);
//   }
// }

// updateProjectsDom(projects) {
//   const returnedProjectList = document.createElement("div");
//   projects.forEach((element) => {
//     returnedProjectList.appendChild(this.getProjectMarkup(element));
//     // console.log("project element:", element);
//   });
//   return returnedProjectList;
// }

export default ProjectList;
