import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddPokemon } from 'src/app/core/models/addPokemon.model';
import { PokemonsService } from '../services/pokemons.service';

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.scss'],
})
export class AddPokemonComponent implements OnInit, OnDestroy {
  errorMessage: boolean = false;
  successMessage: boolean = false;
  sub!: Subscription;

  pokemonForm!: FormGroup;
  pokemon = new AddPokemon();
  ownerId!: string;
  categoryId!: string;

  constructor(
    private pokemonsService: PokemonsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.pokemonForm = this.buildGroub();
    this.subscribeToChanges();
  }

  save(): void {
    this.pokemon.birthDate = new Date();
    this.sub = this.pokemonsService
      .addPokemon(this.pokemon, this.ownerId, this.categoryId)
      .subscribe({
        next: (data) => {
          this.errorMessage = false;
          this.successMessage = true;
          console.log('Pokemon successfully created !');
        },
        error: (err) => (this.errorMessage = true),
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  buildGroub(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      ownerId: ['', [Validators.required, Validators.min(1)]],
      categoryId: ['', [Validators.required, Validators.min(1)]],
    });
  }

  subscribeToChanges(): void {
    this.pokemonForm.valueChanges.subscribe((value) => {
      this.pokemon.name = value.name;
      this.ownerId = value.ownerId;
      this.categoryId = value.categoryId;
    });
  }
}
