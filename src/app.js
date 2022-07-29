// import ProjectList from "./ProjectList.js";

// const project = new ProjectList()

// project.render()

import ProjectList from "./ProjectList.js";

const root = document.getElementById("root");
const projectList = new ProjectList();

projectList.mount(root);
