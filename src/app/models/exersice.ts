export interface Exersice {
    id: string;
    title: string;
    status: Boolean;
}

export class ExersiceClass {
    id: string;
    title: string;
    status: Boolean;

    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
        this.status = false;
   
    }
}