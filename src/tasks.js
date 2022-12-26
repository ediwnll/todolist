import project from "./projects";
import dom from "./dom";

const tasks = (()=>{
    class Task{
        constructor(title, description, priority, dueDate){
            this.title = title
            this.description = description
            this.priority = priority
            this.dueDate = dueDate
            this.done = false
        }
    }

    function createTasks(projectIndex, title, description, priority, dueDate){
        const newTask = new Task(title, description, priority, dueDate)
        project.projectList[projectIndex].tasks.push(newTask)
        console.log("this is the project: "+ project.projectList[projectIndex])
        dom.showTasks(0)
    }

    return{
        createTasks,
    }
})()

export default tasks