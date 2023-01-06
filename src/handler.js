import dom from "./dom";
import validation from "./validation";
import project from "./projects";
import tasks from "./tasks";

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
        projectIndex = (e.target.getAttribute('data-index'))?e.target.getAttribute('data-index'):
        e.target.parentElement.getAttribute('data-index')
        dom.changeProject(projectIndex)
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
        taskIndex = (e.target.getAttribute('data-task-index')) ? e.target.getAttribute('data-task-index')
        :e.target.parentElement.getAttribute('data-task-index')
        tasks.toggleTask(projectIndex,taskIndex)
      }
      //Add task modal open
      else if(e.target.classList.contains("add-todo-modal")){
        console.log("Add task modal")
        projectIndex = (e.target.parentElement.getAttribute('data-project-index'))? e.target.parentElement.getAttribute('data-project-index'):
        e.target.getAttribute('data-project-index')
        dom.showTaskModal('addTask', projectIndex)
        //dom.showModal(dom.addTaskModal)
      }
      //Edit task modal
      else if(e.target.classList.contains("edit-todo-modal")){
        console.log("Edit task modal")
        taskIndex = e.target.parentElement.getAttribute('data-task-index')
        dom.showTaskModal('editTask', projectIndex, taskIndex)
        //dom.showModal(dom.editTaskModal)
      }
      //remove task modal
      else if(e.target.classList.contains("remove-todo-modal")){
        console.log("remove task")
        taskIndex = e.target.parentElement.getAttribute('data-task-index')
        dom.showConfirmModal('removeTask', projectIndex ,taskIndex)
      }
      //add task
      else if(e.target.classList.contains('add-task')){
        validation.addTask(e, projectIndex)
      }
      //remove task
      else if(e.target.classList.contains('remove-task')){
        console.log('remove task')
        tasks.removeTask(projectIndex,taskIndex)
      }
      //edit task
      else if(e.target.classList.contains('edit-task')){
        validation.editTask(e, projectIndex, taskIndex);
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
