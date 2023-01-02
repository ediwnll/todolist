import project from "./projects";
import dom from "./dom";
import tasks from "./tasks";

const validation = (()=>{
    function addProject(event){
        const projectTitle = document.forms['add-project-form']['project-title'].value
        const projectIcon = document.forms['add-project-form']['project-icon'].value

        event.preventDefault()

        if(projectTitle !== ''){
            project.createProject(projectTitle,projectIcon)
            dom.hideElement(dom.projectTitleError)
            dom.hideElement(dom.modals)

        }
        else if (projectTitle ===''){
            dom.showElement(dom.projectTitleError)
        }
    }

    function editProject(event, index){
        const projectTitle = document.forms['add-project-form']['project-title'].value
        const projectIcon = document.forms['add-project-form']['project-icon'].value

        event.preventDefault()

        if(projectTitle !== ''){
            project.editProject(index, projectTitle, projectIcon)
            dom.hideElement(dom.projectTitleError)
            dom.hideElement(dom.modals)
            }
        else if(projectTitle === ''){
            dom.showElement(dom.projectTitleError)
        }
    }

    function addTask(event){
        event.preventDefault()
        tasks.createTasks(0,'title','description','priority','date')
    }
    
    return{
        addProject,
        editProject,
        addTask,
    }
})();

export default validation