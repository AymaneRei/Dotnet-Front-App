// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  domainName: 'https://localhost:7235',
  loginURl: 'https://localhost:7235/api/Authentication/login',
  registerURl: 'https://localhost:7235/api/Authentication/register',
  usersURl: 'https://localhost:7235/api/Authentication',
  updateUserURl: 'https://localhost:7235/api/Authentication',
  deleteUserURl: 'https://localhost:7235/api/Authentication',
  pokemonsURl: 'https://localhost:7235/api/Pokemon',
  addPokemonURl: 'https://localhost:7235/api/Pokemon',
  updatePokemonURl: 'https://localhost:7235/api/Pokemon',
  deletePokemonURl: 'https://localhost:7235/api/Pokemon',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
