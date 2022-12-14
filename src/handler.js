import dom from "./dom";
import validation from "./validation";
import project from "./projects";
import tasks from "./tasks";

const handler = (() => {
  function clickHandler() {

    let projectIndex = 0
    let taskIndex = 0
    let link = 'inbox'
    dom.body.addEventListener("click", (e) => {
      //Toggle Sidebar
      if(e.target.classList.contains('toggle-sidebar')){
        console.log('Toggling Sidebar')
        dom.toggleSidebar()
      }
      //Nav Links
      else if(e.target.classList.contains('sidebar-inbox')){
        console.log("nav inbox");
        link = 'inbox'
        dom.changeProject('inbox')
      }
      else if(e.target.classList.contains('sidebar-today')){
        console.log('today')
        link = 'today'
        dom.changeProject('today')
      }
      else if(e.target.classList.contains('sidebar-week')){
        console.log('week')
        link = 'week'
        dom.changeProject('week')
        
      }
      else if(e.target.classList.contains('sidebar-important')){
        link = 'important'
        dom.changeProject('important')
      }
      else if(e.target.classList.contains('sidebar-done')){
        link = 'completed'
        dom.changeProject('completed')
      }
      //Sidebar Project
      else if (e.target.classList.contains("sidebar-project")) {
        link = undefined
        projectIndex = parseInt((e.target.getAttribute('data-index'))?e.target.getAttribute('data-index'):
        e.target.parentElement.getAttribute('data-index'),10)
        dom.changeProject(projectIndex)
      }
      //Open add project modal
      else if (e.target.classList.contains("add-proj-modal")) {
        link = undefined
        dom.showProjectModal('addProject');
        console.log("open proj modal");
      }
      //Edit project modal
      else if(e.target.classList.contains("edit-proj-modal")){
        
        console.log("edit project modal")
        projectIndex = parseInt(e.target.parentElement.getAttribute('data-index'), 10);
        dom.showProjectModal('editProject', projectIndex)
        //dom.showELement(dom.editProjectModal)
      }
      //Delete project modal
      else if(e.target.classList.contains("delete-proj-modal")){
        console.log("Delete project modal")
        projectIndex = parseInt(e.target.parentElement.getAttribute('data-index'), 10);
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
        validation.editProject(e, projectIndex, link)
      }
      //remove project
      else if(e.target.classList.contains('remove-project')){
        console.log("remove project")
        project.removeProject(projectIndex)
      }
      //toggle task
      else if(e.target.classList.contains("toggle-todo")){
        console.log("Toggle task")
        projectIndex = parseInt((e.target.getAttribute('data-project-index')) ? e.target.getAttribute('data-project-index')
        :e.target.parentElement.getAttribute('data-project-index'), 10)
        taskIndex = parseInt((e.target.getAttribute('data-task-index')) ? e.target.getAttribute('data-task-index')
        :e.target.parentElement.getAttribute('data-task-index'), 10)
        tasks.toggleTask(projectIndex,taskIndex, link)
      }
      //Add task modal open
      else if(e.target.classList.contains("add-todo-modal")){
        console.log("Add task modal")
        projectIndex = parseInt((e.target.parentElement.getAttribute('data-project-index'))? e.target.parentElement.getAttribute('data-project-index'):
        e.target.getAttribute('data-project-index'),10)
        dom.showTaskModal('addTask', projectIndex)
        //dom.showModal(dom.addTaskModal)
      }
      //Edit task modal
      else if(e.target.classList.contains("edit-todo-modal")){
        console.log("Edit task modal")
        taskIndex = parseInt(e.target.parentElement.getAttribute('data-task-index'),10)
        dom.showTaskModal('editTask', projectIndex, taskIndex)
        //dom.showModal(dom.editTaskModal)
      }
      //remove task modal
      else if(e.target.classList.contains("remove-todo-modal")){
        console.log("remove task")
        projectIndex = parseInt(e.target.parentElement.getAttribute('data-project-index'), 10)
        taskIndex = parseInt(e.target.parentElement.getAttribute('data-task-index'),10)
        dom.showConfirmModal('removeTask', projectIndex ,taskIndex)
      }
      //add task
      else if(e.target.classList.contains('add-task')){
        validation.addTask(e, projectIndex)
      }
      //remove task
      else if(e.target.classList.contains('remove-task')){
        console.log('remove task')
        tasks.removeTask(projectIndex,taskIndex, link)
      }
      //edit task
      else if(e.target.classList.contains('edit-task')){
        validation.editTask(e, projectIndex, taskIndex, link);
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
