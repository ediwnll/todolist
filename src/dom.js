const dom = (()=>{
    const body = document.querySelector('body')
    const addProjectModal = document.querySelector('#add-proj-modal')

    function showModal(modal){
        modal.classList.remove('hide')
        modal.classList.add('display')
    }

    function hideModal(modal){
        modal.classList.remove('display')
        modal.classList.add('hide')
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

    function activeProjectIcon(icon){
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
    }

    return{
        body,
        addProjectModal,
        showModal,
        hideModal,
        activeLink,
        activeProject,
        activeProjectIcon
    }
})();

export default dom;