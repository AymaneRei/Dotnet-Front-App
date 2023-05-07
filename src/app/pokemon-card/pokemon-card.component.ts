import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/core/models/pokemon.model';
import { PokemonsService } from '../services/pokemons.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;

  errorMessage!: string;
  sub!: Subscription;

  pokemons!: Pokemon[];

  constructor(private pokemonsService: PokemonsService) {}

  ngOnInit() {}

  pokemonImageUrl(): string {
    let pokemonImage: string;
    switch (this.pokemon.name) {
      case 'Pikachu':
        pokemonImage =
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png';
        break;
      case 'Squirtle':
        pokemonImage =
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png';
        break;
      case 'Venasuar':
        pokemonImage =
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png';
        break;
      default:
        pokemonImage =
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png';
        break;
    }
    return pokemonImage;
  }

  deletePokemon(): void {
    if (confirm('Voulez-vous vraiment supprimer ce pokemon?')) {
      this.sub = this.pokemonsService.deletePokemon(this.pokemon.id).subscribe({
        next: (data) => {
          location.reload();
        },
        error: (err) => (this.errorMessage = err),
      });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
