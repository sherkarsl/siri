import { Component, OnInit } from '@angular/core';
import { LoadsurveyService } from '../services/loadsurvey.service';
import { HelpService } from '../services/help.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';
import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import 'chart.js/src/chart.js'


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  providers: [LoadsurveyService]
})
export class SurveyComponent implements OnInit {
 // _url: string ="data/aspnet.json";
 quizes: any[];
  quiz: Quiz = new Quiz(null);
  selopt : Option = new Option(null);
  seloptfire : Option = new Option(null);
  mode = 'quiz';                 
  quizName: string;
  siriassessment: FirebaseListObservable<any[]>;
  qestionidSubject: Subject<any>;
  db: AngularFireDatabase;
  ansdb: any[];
  answers = [];
  radarChartData:any = [];
  radarChartType:string = 'radar';
  radarChartLabels:string[] = ['Operation', 'Supply Chain', 'Product lifecycle', 'Automation', 'Connectivity', 'Intelligence','Talent Readiness','Structure and Management'];
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 0,  // indicates the time in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };
  assessmentscore=[];
  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  constructor(private loadsurveyService: LoadsurveyService,db:AngularFireDatabase ) {
    // this.qestionidSubject = new Subject();
    this.siriassessment = db.list('/siriassessment'
    /*, {
      query: {
        orderByChild: 'questionId',
        equalTo: this.qestionidSubject
      }
    } */
    );
    
    
   }


  ngOnInit() {
    this.quizes = this.loadsurveyService.getAll();
    this.quizName = this.quizes[0].id;
    this.loadQuiz(this.quizName);
  }
   loadQuiz(quizName: string) {
    this.loadsurveyService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
    });
    this.mode = 'quiz';
  }
   get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };
             
  Optionselected(question: Question) { 
    this.selopt= question.options.find(x=>x.selected) ;
    //console.log(this.selopt);
   // this.quiz.questions.forEach(x => this.siriassessment.push({ 'questionId':this.selopt.questionId, 'answered':this.selopt.id }));
    return this.selopt.id;}
                    
   isCorrect(question: Question) {  
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };

    filterBy(qid: string) {
    this.qestionidSubject.next(qid); 
  };

  onSubmit(question: Question) {             
            
         
   // const flist = db.list('/flist');
   // this.seloptfire= question.options.find(x=>x.selected) ;
    this.quiz.questions.forEach(x => this.answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered':(x.options.find(x=>x.selected === true)).id }));
    this.quiz.questions.forEach(x => this.siriassessment.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered':(x.options.find(x=>x.selected === true)).id }));
    
   console.log(this.answers[2].answered);
    // Post your data to the server here. answers contains the questionId and the users' answer.
   //console.log(answers);
  // console.log(this.ansdb); 
  //operation
    this.assessmentscore.push(this.answers[0].answered);
     //supply chanin
    this.assessmentscore.push(this.answers[1].answered);
     //Product life
    this.assessmentscore.push(this.answers[2].answered);
      //automation
    this.assessmentscore.push((this.answers[3].answered +this.answers[4].answered +this.answers[5].answered)/3);
    //connectivity
    this.assessmentscore.push((this.answers[6].answered +this.answers[7].answered +this.answers[8].answered)/3);
    //intelligence
    this.assessmentscore.push((this.answers[9].answered +this.answers[10].answered +this.answers[11].answered)/3 );
    //Talent
    this.assessmentscore.push((this.answers[12].answered +this.answers[13].answered) /2 );
    //Structure org
    this.assessmentscore.push((this.answers[14].answered +this.answers[15].answered) /2 );
    console.log(this.assessmentscore);               
    //console.log(this.quiz.questions);
    this.radarChartData.push({'data': this.assessmentscore,label: 'Assessment Score'});
    console.log(this.assessmentscore);
    console.log(this.radarChartData);
    this.mode = 'result';
  };
    // events
  public chartClicked(e:any):void {
    console.log(e);
  };
 
  public chartHovered(e:any):void {
    console.log(e);
  };
  onAssess(){
    //this.radarChartData.push({'data': this.assessmentscore,label: 'Series A'});
    //console.log(this.assessmentscore);
    //console.log(this.radarChartData);
  //this.assessmentscore.operation = this.answers[2].answered; 
  //console.log(this.answers[0].answered);
}
}
