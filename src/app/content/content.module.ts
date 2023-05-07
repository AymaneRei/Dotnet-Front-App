import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { AddPokemonComponent } from '../add-pokemon/add-pokemon.component';
import { EditPokemonModalComponent } from '../edit-pokemon-modal/edit-pokemon-modal.component';
import { UserComponent } from '../user/user.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { UpdatePasswordComponent } from '../update-password/update-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    PokemonComponent,
    PokemonCardComponent,
    AddPokemonComponent,
    EditPokemonModalComponent,
    UserComponent,
    AddUserComponent,
    UpdatePasswordComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ContentModule {}
