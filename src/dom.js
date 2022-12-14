import project from "./projects";

const dom = (()=>{
    const body = document.querySelector('body')
    const projectModal = document.querySelector('#add-proj-modal')
    const projectForm = document.querySelector('#add-project-form')
    const projectTitleError = document.querySelector('.title-error')
    const projectList = document.querySelector('.sidebar-project-list')
    const confirmProjectModal = document.querySelector('#delete-proj-modal')
    const modals = document.querySelectorAll(".modal")

    function showProjectModal(modal, index=false){
        const modalHead = document.querySelector('.project-modal-title')
        const modalSubmitButton = document.querySelector('#project-button')

        projectModal.classList.remove('hide')
        projectModal.classList.add('display')

        if(modal === 'addProject'){
            projectForm.reset()
            modalHead.textContent = 'New Project'
            modalSubmitButton.classList.remove('edit-project')
            modalSubmitButton.classList.add('add-project')
            modalSubmitButton.textContent = 'Add'
        }
        else if(modal ==='editProject'){
            const currentProjectTitle = project.projectList[index].title
            const currentProjectIcon = project.projectList[index].icon

            const projectTitle = document.querySelector('#form-project-title')
            const projectIcon = document.querySelector(`input[value=${currentProjectIcon}]`)

            projectTitle.value = currentProjectTitle
            projectIcon.checked = true

            modalHead.textContent = 'Edit Project'
            modalSubmitButton.textContent = 'Edit'
            modalSubmitButton.classList.remove('add-project')
            modalSubmitButton.classList.add('edit-project')
        }
    }

    function showConfirmModal(modal){
        const modalHead = document.querySelector('.confirm-modal-title')
        const modalSubmitButton = document.querySelector('#confirm-button')

        confirmProjectModal.classList.remove('hide')
        confirmProjectModal.classList.add('display')
        modalSubmitButton.textContent = 'Remove'

        if(modal === 'removeProject'){
            modalHead.textContent = 'Remove Project'
            modalSubmitButton.classList.remove('remove-task')
            modalSubmitButton.classList.add('remove-project')
        }
        else if(modal === 'removeTask'){
            modalHead.textContent = 'Remove Task'
            modalSubmitButton.classList.remove('remove-project')
            modalSubmitButton.classList.remove('remove-task')
        }
    }

    function showElement(element){
        element.classList.remove('hide')
        element.classList.add('display')
    }

    function hideElement(modal){
        if(Object.prototype.isPrototypeOf.call(NodeList.prototype,modal)){
            modal.forEach((element)=>{
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
        const navLink = document.querySelectorAll('a.sidebar-link')
        navLink.forEach((element)=>{
            element.classList.remove('active')
        })
        if(link.classList.contains('sidebar-link-icon')){
            link.parentElement.classList.add('active')
        }
        else{
            link.classList.add('active')
        }
    }

    function activeProject(project){
        const projectLink = document.querySelectorAll('a.sidebar-project');
        projectLink.forEach((element)=>{
            element.classList.remove('active')
        })
        if(project.classList.contains('sidebar-project-icon')){
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
            projectIcon.classList.add('far', project.projectList[i].icon, 'sidebar-project', 'sidebar-project-icon')
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
        projectForm,
        projectTitleError,
        projectModal,
        modals,
        showProjects,
        showElement,
        hideElement,
        activeLink,
        activeProject,
        confirmProjectModal,
        showConfirmModal,
        showProjectModal,
    }
})();

export default dom;