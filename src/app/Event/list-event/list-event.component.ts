import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {Event} from '../../classes/event';

@Component({
  selector: 'app-list-event',
  standalone: true,
  imports: [RouterLink,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './list-event.component.html',
  styleUrl: './list-event.component.css'
})
export class ListEventComponent {
  displayedColumns: string[] = ['id','name','description','theme','date','budget','nbPlaces','actions'];

  api_url="http://localhost:9995/api/events/";
  feedback={type:'',message:''};
deleteEvent(event: Event):void {
if(confirm("Are you sure you want to delete th event ${event.name}, ${event.date}?")){
  this.http.delete(this.api_url+`event/${event.id}`).subscribe(()=>{
    this.feedback={type:'success',message:'Event deleted successfully!'}
    //actualize the list of events by calling the ngOnInit() method
    //where we have called the get() method on the remote API
    setTimeout(() => {
      this.ngOnInit();
    }, 3000);
  },
  (error)=>{
    this.feedback={type:'warning',message:'Error deleting event!'}
  }
  );
}
}
editEvent(arg0: any) {
throw new Error('Method not implemented.');
}
   events:Event[]=[];
  loading=true;

  constructor(private http:HttpClient) { }
//redefinition of the ngOnInit() method declared in the OnInit interface
//the ngOnInit() method is called when the component is initialized
  ngOnInit(): void {
    this.loading=true;
    this.http.get<Event[]>(this.api_url).subscribe((data:Event[])=>{
      this.events=data;
      this.feedback={type:"",message:""};
      this.loading=false;
    });
  }
}
