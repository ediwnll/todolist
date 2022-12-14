import project from "./projects";
import dom from "./dom";

const validation = (()=>{
    function addProject(event){
        const projectTitle = document.forms['add-project-form']['project-title'].value
        const projectIcon = document.forms['add-project-form']['project-icon'].value

        event.preventDefault()

        if(projectTitle !== ''){
            project.createProject(projectTitle,projectIcon)
            dom.hideElement(dom.projectTitleError)
            dom.hideElement(dom.projectModal)

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
        }
    }
    return{
        addProject,
        editProject,
    }
})();

export default validation