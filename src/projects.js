import dom from "./dom";

const project = (()=>{
    
    let projectList = []

    //local storage
    if(localStorage.getItem('project') === null){
        projectList =[{
            title:'Demo', icon:'fa-home', tasks:[],
        }]
    }
    else{
        const projectLocalStorage = JSON.parse(localStorage.getItem('project'));
        projectList = projectLocalStorage
    }

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
        localStorage.setItem('project', JSON.stringify(projectList))
        
    }

    function editProject(index, title, icon, link){
        projectList[index].title = title
        projectList[index].icon = icon
        dom.showProjects()
        if (link === undefined){ 
            dom.changeProject(index) 
        } else { 
            dom.changeProject(link) 
        }
        localStorage.setItem('project', JSON.stringify(projectList)) 
    }

    function removeProject(index){
        projectList.splice(index, 1)
        dom.hideElement(dom.modals)
        dom.showProjects()
        dom.changeProject('inbox')
        localStorage.setItem('project', JSON.stringify(projectList))
    }

    return{
        projectList,
        createProject,
        removeProject,
        editProject,
    }
})();

export default project