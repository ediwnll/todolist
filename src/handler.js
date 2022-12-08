import dom from "./dom";

const handler = (()=>{
    function clickHandler(){
        dom.body.addEventListener('click',(e)=>{
            //Nav
            if(e.target.classList.contains('sidebar-link')){
                console.log('nav link')
                dom.activeLink(e.target)
            }
            //Sidebar Project
            else if(e.target.classList.contains('sidebar-project')){
                console('sidebar project')
                dom.activeProject(e.target)
            }
            //Open add project modal
            else if(e.target.classList.contains('add-proj-modal')){
                dom.showModal(dom.addProjectModal)
                console.log('open proj modal')
            }
            //close modal
            else if(e.target.classList.contains('close') || e.target.classList.contains('modal')){
                dom.hideModal(dom.addProjectModal)
            }
            //Add project icon
            else if(e.target.classList.contains('project-icon')){
                dom.activeProjectIcon(e.target)
                console.log('Select project icon')
            }
            //Continue tomorrow
        })
    }
    return{
        clickHandler
    }
})();

export default handler;