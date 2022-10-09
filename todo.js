export default class Todo{
    constructor(dueDate,title,priority,tags){
        this.dueDate=dueDate;
        this.title=title || "Untitled";
        this.isCompleted=false;
        // this.description=description?description:"";
        // this.priority=priority;
        // this.tags=tags;
    }

}
