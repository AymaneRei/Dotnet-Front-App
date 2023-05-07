import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guard/login.guard';
import { LoginComponent } from './login/login.component';
import { ContentComponent } from './content/content.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { PokemonComponent } from './pokemon/pokemon.component';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
  {
    path: '',
    component: ContentComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'pokemons',
        component: PokemonComponent,
      },
      {
        path: 'pokemons/add',
        component: AddPokemonComponent,
      },
      {
        path: 'users',
        component: UserComponent,
      },
      {
        path: 'users/add',
        component: AddUserComponent,
      },
      {
        path: 'users/update',
        component: UpdatePasswordComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/pokemons',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
