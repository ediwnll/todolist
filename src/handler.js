import dom from "./dom";

const handler = (() => {
  function clickHandler() {
    dom.body.addEventListener("click", (e) => {
      //Nav
      if (e.target.classList.contains("sidebar-link")) {
        console.log("nav link");
        dom.activeLink(e.target);
      }
      //Sidebar Project
      else if (e.target.classList.contains("sidebar-project")) {
        console.log("sidebar project");
        console.log(e.target);
        dom.activeProject(e.target);
      }
      //Open add project modal
      else if (e.target.classList.contains("add-proj-modal")) {
        dom.showModal(dom.addProjectModal);
        console.log("open proj modal");
      }
      //close modal
      else if (
        e.target.classList.contains("close") ||
        e.target.classList.contains("modal")
      ) {
        dom.hideModal(dom.addProjectModal);
      }
      //Add project icon
      else if (e.target.classList.contains("project-icon")) {
        dom.activeProjectIcon(e.target);
        console.log("Select project icon");
      }
      //Edit project modal
      else if(e.target.classList.contains("edit-proj-modal")){
        console.log("edit project modal")
        //dom.showModal(dom.editProjectModal)
      }
      //Delete project modal
      else if(e.target.classList.contains("delete-proj-modal")){
        console.log("Delete project modal")
        //dom.showModal(dom.deleteProjectModal)
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
      //Add project
      else if(e.target.id === "add-project"){
        console.log("add project")
        e.preventDefault()
      }
      //remove project
      else if(e.target.classList.contains("remove-project")){
        console.log("remove project")
      }
      //toggle task
      else if(e.target.classList.contains("toggle-todo")){
        console.log("Toggle task")
      }
      //remove task
      else if(e.target.classList.contains("remove-todo")){
        console.log("remove task")
      }
    });
  }

  function keyboardHandler(){
    document.addEventListener('keyup', (event)=>{
        if(event.key === 'Escape'){
            dom.hideModal(dom.addProjectModal)
        }
    })
  }
  return {
    clickHandler,
    keyboardHandler,
  };
})();

export default handler;
