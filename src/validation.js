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

    function editProject(event, index){
        const projectTitle = document.forms['add-project-form']['project-title'].value
        const projectIcon = document.forms['add-project-form']['project-icon'].value

        event.preventDefault()

        if(projectTitle !== ''){
            project.editProject(index, projectTitle, projectIcon)
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
        event.preventDefault()
        
        if(taskTitle !== ''){
            tasks.createTasks(projectIndex, taskTitle, taskPriority, taskSchedule)
            dom.hideElement(dom.taskTitleError)
            dom.hideElement(dom.modals)
        }else if(taskTitle === ''){
            dom.showElement(dom.taskTitleError)
        }
    }

    function editTask(event, projectIndex, taskIndex){
        const taskTitle = document.forms['task-form']['task-title'].value;
        const taskPriority = document.forms['task-form']['task-priority'].value;
        const taskSchedule = document.forms['task-form']['task-schedule'].value;
        
        event.preventDefault()

        if(taskTitle !== ''){
            tasks.editTask(projectIndex, taskIndex,taskTitle, taskPriority, taskSchedule)
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