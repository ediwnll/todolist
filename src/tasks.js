import project from "./projects";
import dom from "./dom";

const tasks = (()=>{
    class Task{
        constructor(title, priority, schedule){
            this.title = title
            this.priority = priority
            this.schedule = schedule
            this.done = false
        }
    }
    function toggleTask(projectIndex, taskIndex, link=projectIndex){
        if(project.projectList[projectIndex].tasks[taskIndex].done){
            project.projectList[projectIndex].tasks[taskIndex].done = false
        }
        else{
            project.projectList[projectIndex].tasks[taskIndex].done = true
        }
        console.log(project.projectList[projectIndex].tasks[taskIndex].done)
        dom.showTasks(link)
    }

    function createTasks(projectIndex, title, priority = 0, schedule = 0, link = projectIndex) {
        const newTask = new Task(title, priority, schedule);
        project.projectList[projectIndex].tasks.push(newTask);
        if (Number.isNaN(parseInt(link, 10))){
            dom.changeProject(link)
        } else {
            dom.showTasks(projectIndex)
        }
    }

    function editTask(projectIndex, taskIndex, title, priority, schedule, link=projectIndex){
        project.projectList[projectIndex].tasks[taskIndex].title = title
        project.projectList[projectIndex].tasks[taskIndex].priority = priority
        project.projectList[projectIndex].tasks[taskIndex].schedule = schedule
        dom.showTasks(link)
    }

    function removeTask(projectIndex, taskIndex, link=projectIndex){
        project.projectList[projectIndex].tasks.splice(taskIndex, 1)
        dom.hideElement(dom.modals)
        dom.showTasks(link)
    }

    return{
        createTasks,
        toggleTask,
        editTask,
        removeTask,
    }
})()

export default tasks