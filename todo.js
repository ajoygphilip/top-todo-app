class Todo{
    constructor(dueDate,title,description,priority,tags){
        this.dueDate=dueDate;
        this.title=title?title:"Untitled";
        this.description=description?description:"";
        this.priority=priority;
        this.tags=tags;
    }



}

export {Todo};