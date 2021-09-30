import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AuthComponent } from "./auth.component";

const routes = [
  { path: 'auth', component: AuthComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule {}