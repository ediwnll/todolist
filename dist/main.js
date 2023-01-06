(()=>{"use strict";const t=(()=>{const t=[];class o{constructor(t,e){this.title=t,this.icon=e,this.tasks=[]}}return{projectList:t,createProject:function(s,a){const r=new o(s,a);t.push(r),console.log(t),e.showProjects(),e.changeProject(t.length-1)},removeProject:function(o){t.splice(o,1),e.hideElement(e.modals),e.showProjects(),e.changeProject(0)},editProject:function(o,s,a){t[o].title=s,t[o].icon=a,e.showProjects(),e.changeProject(o)}}})(),e=(()=>{const e=document.querySelector("body"),o=document.querySelectorAll(".modal"),s=document.querySelector(".sidebar"),a=document.querySelector("main"),r=document.querySelector(".sidebar-project-list"),d=document.querySelector("#add-proj-modal"),c=document.querySelector("#confirm-modal"),i=document.querySelector("#add-project-form"),n=document.querySelector(".project-title-error"),l=document.querySelector(".todo-item-list"),m=document.querySelector("#task-modal"),u=document.querySelector("#task-form"),p=document.querySelector(".task-title-error");function L(e){if(t.projectList.length>=1){const t=document.querySelectorAll("a.sidebar-project");t.forEach((t=>{t.classList.remove("active")})),t[e].classList.add("active")}}function j(e){if(l.textContent="",t.projectList.length>=1){for(let o=0;o<t.projectList[e].tasks.length;o+=1){const s=document.createElement("div");s.classList.add("todo-item","toggle-todo"),s.setAttribute("data-project-index",e),s.setAttribute("data-task-index",o),l.appendChild(s);const a=document.createElement("i");a.classList.add("far","fa-regular","toggle-todo"),"low"===t.projectList[e].tasks[o].priority?a.classList.add("green"):"medium"===t.projectList[e].tasks[o].priority?a.classList.add("yellow"):"high"===t.projectList[e].tasks[o].priority?a.classList.add("red"):a.classList.add("silver"),s.appendChild(a);const r=document.createElement("p");if(r.classList.add("todo-title","toggle-todo"),r.textContent=t.projectList[e].tasks[o].title,!0===t.projectList[e].tasks[o].done?a.classList.add("fa-circle-check"):a.classList.add("fa-circle"),s.appendChild(r),""!==t.projectList[e].tasks[o].schedule){const a=document.createElement("p");a.classList.add("todo-date","toggle-task"),a.textContent=t.projectList[e].tasks[o].schedule,s.appendChild(a)}const d=document.createElement("i");d.classList.add("far","fa-regular","fa-pen-to-square","edit-todo-modal"),s.appendChild(d);const c=document.createElement("i");c.classList.add("far","fa-regular","fa-trash-can","remove-todo-modal"),s.appendChild(c)}const o=document.createElement("div");o.setAttribute("data-project-index",e),o.classList.add("todo-item-add","add-todo-modal"),l.appendChild(o);const s=document.createElement("i");s.classList.add("far","fa-solid","fa-plus","add-todo-modal"),o.appendChild(s);const a=document.createElement("p");a.classList.add("todo-title","add-todo-modal"),a.textContent="Add New Task",o.appendChild(a)}}return{body:e,projectForm:i,projectTitleError:n,taskTitleError:p,projectModal:d,modals:o,showProjects:function(){r.textContent="";for(let e=0;e<t.projectList.length;e+=1){const o=document.createElement("a");o.classList.add("sidebar-project"),o.setAttribute("href","#"),o.setAttribute("data-index",e),r.appendChild(o);const s=document.createElement("i");s.classList.add("far",t.projectList[e].icon,"fa-solid","sidebar-project","sidebar-project-icon"),o.appendChild(s);const a=document.createTextNode(t.projectList[e].title);o.appendChild(a);const d=document.createElement("i");d.classList.add("far","fa-regular","fa-trash-can","delete-proj-modal"),o.append(d);const c=document.createElement("i");c.classList.add("far","fa-regular","fa-pen-to-square","edit-proj-modal"),o.appendChild(c)}},showElement:function(t){t.classList.remove("hide"),t.classList.add("display")},hideElement:function(t){Object.prototype.isPrototypeOf.call(NodeList.prototype,t)?t.forEach((t=>{t.classList.remove("display"),t.classList.add("hide")})):(t.classList.remove("display"),t.classList.add("hide"))},activeLink:function(t){document.querySelectorAll("a.sidebar-link").forEach((t=>{t.classList.remove("active")})),t.classList.contains("sidebar-link-icon")?t.parentElement.classList.add("active"):t.classList.add("active")},activeProject:L,confirmProjectModal:c,showConfirmModal:function(e,o,s){const a=document.querySelector(".confirm-modal-title"),r=document.querySelector("#confirm-button"),d=document.querySelector(".confirm-modal-content"),i=document.createElement("span");c.classList.remove("hide"),c.classList.add("display"),i.classList.add("confirm-modal-title"),r.textContent="Remove";const n=document.createTextNode("You are removing "),l=document.createTextNode(". This action cannot be reverted.");d.textContent="","removeProject"===e?(a.textContent="Remove Project",i.textContent=t.projectList[o].title,d.appendChild(n),d.appendChild(i),d.appendChild(l),r.classList.remove("remove-task"),r.classList.add("remove-project")):"removeTask"===e&&(a.textContent="Remove Task",i.textContent=t.projectList[o].tasks[s].title,d.appendChild(n),d.appendChild(i),d.appendChild(l),r.classList.remove("remove-project"),r.classList.add("remove-task"))},showProjectModal:function(e,o=!1){const s=document.querySelector(".project-modal-title"),a=document.querySelector("#project-button");if(d.classList.remove("hide"),d.classList.add("display"),"addProject"===e)i.reset(),s.textContent="New Project",a.textContent="Add",a.classList.remove("edit-project"),a.classList.add("add-project");else if("editProject"===e){const e=t.projectList[o].title,r=t.projectList[o].icon,d=document.querySelector("#form-project-title"),c=document.querySelector(`input[value=${r}]`);d.value=e,c.checked=!0,s.textContent="Edit Project",a.textContent="Edit",a.classList.remove("add-project"),a.classList.add("edit-project")}},responsiveSidebar:function(){window.innerWidth<=960?(s.classList.remove("sidebar-show"),s.classList.add("sidebar-hide"),a.classList.remove("main-desktop"),a.classList.add("main-mobile")):(s.classList.remove("sidebar-hide"),s.classList.add("sidebar-show"),a.classList.add("main-desktop"),a.classList.remove("main-mobile"))},toggleSidebar:function(){s.classList.contains("sidebar-show")?s.classList.contains("sidebar-show")&&(s.classList.remove("sidebar-show"),s.classList.add("sidebar-hide")):(s.classList.remove("sidebar-hide"),s.classList.add("sidebar-show"))},showTasks:j,showTaskModal:function(e,o=!1,s=!1){const a=document.querySelector(".task-modal-title"),r=document.querySelector("#task-button");if(m.classList.remove("hide"),m.classList.add("display"),"addTask"===e)u.reset(),a.textContent="New Task",r.textContent="Add",r.classList.remove("edit-task"),r.classList.add("add-task");else if("editTask"===e){const e=t.projectList[o].tasks[s].title,d=t.projectList[o].tasks[s].priority,c=t.projectList[o].tasks[s].schedule,i=document.querySelector("#form-task-title"),n=document.querySelector("#form-task-priority"),l=document.querySelector("#form-task-schedule");i.value=e,n.value=d,l.value=c,a.textContent="Edit Task",r.textContent="Edit",r.classList.remove("add-task"),r.classList.add("edit-task")}},changeProject:function(e){L(e),function(e){const o=document.querySelector(".todo-head-nav"),s=document.querySelector(".todo-head-project");t.projectList.length>=1?(s.textContent=t.projectList[e].title,o.textContent="Inbox"):(s.textContent="",o.textContent="Inbox")}(e),j(e)}}})(),o=(()=>{class o{constructor(t,e,o){this.title=t,this.priority=e,this.schedule=o,this.done=!1}}return{createTasks:function(s,a,r=0,d=0){const c=new o(a,r,d);t.projectList[s].tasks.push(c),e.showTasks(0),e.showTasks(s)},toggleTask:function(o,s){t.projectList[o].tasks[s].done?t.projectList[o].tasks[s].done=!1:t.projectList[o].tasks[s].done=!0,console.log(t.projectList[o].tasks[s].done),e.showTasks(o)},editTask:function(o,s,a,r,d){t.projectList[o].tasks[s].title=a,t.projectList[o].tasks[s].priority=r,t.projectList[o].tasks[s].schedule=d,e.showTasks(o)},removeTask:function(o,s){t.projectList[o].tasks.splice(s,1),e.hideElement(e.modals),e.showTasks(o)}}})(),s=function(o){const s=document.forms["add-project-form"]["project-title"].value,a=document.forms["add-project-form"]["project-icon"].value;o.preventDefault(),""!==s?(t.createProject(s,a),e.hideElement(e.projectTitleError),e.hideElement(e.modals)):""===s&&e.showElement(e.projectTitleError)},a=function(o,s){const a=document.forms["add-project-form"]["project-title"].value,r=document.forms["add-project-form"]["project-icon"].value;o.preventDefault(),""!==a?(t.editProject(s,a,r),e.hideElement(e.projectTitleError),e.hideElement(e.modals)):""===a&&e.showElement(e.projectTitleError)},r=function(t,s){const a=document.forms["task-form"]["task-title"].value,r=document.forms["task-form"]["task-priority"].value,d=document.forms["task-form"]["task-schedule"].value;t.preventDefault(),""!==a?(o.createTasks(s,a,r,d),e.hideElement(e.taskTitleError),e.hideElement(e.modals)):""===a&&e.showElement(e.taskTitleError)},d=function(t,s,a){const r=document.forms["task-form"]["task-title"].value,d=document.forms["task-form"]["task-priority"].value,c=document.forms["task-form"]["task-schedule"].value;t.preventDefault(),""!==r?(o.editTask(s,a,r,d,c),e.hideElement(e.taskTitleError),e.hideElement(e.modals)):""===r&&e.showElement(e.taskTitleError)},c=function(){window.addEventListener("resize",e.responsiveSidebar)};(function(){let c=0,i=0;e.body.addEventListener("click",(n=>{n.target.classList.contains("sidebar-link")?(console.log("nav link"),e.activeLink(n.target)):n.target.classList.contains("toggle-sidebar")?(console.log("Toggling Sidebar"),e.toggleSidebar()):n.target.classList.contains("sidebar-project")?(c=n.target.getAttribute("data-index")?n.target.getAttribute("data-index"):n.target.parentElement.getAttribute("data-index"),e.changeProject(c)):n.target.classList.contains("add-proj-modal")?(e.showProjectModal("addProject"),console.log("open proj modal")):n.target.classList.contains("edit-proj-modal")?(console.log("edit project modal"),c=n.target.parentElement.getAttribute("data-index"),e.showProjectModal("editProject",c)):n.target.classList.contains("delete-proj-modal")?(console.log("Delete project modal"),c=n.target.parentElement.getAttribute("data-index"),e.showConfirmModal("removeProject",c)):n.target.classList.contains("close")||n.target.classList.contains("modal")?e.hideElement(e.modals):n.target.classList.contains("add-project")?(console.log("add project"),s(n)):n.target.classList.contains("edit-project")?(console.log("editing project"),a(n,c)):n.target.classList.contains("remove-project")?t.removeProject(c):n.target.classList.contains("toggle-todo")?(console.log("Toggle task"),i=n.target.getAttribute("data-task-index")?n.target.getAttribute("data-task-index"):n.target.parentElement.getAttribute("data-task-index"),o.toggleTask(c,i)):n.target.classList.contains("add-todo-modal")?(console.log("Add task modal"),c=n.target.parentElement.getAttribute("data-project-index")?n.target.parentElement.getAttribute("data-project-index"):n.target.getAttribute("data-project-index"),e.showTaskModal("addTask",c)):n.target.classList.contains("edit-todo-modal")?(console.log("Edit task modal"),i=n.target.parentElement.getAttribute("data-task-index"),e.showTaskModal("editTask",c,i)):n.target.classList.contains("remove-todo-modal")?(console.log("remove task"),i=n.target.parentElement.getAttribute("data-task-index"),e.showConfirmModal("removeTask",c,i)):n.target.classList.contains("add-task")?r(n,c):n.target.classList.contains("remove-task")?(console.log("remove task"),o.removeTask(c,i)):n.target.classList.contains("edit-task")&&d(n,c,i)}))})(),e.showProjects(),e.responsiveSidebar(),e.changeProject(0,0),c(),console.log("Hello World")})();