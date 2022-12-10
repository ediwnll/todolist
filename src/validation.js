import project from "./projects";
import dom from "./dom";

const validation = (()=>{
    function formValidate(){
        const projectTitle = document.forms['add-project-form']['project-title'].value
        const projectIcon = document.forms['add-project-form']['project-icon'].value

        if(projectTitle !== ''){
            project.createProject(projectTitle,projectIcon)
            dom.addProjectForm.reset()
            dom.hideElement(dom.addProjectTitleError)
            dom.hideElement(dom.addProjectModal)

        }
        else if (projectTitle ===''){
            dom.showElement(dom.addProjectTitleError)
        }
    }
    return{
        formValidate,
    }
})();

export default validation