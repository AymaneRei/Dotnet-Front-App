import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonsService } from '../services/pokemons.service';
import { Pokemon } from '../core/models/pokemon.model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit, OnDestroy {
  errorMessage!: string;
  sub!: Subscription;

  pokemons!: Pokemon[];

  constructor(private pokemonsService: PokemonsService) {}

  ngOnInit() {
    this.sub = this.pokemonsService.getPokemons().subscribe({
      next: (data) => {
        this.pokemons = data;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
