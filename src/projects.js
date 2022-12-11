import dom from "./dom";

const project = (()=>{
    const projectList=[]

    class Project{
        constructor(title,icon){
            this.title = title
            this.icon = icon
            this.task = []
        }
    }

    function createProject(title, icon){
        const newProject = new Project(title,icon)
        projectList.push(newProject)
        console.log(projectList)
        dom.showProjects()
    }

    function removeProject(index){
        projectList.splice(index, 1)
        dom.hideElement(dom.modals)
        dom.showProjects()
    }

    return{
        projectList,
        createProject,
        removeProject,
    }
})();

export default project