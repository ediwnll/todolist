import project from "./projects";
import {format, differenceInDays, parseISO} from 'date-fns'

const dom = (() => {
  const body = document.querySelector("body");
  const modals = document.querySelectorAll(".modal");
  const sidebar = document.querySelector(".sidebar");
  const main = document.querySelector("main");
  const projectList = document.querySelector(".sidebar-project-list");
  const projectModal = document.querySelector("#add-proj-modal");
  const confirmProjectModal = document.querySelector("#confirm-modal");
  const projectForm = document.querySelector("#add-project-form");
  const projectTitleError = document.querySelector(".project-title-error");
  const todoList = document.querySelector(".todo-item-list");
  const taskModal = document.querySelector("#task-modal");
  const taskForm = document.querySelector("#task-form");
  const taskTitleError = document.querySelector(".task-title-error");
  const taskProjectError = document.querySelector(".task-project-error");

  /*Sidebar and other functions*/

  function responsiveSidebar() {
    if (window.innerWidth <= 960) {
      sidebar.classList.remove("sidebar-show");
      sidebar.classList.add("sidebar-hide");
      main.classList.remove("main-desktop");
      main.classList.add("main-mobile");
    } else {
      sidebar.classList.remove("sidebar-hide");
      sidebar.classList.add("sidebar-show");
      main.classList.add("main-desktop");
      main.classList.remove("main-mobile");
    }
  }

  function toggleSidebar() {
    if (!sidebar.classList.contains("sidebar-show")) {
      sidebar.classList.remove("sidebar-hide");
      sidebar.classList.add("sidebar-show");
    } else if (sidebar.classList.contains("sidebar-show")) {
      sidebar.classList.remove("sidebar-show");
      sidebar.classList.add("sidebar-hide");
    }
  }

  function showElement(element) {
    element.classList.remove("hide");
    element.classList.add("display");
  }

  function hideElement(modal) {
    if (Object.prototype.isPrototypeOf.call(NodeList.prototype, modal)) {
      modal.forEach((element) => {
        element.classList.remove("display");
        element.classList.add("hide");
      });
    } else {
      modal.classList.remove("display");
      modal.classList.add("hide");
    }
  }

  function showConfirmModal(modal, projectIndex, taskIndex) {
    const modalHead = document.querySelector(".confirm-modal-title");
    const modalSubmitButton = document.querySelector("#confirm-button");
    const modalContent = document.querySelector(".confirm-modal-content");
    const title = document.createElement("span");

    confirmProjectModal.classList.remove("hide");
    confirmProjectModal.classList.add("display");

    title.classList.add("confirm-modal-title");
    modalSubmitButton.textContent = "Remove";

    const modalContentPre = document.createTextNode("You are removing ");
    const modalContentPost = document.createTextNode(
      ". This action cannot be reverted."
    );

    modalContent.textContent = "";

    if (modal === "removeProject") {
      modalHead.textContent = "Remove Project";
      title.textContent = project.projectList[projectIndex].title;
      modalContent.appendChild(modalContentPre);
      modalContent.appendChild(title);
      modalContent.appendChild(modalContentPost);
      modalSubmitButton.classList.remove("remove-task");
      modalSubmitButton.classList.add("remove-project");
    } else if (modal === "removeTask") {
      modalHead.textContent = "Remove Task";
      title.textContent =
        project.projectList[projectIndex].tasks[taskIndex].title;
      modalContent.appendChild(modalContentPre);
      modalContent.appendChild(title);
      modalContent.appendChild(modalContentPost);
      modalSubmitButton.classList.remove("remove-project");
      modalSubmitButton.classList.add("remove-task");
    }
  }

  //select link
  function activeProject(projectIndex) {
    const allLink = document.querySelectorAll(
      "a.sidebar-project, a.sidebar-link"
    );
    const inboxLink = document.querySelector(".sidebar-inbox");
    const todayLink = document.querySelector(".sidebar-today");
    const weekLink = document.querySelector(".sidebar-week");
    const importantLink = document.querySelector(".sidebar-important");
    const doneLink = document.querySelector(".sidebar-done");
    const projectLinks = document.querySelectorAll("a.sidebar-project");
    allLink.forEach((element) => {
      element.classList.remove("active");
    });
    if (typeof projectIndex === "number") {
      projectLinks[projectIndex].classList.add("active");
    } else if (projectIndex === "inbox") {
      inboxLink.classList.add("active");
    } else if (projectIndex === "today") {
      todayLink.classList.add("active");
    } else if (projectIndex === "week") {
      weekLink.classList.add("active");
    } else if (projectIndex === "important") {
      importantLink.classList.add("active");
    } else if (projectIndex === "completed") {
      doneLink.classList.add("active");
    }
  }

  function renderHeader(projectIndex) {
    const headerNav = document.querySelector(".todo-head-nav");
    //const headerProject = document.querySelector(".todo-head-project");

    if (typeof projectIndex === "number") {
      headerNav.textContent = project.projectList[projectIndex].title;
      document.title = `${project.projectList[projectIndex].title} - TODO`
    } else {
      headerNav.textContent =
        projectIndex[0].toUpperCase() + projectIndex.substring(1);
      document.title = `${projectIndex[0].toUpperCase() + projectIndex.substring(1)} - TODO`
    }
  }

  //change link
  function changeProject(projectIndex) {
    activeProject(projectIndex);
    renderHeader(projectIndex);
    showTasks(projectIndex);
  }

  /*Project functions*/

  function showProjectModal(modal, index = false) {
    const modalHead = document.querySelector(".project-modal-title");
    const modalSubmitButton = document.querySelector("#project-button");

    projectForm.reset();
    dom.hideElement(dom.projectTitleError);

    projectModal.classList.remove("hide");
    projectModal.classList.add("display");

    if (modal === "addProject") {
      modalHead.textContent = "New Project";
      modalSubmitButton.textContent = "Add";
      modalSubmitButton.classList.remove("edit-project");
      modalSubmitButton.classList.add("add-project");
    } else if (modal === "editProject") {
      const currentProjectTitle = project.projectList[index].title;
      const currentProjectIcon = project.projectList[index].icon;

      const projectTitle = document.querySelector("#form-project-title");
      const projectIcon = document.querySelector(
        `input[value=${currentProjectIcon}]`
      );

      projectTitle.value = currentProjectTitle;
      projectIcon.checked = true;

      modalHead.textContent = "Edit Project";
      modalSubmitButton.textContent = "Edit";
      modalSubmitButton.classList.remove("add-project");
      modalSubmitButton.classList.add("edit-project");
    }
  }

  function showProjects() {
    projectList.textContent = "";
    for (let i = 0; i < project.projectList.length; i += 1) {
      //create project DOM
      const projectLink = document.createElement("a");
      projectLink.classList.add("sidebar-project");
      projectLink.setAttribute("href", "#");
      projectLink.setAttribute("data-index", i);
      projectList.appendChild(projectLink);

      //create icon
      const projectIcon = document.createElement("i");
      projectIcon.classList.add(
        "far",
        project.projectList[i].icon,
        "fa-solid",
        "sidebar-project",
        "sidebar-project-icon"
      );
      projectLink.appendChild(projectIcon);

      //create name
      //const projectName = document.createTextNode(project.projectList[i].title);
      //projectLink.appendChild(projectName);
      const projectName = document.createElement('p')
      projectName.classList.add('sidebar-project');
      projectName.innerText = project.projectList[i].title;
      projectLink.appendChild(projectName);

      //create delete icon
      const projectDeleteIcon = document.createElement("i");
      projectDeleteIcon.classList.add(
        "far",
        "fa-regular",
        "fa-trash-can",
        "delete-proj-modal"
      );
      projectLink.append(projectDeleteIcon);

      //create edit icon

      const projectEditIcon = document.createElement("i");
      projectEditIcon.classList.add(
        "far",
        "fa-regular",
        "fa-pen-to-square",
        "edit-proj-modal"
      );
      projectLink.appendChild(projectEditIcon);
    }
  }

  /*Tasks functions*/

  function showTaskModal(modal, projectIndex, taskIndex = false) {
    const modalHead = document.querySelector(".task-modal-title");
    const selectProject = document.querySelector("#select-project");
    const modalSubmitButton = document.querySelector("#task-button");

    taskForm.reset();
    dom.hideElement(dom.taskTitleError);
    dom.hideElement(dom.taskProjectError);

    taskModal.classList.remove("hide");
    taskModal.classList.add("display");

    if (modal === "addTask") {
      modalHead.textContent = "New Task";

      selectProject.innerText = "";
      if (Number.isNaN(projectIndex)) {
        const createLabel = document.createElement("label");
        createLabel.id = "form-label";
        createLabel.innerText = "Project *";
        createLabel.setAttribute("for", "form-task-project");
        selectProject.appendChild(createLabel);

        const createSelect = document.createElement("select");
        createSelect.id = "form-task-project";
        createSelect.setAttribute("name", "task-project");
        selectProject.appendChild(createSelect);

        const createOption = document.createElement("option");
        createOption.setAttribute("value", "");
        createOption.selected = true;
        createOption.disabled = true;
        createOption.innerText = "Select Project";

        createSelect.appendChild(createOption);
        for (let i = 0; i < project.projectList.length; i += 1) {
          const newOption = document.createElement("option");
          newOption.setAttribute("value", i);
          newOption.innerText = project.projectList[i].title;
          createSelect.appendChild(newOption);
        }
      }

      modalSubmitButton.textContent = "Add";
      modalSubmitButton.classList.remove("edit-task");
      modalSubmitButton.classList.add("add-task");
    } else if (modal === "editTask") {
      const currentTaskTitle =
        project.projectList[projectIndex].tasks[taskIndex].title;
      const currentTaskPriority =
        project.projectList[projectIndex].tasks[taskIndex].priority;
      const currentTaskSchedule =
        project.projectList[projectIndex].tasks[taskIndex].schedule;

      const taskTitle = document.querySelector("#form-task-title");
      const taskPriority = document.querySelector("#form-task-priority");
      const taskSchedule = document.querySelector("#form-task-schedule");

      modalHead.textContent = 'Edit Task'

      taskTitle.value = currentTaskTitle;
      taskPriority.value = currentTaskPriority;
      taskSchedule.value = currentTaskSchedule;

      selectProject.innerText = ''
      const createLabel = document.createElement('label')
      createLabel.id = 'form-label'
      createLabel.innerText = 'Project'
      createLabel.setAttribute('for', 'form-task-project')
      selectProject.appendChild(createLabel)

      const createSelect = document.createElement('select')
      createSelect.id = 'form-task-project'
      createSelect.disabled = true
      selectProject.appendChild(createSelect)

      const createOption = document.createElement('option')
      createOption.selected = true
      createOption.innerText = project.projectList[projectIndex].title

      createSelect.appendChild(createOption)
      
      modalSubmitButton.textContent = "Edit";
      modalSubmitButton.classList.remove("add-task");
      modalSubmitButton.classList.add("edit-task");
    }
  }

  function showTasks(projectIndex) {
    let indexStart;
    let indexEnd;
    const currentDate = format(new Date(), 'yyyy-MM-dd')
    todoList.textContent = "";

    if (project.projectList.length >= 1) {
      if (typeof projectIndex === "number") {
        indexStart = projectIndex;
        indexEnd = projectIndex + 1;
      } else {
        indexStart = 0;
        indexEnd = project.projectList.length;
      }
      for (let a = indexStart; a < indexEnd; a += 1) {
        for (let i = 0; i < project.projectList[a].tasks.length; i += 1) {
          if (
            projectIndex === "today" &&
            project.projectList[a].tasks[i].schedule !== currentDate
          ) {
            continue;
          } else if (
            projectIndex === "week" &&
            !(differenceInDays(parseISO(project.projectList[a].tasks[i].schedule), parseISO(currentDate)) >= 0 && differenceInDays(parseISO(project.projectList[a].tasks[i].schedule), parseISO(currentDate)) <= 7)
          ) {
            continue;
          } else if (
            projectIndex === "important" &&
            project.projectList[a].tasks[i].priority !== "high"
          ) {
            continue;
          } else if (
            projectIndex === "completed" &&
            project.projectList[a].tasks[i].done !== true
          ) {
            continue;
          }
          const todoItem = document.createElement("div");
          todoItem.classList.add("todo-item", "toggle-todo");
          todoItem.setAttribute("data-project-index", a);
          todoItem.setAttribute("data-task-index", i);
          todoList.appendChild(todoItem);

          //Create Icon
          const taskIcon = document.createElement("i");
          taskIcon.classList.add("far", "fa-regular", "toggle-todo");
          if (project.projectList[a].tasks[i].priority === "low") {
            taskIcon.classList.add("green");
          } else if (project.projectList[a].tasks[i].priority === "medium") {
            taskIcon.classList.add("orange");
          } else if (project.projectList[a].tasks[i].priority === "high") {
            taskIcon.classList.add("red");
          } else {
            taskIcon.classList.add("silver");
          }
          todoItem.appendChild(taskIcon);
          //Create Title
          const taskTitle = document.createElement("p");
          taskTitle.classList.add("todo-title", "toggle-todo");
          taskTitle.textContent = project.projectList[a].tasks[i].title;
          if (project.projectList[a].tasks[i].done === true) {
            taskIcon.classList.add("fa-circle-check");
            taskTitle.classList.add("done");
          } else {
            taskIcon.classList.add("fa-circle");
            taskTitle.classList.remove("done");
          }
          todoItem.appendChild(taskTitle);
          //Create Date
          if (project.projectList[a].tasks[i].schedule !== "") {
            const taskDate = document.createElement("p");
            taskDate.classList.add("todo-date", "toggle-task");
            taskDate.textContent = project.projectList[a].tasks[i].schedule;
            todoItem.appendChild(taskDate);
          }
          //Create Edit
          const taskEditIcon = document.createElement("i");
          taskEditIcon.classList.add(
            "far",
            "fa-regular",
            "fa-pen-to-square",
            "edit-todo-modal"
          );
          todoItem.appendChild(taskEditIcon);
          //Create Delete
          const taskDeleteIcon = document.createElement("i");
          taskDeleteIcon.classList.add(
            "far",
            "fa-regular",
            "fa-trash-can",
            "remove-todo-modal"
          );
          todoItem.appendChild(taskDeleteIcon);
        }
      }
      //Add Task Line
      const taskAdd = document.createElement("div");
      taskAdd.setAttribute("data-project-index", projectIndex);
      taskAdd.classList.add("todo-item-add", "add-todo-modal");
      todoList.appendChild(taskAdd);
      const taskAddIcon = document.createElement("i");
      taskAddIcon.classList.add("far", "fa-solid", "fa-plus", "add-todo-modal");
      taskAdd.appendChild(taskAddIcon);
      const taskAddTitle = document.createElement("p");
      taskAddTitle.classList.add("todo-title", "add-todo-modal");
      taskAddTitle.textContent = "Add New Task";
      taskAdd.appendChild(taskAddTitle);
    } else {
        const taskAdd = document.createElement('div')
        taskAdd.classList.add('todo-item-add', 'add-proj-modal')
        todoList.appendChild(taskAdd)
        const taskAddIcon = document.createElement('i')
        taskAddIcon.classList.add('far', 'fa-solid', 'fa-circle-exclamation', 'red', 'add-proj-modal')
        taskAdd.appendChild(taskAddIcon)
        const taskAddTitle = document.createElement('p')
        taskAddTitle.classList.add('todo-title', 'add-proj-modal')
        taskAddTitle.textContent = 'You do not have any projects, please create one.'
        taskAdd.appendChild(taskAddTitle)
        
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

  return {
    body,
    projectForm,
    projectTitleError,
    taskTitleError,
    taskProjectError,
    projectModal,
    modals,
    showProjects,
    showElement,
    hideElement,
    activeProject,
    confirmProjectModal,
    showConfirmModal,
    showProjectModal,
    responsiveSidebar,
    toggleSidebar,
    showTasks,
    showTaskModal,
    changeProject,
    renderHeader,
  };
})();

export default dom;
