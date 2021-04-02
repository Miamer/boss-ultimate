const { resolve } = require('path');
const pullAll = require('lodash/pullAll');
const uniq = require('lodash/uniq');

const ReactBoilerplate = {
  // This refers to the react-boilerplate version this project is based on.
  // Ceci fait référence à la version react-standard sur laquelle ce projet est basé.
  version: '3.6.0',

  /**
   * The DLL Plugin provides a dramatic speed increase to webpack build and hot module reloading
   * by caching the module metadata for all of our npm dependencies. We enable it by default
   * in development.
   *
   *
   * To disable the DLL Plugin, set this value to false.
   */
  /**
    * Le plugin DLL fournit une augmentation spectaculaire de la vitesse à la construction du pack Web et au rechargement du module à chaud
    * en mettant en cache les métadonnées du module pour toutes nos dépendances npm. Nous l'activons par défaut
    * en développement.
    *
    *
    * Pour désactiver le plugin DLL, définissez cette valeur sur false.
    */ 
  dllPlugin: {
    defaults: {
      /**
       * we need to exclude dependencies which are not intended for the browser
       * by listing them here.
       */
       /**
       * nous devons exclure les dépendances qui ne sont pas destinées au navigateur
       * en les listant ici.
       */
      exclude: [
        '@date-io/date-fns',
        'chalk',
        'compression',
        'cross-env',
        'express',
        'ip',
        'minimist',
        'sanitize.css',
      ],

      /**
       * Specify any additional dependencies here. We include core-js and lodash
       * since a lot of our dependencies depend on them and they get picked up by webpack.
       */

       /**
       * Spécifiez ici toutes les dépendances supplémentaires. Nous incluons core-js et lodash
       * car beaucoup de nos dépendances en dépendent et elles sont récupérées par webpack.
       */
      include: ['core-js', 'eventsource-polyfill', 'babel-polyfill', 'lodash'],

      // The path where the DLL manifest and bundle will get built
      // Le chemin où le manifeste DLL et le bundle seront construits
      path: resolve('../node_modules/react-boilerplate-dlls'),
    },

    entry(pkg) {
      const dependencyNames = Object.keys(pkg.dependencies);
      const exclude = pkg.dllPlugin.exclude || ReactBoilerplate.dllPlugin.defaults.exclude;
      const include = pkg.dllPlugin.include || ReactBoilerplate.dllPlugin.defaults.include;
      const includeDependencies = uniq(dependencyNames.concat(include));

      return {
        reactBoilerplateDeps: pullAll(includeDependencies, exclude),
      };
    },
  },
};

module.exports = ReactBoilerplate;
