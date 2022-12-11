import project from "./projects";

const dom = (()=>{
    const body = document.querySelector('body')
    const addProjectModal = document.querySelector('#add-proj-modal')
    const addProjectForm = document.querySelector('#add-project-form')
    const addProjectTitleError = document.querySelector('.title-error')
    const projectList = document.querySelector('.sidebar-project-list')
    const deleteProjectModal = document.querySelector('#delete-proj-modal')
    const modals = document.querySelectorAll(".modal")

    function showElement(element){
        element.classList.remove('hide')
        element.classList.add('display')
    }

    function hideElement(modal){
        if(Object.prototype.isPrototypeOf.call(NodeList.prototype,modal)){
            modals.forEach((element)=>{
                element.classList.remove('display')
                element.classList.add('hide')
            })
        }
        else{
            modal.classList.remove('display')
            modal.classList.add('hide')
        }
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

    function showProjects(){
        projectList.textContent =''
        for(let i = 0; i<project.projectList.length; i+= 1){

            //create project DOM
            const projectLink = document.createElement('a')
            projectLink.classList.add('sidebar-project')
            projectLink.setAttribute('href','#')
            projectLink.setAttribute('data-index', i)
            projectList.appendChild(projectLink)

            //create icon
            const projectIcon = document.createElement('i')
            projectIcon.classList.add('far', project.projectList[i].icon)
            projectLink.appendChild(projectIcon)

            //create name
            const projectName = document.createTextNode(project.projectList[i].title)
            projectLink.appendChild(projectName)

            //create delete icon
            const projectDeleteIcon = document.createElement('i')
            projectDeleteIcon.classList.add('far', 'fa-regular', 'fa-trash-can' ,'delete-proj-modal')
            projectLink.append(projectDeleteIcon)

            //create edit icon

            const projectEditIcon = document.createElement('i')
            projectEditIcon.classList.add('far', 'fa-regular', 'fa-pen-to-square','edit-proj-modal')
            projectLink.appendChild(projectEditIcon)
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
        deleteProjectModal,
        modals,
        showProjects,
        showElement,
        hideElement,
        activeLink,
        activeProject,
    }
})();

export default dom;