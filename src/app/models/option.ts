export class Option {
    id: number;
    questionId: number;
    name: string;
    descp: string;
    isAnswer: boolean;
    selected: boolean;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.questionId = data.questionId;
        this.name = data.name;
        this.descp= data.descp;
        this.isAnswer = data.isAnswer;
    }
}
