const project = (()=>{
    const projectList=[]

    class Project{
        constructor(title,icon){
            this.title = title
            this.icon = icon
            this.task = []
        }
    }

    function createProject(title, icon){
        const newProject = new Project(title,icon)
        projectList.push(newProject)
        console.log(projectList)
    }

    return{
        createProject,
    }
})();

export default project