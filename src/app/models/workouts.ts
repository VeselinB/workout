import { ExersiceClass } from "./exersice";


export class WorkoutClass {
    
    id: string
    exersices: {[id:string]:ExersiceClass};
    status: Boolean
    title: string


    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
        this.status = false;
        this.exersices = {};
    }
}