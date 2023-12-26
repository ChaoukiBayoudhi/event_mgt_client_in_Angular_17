import { Routes } from '@angular/router';
import { EditEventComponent } from './Event/edit-event/edit-event.component';
import { ListEventComponent } from './Event/list-event/list-event.component';

export const routes: Routes = [
  {path:'',redirectTo:'/list-events',pathMatch:'full'},
{path:'list-events',component:ListEventComponent},
//{path:'**',redirectTo:'/list-events',pathMatch:'full'},
{path:'event/:id',component:EditEventComponent},
{path:'event/add',component:EditEventComponent}
];
