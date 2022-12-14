(()=>{"use strict";const e=(()=>{const e=[];class o{constructor(e,t){this.title=e,this.icon=t,this.task=[]}}return{projectList:e,createProject:function(c,s){const r=new o(c,s);e.push(r),console.log(e),t.showProjects()},removeProject:function(o){e.splice(o,1),t.hideElement(t.modals),t.showProjects()},editProject:function(o,c,s){e[o].title=c,e[o].icon=s,t.showProjects()}}})(),t=(()=>{const t=document.querySelector("body"),o=document.querySelector("#add-proj-modal"),c=document.querySelector("#add-project-form"),s=document.querySelector(".title-error"),r=document.querySelector(".sidebar-project-list"),a=document.querySelector("#delete-proj-modal"),d=document.querySelectorAll(".modal");return{body:t,projectForm:c,projectTitleError:s,projectModal:o,modals:d,showProjects:function(){r.textContent="";for(let t=0;t<e.projectList.length;t+=1){const o=document.createElement("a");o.classList.add("sidebar-project"),o.setAttribute("href","#"),o.setAttribute("data-index",t),r.appendChild(o);const c=document.createElement("i");c.classList.add("far",e.projectList[t].icon,"sidebar-project","sidebar-project-icon"),o.appendChild(c);const s=document.createTextNode(e.projectList[t].title);o.appendChild(s);const a=document.createElement("i");a.classList.add("far","fa-regular","fa-trash-can","delete-proj-modal"),o.append(a);const d=document.createElement("i");d.classList.add("far","fa-regular","fa-pen-to-square","edit-proj-modal"),o.appendChild(d)}},showElement:function(e){e.classList.remove("hide"),e.classList.add("display")},hideElement:function(e){Object.prototype.isPrototypeOf.call(NodeList.prototype,e)?e.forEach((e=>{e.classList.remove("display"),e.classList.add("hide")})):(e.classList.remove("display"),e.classList.add("hide"))},activeLink:function(e){document.querySelectorAll("a.sidebar-link").forEach((e=>{e.classList.remove("active")})),e.classList.contains("sidebar-link-icon")?e.parentElement.classList.add("active"):e.classList.add("active")},activeProject:function(e){document.querySelectorAll("a.sidebar-project").forEach((e=>{e.classList.remove("active")})),e.classList.contains("sidebar-project-icon")?e.parentElement.classList.add("active"):e.classList.add("active")},confirmProjectModal:a,showConfirmModal:function(e){const t=document.querySelector(".confirm-modal-title"),o=document.querySelector("#confirm-button");a.classList.remove("hide"),a.classList.add("display"),o.textContent="Remove","removeProject"===e?(t.textContent="Remove Project",o.classList.remove("remove-task"),o.classList.add("remove-project")):"removeTask"===e&&(t.textContent="Remove Task",o.classList.remove("remove-project"),o.classList.remove("remove-task"))},showProjectModal:function(t,s=!1){const r=document.querySelector(".project-modal-title"),a=document.querySelector("#project-button");if(o.classList.remove("hide"),o.classList.add("display"),"addProject"===t)c.reset(),r.textContent="New Project",a.classList.remove("edit-project"),a.classList.add("add-project"),a.textContent="Add";else if("editProject"===t){const t=e.projectList[s].title,o=e.projectList[s].icon,c=document.querySelector("#form-project-title"),d=document.querySelector(`input[value=${o}]`);c.value=t,d.checked=!0,r.textContent="Edit Project",a.textContent="Edit",a.classList.remove("add-project"),a.classList.add("edit-project")}}}})(),o=function(o){const c=document.forms["add-project-form"]["project-title"].value,s=document.forms["add-project-form"]["project-icon"].value;o.preventDefault(),""!==c?(e.createProject(c,s),t.hideElement(t.projectTitleError),t.hideElement(t.projectModal)):""===c&&t.showElement(t.projectTitleError)},c=function(o,c){const s=document.forms["add-project-form"]["project-title"].value,r=document.forms["add-project-form"]["project-icon"].value;o.preventDefault(),""!==s&&(e.editProject(c,s,r),t.hideElement(t.projectTitleError))};(function(){let s;t.body.addEventListener("click",(r=>{r.target.classList.contains("sidebar-link")?(console.log("nav link"),t.activeLink(r.target)):r.target.classList.contains("sidebar-project")?(console.log("sidebar project"),console.log(r.target),t.activeProject(r.target)):r.target.classList.contains("add-proj-modal")?(t.showProjectModal("addProject"),console.log("open proj modal")):r.target.classList.contains("edit-proj-modal")?(console.log("edit project modal"),s=r.target.parentElement.getAttribute("data-index"),t.showProjectModal("editProject",s)):r.target.classList.contains("delete-proj-modal")?(console.log("Delete project modal"),s=r.target.parentElement.getAttribute("data-index"),t.showProjectModal("removeProject")):r.target.classList.contains("add-todo-modal")?console.log("Add task modal"):r.target.classList.contains("edit-todo-modal")?console.log("Edit task modal"):r.target.classList.contains("close")||r.target.classList.contains("modal")?t.hideElement(t.modals):"add-project"===r.target.id?(console.log("add project"),o(r)):"edit-project"===r.target.id?(console.log("editing project"),c(r,s)):"remove-project"===r.target.id?e.removeProject(s):r.target.classList.contains("toggle-todo")?console.log("Toggle task"):r.target.classList.contains("remove-todo")&&console.log("remove task")}))})(),t.showProjects(),console.log("Hello World")})();