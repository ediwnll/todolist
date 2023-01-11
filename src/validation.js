import project from "./projects";
import dom from "./dom";
import tasks from "./tasks";

const validation = (()=>{
    function addProject(event){
        const projectTitle = document.forms['add-project-form']['project-title'].value
        const projectIcon = document.forms['add-project-form']['project-icon'].value

        event.preventDefault()

        if(projectTitle !== ''){
            project.createProject(projectTitle,projectIcon)
            dom.hideElement(dom.projectTitleError)
            dom.hideElement(dom.modals)

        }
        else if (projectTitle ===''){
            dom.showElement(dom.projectTitleError)
        }
    }

    function editProject(event, index, link){
        const projectTitle = document.forms['add-project-form']['project-title'].value
        const projectIcon = document.forms['add-project-form']['project-icon'].value

        event.preventDefault()

        if(projectTitle !== ''){
            project.editProject(index, projectTitle, projectIcon, link)
            dom.hideElement(dom.projectTitleError)
            dom.hideElement(dom.modals)
            }
        else if(projectTitle === ''){
            dom.showElement(dom.projectTitleError)
        }
    }

    function addTask(event, projectIndex){
        const taskTitle = document.forms['task-form']['task-title'].value;
        const taskPriority = document.forms['task-form']['task-priority'].value;
        const taskSchedule = document.forms['task-form']['task-schedule'].value;
        const link = document.querySelector('.add-todo-modal').getAttribute('data-project-index')
        let taskProject
        if (Number.isNaN(projectIndex)){
            taskProject = parseInt(document.forms['task-form']['task-project'].value, 10)
        } else {
            taskProject = projectIndex
        }
        event.preventDefault()
        
        if(taskTitle !== '' && !Number.isNaN(taskProject)){
            tasks.createTasks(taskProject, taskTitle, taskPriority, taskSchedule, link)
            dom.hideElement(dom.taskTitleError)
            dom.hideElement(dom.taskProjectError)
            dom.hideElement(dom.modals)
        }else if(taskTitle === ''){
            dom.showElement(dom.taskTitleError)
        } else {
            dom.hideElement(dom.taskTitleError)
        } if(Number.isNaN(taskProject)){
            dom.showElement(dom.taskProjectError)
        }
        else{
            dom.hideElement(dom.taskProjectError)
        }
    }

    function editTask(event, projectIndex, taskIndex, link){
        const taskTitle = document.forms['task-form']['task-title'].value;
        const taskPriority = document.forms['task-form']['task-priority'].value;
        const taskSchedule = document.forms['task-form']['task-schedule'].value;
        
        event.preventDefault()

        if(taskTitle !== ''){
            tasks.editTask(projectIndex, taskIndex,taskTitle, taskPriority, taskSchedule, link)
            dom.hideElement(dom.taskTitleError)
            dom.hideElement(dom.modals)
        }else if(taskTitle === ''){
            dom.showElement(dom.taskTitleError)
        }
    }
    
    return{
        addProject,
        editProject,
        addTask,
        editTask,
    }
})();

export default validation