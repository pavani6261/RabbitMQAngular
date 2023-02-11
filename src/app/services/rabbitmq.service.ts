import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RabbitmqService {

  url='http://localhost:3000/readConfig/all';
  constructor(private httpclient:HttpClient) { }

  getAlldetails(){
    return this.httpclient.get<any>(this.url);
  }

  getpids(){
    return this.httpclient.get<any>('http://localhost:3000/readConfig/pids');
  }

  startProgram(filename:string){
    return this.httpclient.post<any>('http://localhost:3000/readConfig/start',{
      filename
    })
  }

  stopProgram(pid:number){
    return this.httpclient.post<any>("http://localhost:3000/readConfig/exit",{
      pid
    })
  }
}


// import { HttpClient } from '@angular/common/http';

// export class rabbitmq{
//     constructor (private _http:HttpClient){
        
//     }
//      getdata(filename:any){
//         return this._http.get("http://localhost:3001/readConfig/start",{
//            filename
//         })
//      }
// }



// import { Observable } from 'rxjs';

