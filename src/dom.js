import project from "./projects";

const dom = (()=>{
    const body = document.querySelector('body')
    const projectList = document.querySelector('.sidebar-project-list')
    const projectModal = document.querySelector('#add-proj-modal')
    const confirmProjectModal = document.querySelector('#confirm-modal')
    const projectForm = document.querySelector('#add-project-form')
    const projectTitleError = document.querySelector('.title-error')
    const modals = document.querySelectorAll(".modal")
    const sidebar = document.querySelector('.sidebar')
    const main = document.querySelector('main')
    const todoList = document.querySelector('.todo-item-list')
    const taskModal = document.querySelector('#task-modal')

    function responsiveSidebar(){
        if (window.innerWidth <= 960){
            sidebar.classList.remove('sidebar-show')
            sidebar.classList.add('sidebar-hide')
            main.classList.remove('main-desktop')
            main.classList.add('main-mobile')
        }
        else{
            sidebar.classList.remove('sidebar-hide')
            sidebar.classList.add('sidebar-show')
            main.classList.add('main-desktop')
            main.classList.remove('main-mobile')
        }
    }

    function toggleSidebar(){
        if(!sidebar.classList.contains('sidebar-show')){
            sidebar.classList.remove('sidebar-hide')
            sidebar.classList.add('sidebar-show')
        }else if (sidebar.classList.contains('sidebar-show')){
            sidebar.classList.remove('sidebar-show')
            sidebar.classList.add('sidebar-hide')
        }
    }

    function showTaskModal(modal, index = false){
        const modalHead = document.querySelector('.task-modal-title')
        const modalSubmitButton = document.querySelector('#task-button')

        taskModal.classList.remove('hide')
        taskModal.classList.add('display')

        if(modal === 'addTask'){
            projectForm.reset()
            modalHead.textContent = 'New Task'
            modalSubmitButton.textContent = 'Add'
            modalSubmitButton.classList.remove('edit-task')
            modalSubmitButton.classList.add('add-task')
            
        }
        else if(modal ==='editTask'){
            const currentProjectTitle = project.projectList[index].title
            const currentProjectIcon = project.projectList[index].icon

            const projectTitle = document.querySelector('#form-project-title')
            const projectIcon = document.querySelector(`input[value=${currentProjectIcon}]`)

            projectTitle.value = currentProjectTitle
            projectIcon.checked = true

            modalHead.textContent = 'Edit Task'
            modalSubmitButton.textContent = 'Edit'
            modalSubmitButton.classList.remove('add-task')
            modalSubmitButton.classList.add('edit-task')
        }
    }

    function showProjectModal(modal, index = false){
        const modalHead = document.querySelector('.project-modal-title')
        const modalSubmitButton = document.querySelector('#project-button')

        projectModal.classList.remove('hide')
        projectModal.classList.add('display')

        if(modal === 'addProject'){
            projectForm.reset()
            modalHead.textContent = 'New Project'
            modalSubmitButton.textContent = 'Add'
            modalSubmitButton.classList.remove('edit-project')
            modalSubmitButton.classList.add('add-project')
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

    function showConfirmModal(modal, index){
        const modalHead = document.querySelector('.confirm-modal-title')
        const modalSubmitButton = document.querySelector('#confirm-button')
        const modalContent = document.querySelector('.confirm-modal-content')

        confirmProjectModal.classList.remove('hide')
        confirmProjectModal.classList.add('display')
        modalSubmitButton.textContent = 'Remove'

        const modalContentPre = document.createTextNode('You are removing ')
        const modalContentPost = document.createTextNode('. This action cannot be reverted.')

        modalContent.textContent = ''

        if(modal === 'removeProject'){
            modalHead.textContent = 'Remove Project'
            const projectTitle = document.createElement('span')
            projectTitle.classList.add('confirm-modal-project-title')
            projectTitle.textContent = project.projectList[index].title
            modalContent.appendChild(modalContentPre)
            modalContent.appendChild(projectTitle)
            modalContent.appendChild(modalContentPost)
            modalSubmitButton.classList.remove('remove-task')
            modalSubmitButton.classList.add('remove-project')
        }
        else if(modal === 'removeTask'){
            modalHead.textContent = 'Remove Task'
            modalContent.appendChild(modalContentPre)
            
            modalContent.appendChild(modalContentPost)
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
        const navLinks = document.querySelectorAll('a.sidebar-link')
        navLinks.forEach((element)=>{
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
        const projectLinks = document.querySelectorAll('a.sidebar-project');
        projectLinks.forEach((element)=>{
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
            projectIcon.classList.add('far', project.projectList[i].icon, 'fa-solid' ,'sidebar-project', 'sidebar-project-icon')
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

    function showTasks(projectIndex){
        todoList.textContent = ''
        for(let i = 0; i<project.projectList[projectIndex].tasks.length; i += 1){
            const todoItem = document.createElement('div')
            todoItem.classList.add('todo-item', 'toggle-todo')
            todoItem.setAttribute('data-project-index', projectIndex)
            todoList.appendChild(todoItem)

            //Icon
            const taskIcon =  document.createElement('i')
            taskIcon.classList.add('far', 'fa-regular', 'fa-circle', 'todo-icon', 'toggle-todo')
            todoItem.appendChild(taskIcon)

            //Title
            const taskTitle = document.createElement('p')
            taskTitle.classList.add('todo-title','toggle-todo')
            todoItem.appendChild(taskTitle)

            //Date
            const taskDate = document.createElement('p')
            taskDate.classList.add('todo-item-date', 'toggle-todo')
            todoItem.appendChild(taskDate)

            //Edit Icon
            const taskEditIcon = document.createElement('i')
            taskEditIcon.classList.add('far', 'fa-regular', 'fa-pen-to-square', 'edit-todo-modal')
            todoItem.appendChild(taskEditIcon)

            //Delete Icon
            const taskDeleteIcon = document.createElement('i')
            taskDeleteIcon.classList.add('far', 'fa-regular', 'fa-trash-can', 'remove-todo-modal')
            todoItem.appendChild(taskDeleteIcon)
        }
        const taskAdd = document.createElement('div')
        taskAdd.classList.add('todo-item-add', 'add-todo-modal')
        todoList.appendChild(taskAdd)
        const taskAddIcon = document.createElement('i')
        taskAddIcon.classList.add('far', 'fa-solid', 'fa-plus', 'todo-icon', 'add-todo-modal')
        taskAdd.appendChild(taskAddIcon)
        const taskAddTitle = document.createElement('p')
        taskAddTitle.classList.add('todo-title', 'add-todo-modal')
        taskAddTitle.textContent = 'Add New Task'
        taskAdd.appendChild(taskAddTitle)
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
        responsiveSidebar,
        toggleSidebar,
        showTasks,
        showTaskModal,
    }
})();

export default dom;