import dom from "./dom";
import validation from "./validation";
import project from "./projects";

const handler = (() => {
  function clickHandler() {

    let projectIndex = 0
    let taskIndex = 0
    dom.body.addEventListener("click", (e) => {
      //Nav
      if (e.target.classList.contains("sidebar-link")) {
        console.log("nav link");
        dom.activeLink(e.target);
      }
      //Toggle Sidebar
      else if(e.target.classList.contains('toggle-sidebar')){
        console.log('Toggling Sidebar')
        dom.toggleSidebar()
      }
      //Sidebar Project
      else if (e.target.classList.contains("sidebar-project")) {
        console.log("sidebar project");
        console.log(e.target);
        dom.activeProject(e.target);
      }
      //Open add project modal
      else if (e.target.classList.contains("add-proj-modal")) {
        dom.showProjectModal('addProject');
        console.log("open proj modal");
      }
      //Edit project modal
      else if(e.target.classList.contains("edit-proj-modal")){
        console.log("edit project modal")
        projectIndex = e.target.parentElement.getAttribute('data-index');
        dom.showProjectModal('editProject', projectIndex)
        //dom.showELement(dom.editProjectModal)
      }
      //Delete project modal
      else if(e.target.classList.contains("delete-proj-modal")){
        console.log("Delete project modal")
        projectIndex = e.target.parentElement.getAttribute('data-index')
        dom.showConfirmModal('removeProject', projectIndex)
      }
      //Add task modal open
      else if(e.target.classList.contains("add-todo-modal")){
        console.log("Add task modal")
        //dom.showModal(dom.addTaskModal)
      }
      //Edit task modal
      else if(e.target.classList.contains("edit-todo-modal")){
        console.log("Edit task modal")
        //dom.showModal(dom.editTaskModal)
      }
      //close modal
      else if (
        e.target.classList.contains("close") ||
        e.target.classList.contains("modal")
      ) {
        dom.hideElement(dom.modals);
      }
      //Add project
      else if(e.target.classList.contains('add-project')){
        console.log("add project")
        validation.addProject(e)
      }
      //Edit project
      else if(e.target.classList.contains('edit-project')){
        console.log("editing project")
        validation.editProject(e, projectIndex)
      }
      //remove project
      else if(e.target.classList.contains('remove-project')){
        project.removeProject(projectIndex)
      }
      //toggle task
      else if(e.target.classList.contains("toggle-todo")){
        console.log("Toggle task")
      }
      //remove task
      else if(e.target.classList.contains("remove-todo")){
        console.log("remove task")
        dom.showConfirmModal('removeTask', taskIndex)
      }
    });
  }

  function keyboardHandler(){
    document.addEventListener('keyup', (event)=>{
        if(event.key === 'Escape'){
            dom.hideElement(dom.modals)
        }
    })
  }
  function resizeHandler(){
    window.addEventListener('resize', dom.responsiveSidebar)
  }
  return {
    clickHandler,
    keyboardHandler,
    resizeHandler,
  };
})();

export default handler;
