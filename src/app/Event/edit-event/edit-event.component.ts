import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { of, switchMap } from 'rxjs';
import { Event } from '../../classes/event';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTooltipModule,
    RouterLink,
  ],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css',
})
export class EditEventComponent implements OnInit {
  event!: Event;
  new_event=false;
  api_url="http://localhost:9995/api/events/";
  feedback = {type:'',message:''};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id'] === 'add') {//if the id is add, we create a new event
            this.new_event=true;
            return of(new Event());

          }
//if the id is not add, we get the event from the server to display it on the form
          return this.http.get<Event>(this.api_url+`event/${params['id']}`);
        }),
      )
      .subscribe(
        (event: Event) => {
          this.event = event;
          this.feedback = {type:'',message:''};
        },
        (err) => {
          console.log(err);
          this.feedback = { type: 'warning', message: 'Error loading' };
        },
      );
  }
save() {
  if(this.new_event)
  {
    this.http.post(this.api_url+`event`, this.event).subscribe(
      () => {
        this.feedback = { type: 'success', message: 'Event added successfully.' };
        setTimeout(() => {
          this.router.navigate(['/list-events']);
        }, 1000);
      },
      () => {
        this.feedback = { type: 'warning', message: 'Error adding new event' };
      },
    );
  }
  else{
    this.http.put(this.api_url+`event/${this.event.id}`, this.event).subscribe(
      () => {
        this.feedback = { type: 'success', message: 'Event updated successfully.' };
        setTimeout(() => {
          this.router.navigate(['/list-events']);
        }, 1000);
      },
      () => {
        this.feedback = { type: 'warning', message: 'Error updating event' };
      },
    );
  }
  }

  async cancel(){
      await this.router.navigate(['/list-events']);
  }

}
