import { Component, OnInit } from '@angular/core';
import { LoadsurveyService } from '../services/loadsurvey.service';
import { HelpService } from '../services/help.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';
import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';


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
      let answers = [];     
         
   // const flist = db.list('/flist');
   // this.seloptfire= question.options.find(x=>x.selected) ;
   // this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered':(x.options.find(x=>x.selected === true)).id }));
    this.quiz.questions.forEach(x => this.siriassessment.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered':(x.options.find(x=>x.selected === true)).id }));
    
   
    // Post your data to the server here. answers contains the questionId and the users' answer.
   //console.log(answers);
  // console.log(this.ansdb); 
                        
    console.log(this.quiz.questions);
    this.mode = 'result';
  }

}
