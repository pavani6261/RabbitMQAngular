import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RabbitmqService } from '../services/rabbitmq.service';

@Component({
  selector: 'app-rabbit-mq',
  templateUrl: './rabbit-mq.component.html',
  styleUrls: ['./rabbit-mq.component.css']
})
export class RabbitMQComponent {
  constructor(private http: HttpClient, public rabbitmq: RabbitmqService) { }


  ngOnInit(): void {

    this.getQueues();
    // if(this.flag==true){
    //   this.getProcessIds()
    // }
  }

  

  title = 'rmqAngular';

  queue1: any;
  
  /*  structure of queue1 from getQueues() function
   queue = [
    { connectionName: "url",logfileName :"file1.log", programName: "file1.js", queueName: "que1" }, 
   { connectionName: "url",logfileName :"file1.log", programName: "file2.js", queueName: "que2" }
  ]
  */
 queue2:any;
  arr: any = [];
  flag:boolean=false;

  processIds: any;
  getQueues() {
    this.rabbitmq.getAlldetails()
      .subscribe((response) => {
        console.log(response);
        this.queue1 = response.data;
        console.log(this.queue1);
      });

  }

  async getProcessIds() {
    this.rabbitmq.getpids()
      .subscribe( (response) => {
        this.queue1 = response.datatotal;

        for (let i = 0; i < this.queue1.length; i++) {
          const element = this.queue1[i]; 
              if (element.pid && element.pid != 0) {
                element.actionsType = 'start';
              }
              if(element.pid == 0)
              {
                element.actionsType = 'stop';
              }
            
        }

        console.log(this.queue1, "queue1");
      });
  }


  startConsumerfile(filename: string) {
    this.rabbitmq.startProgram(filename)
      .subscribe(async (response) => {
        this.flag= true;
        this.queue2= response.datavar
        console.log(this.queue2, "from startconsumerfile function");
        // console.log(this.queue1, "startprocessids");
        alert(`program name ${filename} is running.`)
      })
  }

  getpids(){
    this.getProcessIds();
  }

  stopConsumerfile(pid: any) {
    console.log(pid,typeof(pid));

      this.rabbitmq.stopProgram(pid)
        .subscribe((response) => {
          // console.log(response);
          if(response.status==='terminated'){
            this.flag = false;
          for (let i = 0; i < this.queue1.length; i++) {
            const element = this.queue1[i];
            if (element.pid == response.pid && response.status == "terminated") {
              element.pid = 0;
              element.actionsType = 'stop';
              alert(`process id ${pid} is terminated`)
            }
          }
          }
          else{
            console.log(response.err,"response ");
            alert('process id '+ pid + ' is not terminated. Error : '+ response.Message);
          }
        })
        

      // alert(`process id ${pid} is terminated`)
  }
}
