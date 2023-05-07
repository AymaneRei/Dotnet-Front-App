import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../core/models/pokemon.model';
import { AddPokemon } from '../core/models/addPokemon.model';
import { UpdatePokemon } from '../core/models/updatePokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private pokemonsURl: string = environment.pokemonsURl;
  private addPokemonURl: string = environment.addPokemonURl;
  private updatePokemonURl: string = environment.updatePokemonURl;
  private deletePokemonURl: string = environment.deletePokemonURl;

  constructor(private router: Router, private http: HttpClient) {}

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonsURl).pipe(
      tap((userData) => {
        console.log('All', userData);
        return userData;
      }),
      catchError(this.handleError)
    );
  }

  getPokemon(pokemonId: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.pokemonsURl + '/' + pokemonId).pipe(
      tap((userData) => {
        console.log('All', userData);
        return userData;
      }),
      catchError(this.handleError)
    );
  }

  addPokemon(
    pokemon: AddPokemon,
    ownerId: string,
    categoryId: string
  ): Observable<Pokemon> {
    return this.http
      .post<Pokemon>(
        this.addPokemonURl +
          '?ownerId=' +
          ownerId +
          '&categoryId=' +
          categoryId,
        pokemon
      )
      .pipe(
        tap((userData) => {
          return userData;
        }),
        catchError(this.handleError)
      );
  }

  updatePokemon(
    pokemon: UpdatePokemon,
    ownerId: string,
    categoryId: string
  ): Observable<Pokemon> {
    return this.http
      .put<Pokemon>(
        this.updatePokemonURl +
          '/' +
          pokemon.id +
          '?ownerId=' +
          ownerId +
          '&categoryId=' +
          categoryId,
        pokemon
      )
      .pipe(
        tap((userData) => {
          return userData;
        }),
        catchError(this.handleError)
      );
  }

  deletePokemon(pokemonId: number): Observable<void> {
    return this.http.delete<void>(this.deletePokemonURl + '/' + pokemonId).pipe(
      tap((userData) => {
        return userData;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
