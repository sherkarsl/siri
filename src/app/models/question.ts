import { Option } from './option';

export class Question {
    id: number;
    name: string;
    Driver: string;
    Tagline: string;
    Des1:string;
    Des2:string;
    Des3:string;
    Des4:string;
    Des5:string;
    questionTypeId: number;
    options: Option[];
    answered: boolean;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.name = data.name;
        this.Driver= data.Driver;
        this.Tagline= data.Tagline;
        this.Des1  = data.Des1;
        this.Des2  = data.Des2;
        this.Des3  = data.Des3;
        this.Des4  = data.Des4;
        this.Des5  = data.Des5;
        this.questionTypeId = data.questionTypeId;
        this.options = [];
        data.options.forEach(o => {
            this.options.push(new Option(o));
        });
    }
}
