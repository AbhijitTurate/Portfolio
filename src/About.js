import { aboutLink } from "./ApiEndPoint";
class About{
    constructor(){
        this.isLoading = true;
    }
    render()
    {
        this.url = aboutLink;
        fetch(this.url)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log("Project list", data);
            this.isLoading = false
            this.updateAboutDom(data);
          })
          .catch((err) => {
            console.log("Not able to find data",err);
          });
    }

    updateAboutDom(){
        const projectList = document.querySelector(".project_list");
        projects.forEach((element) => {
          projectList.appendChild(this.getProjectMarkup(element));
          console.log("project element:", element);
        });
    }

    getAboutMarkUp()
    {
        
    }
}