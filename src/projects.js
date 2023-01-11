import dom from "./dom";

const project = (()=>{
    
    const projectList = []

    class Project{
        constructor(title,icon){
            this.title = title
            this.icon = icon
            this.tasks = []
        }
    }

    function createProject(title, icon){
        const newProject = new Project(title,icon)
        projectList.push(newProject)
        console.log(projectList)
        dom.showProjects()
        dom.changeProject(projectList.length -1)
        
    }

    function editProject(index, title, icon, link){
        projectList[index].title = title
        projectList[index].icon = icon
        dom.showProjects()
        dom.changeProject(link)
    }

    function removeProject(index){
        projectList.splice(index, 1)
        dom.hideElement(dom.modals)
        dom.showProjects()
        dom.changeProject(0)
    }

    return{
        projectList,
        createProject,
        removeProject,
        editProject,
    }
})();

export default project