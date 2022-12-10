const dom = (()=>{
    const body = document.querySelector('body')
    const addProjectModal = document.querySelector('#add-proj-modal')
    const addProjectForm = document.querySelector('#add-project-form')
    const addProjectTitleError = document.querySelector('.title-error')

    function showElement(element){
        element.classList.remove('hide')
        element.classList.add('display')
    }

    function hideElement(element){
        element.classList.remove('display')
        element.classList.add('hide')
    }

    function activeLink(link){
        const navLink = document.querySelectorAll('.sidebar-link')
        navLink.forEach((element)=>{
            element.classList.remove('active')
        })
        if(link.classList.contains('far')){
            link.parentElement.classList.add('active')
        }
        else{
            link.classList.add('active')
        }
    }

    function activeProject(project){
        const projectLink = document.querySelectorAll('.sidebar-project');
        projectLink.forEach((element)=>{
            element.classList.remove('active')
        })
        if(project.classList.contains('fa-edit')){
            project.parentElement.classList.add('active')
        }
        else{
            project.classList.add('active')
        }
    }

    /*function activeProjectIcon(icon){
        const projectIcon = document.querySelectorAll('.project-icon')
        projectIcon.forEach((element)=>{
            element.classList.remove('active')
        })
        if(icon.classList.contains('far')){
            icon.parentElement.classList.add('active')
        }
        else{
            icon.classList.add('active')
        }
    }*/

    return{
        body,
        addProjectModal,
        addProjectForm,
        addProjectTitleError,
        showElement,
        hideElement,
        activeLink,
        activeProject,
    }
})();

export default dom;