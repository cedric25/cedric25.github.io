/**
 * List of all items
 * FIXME Define constant in another way...
 */
class Items {

  constructor() {
    'ngInject';

    return {
      bureauPcVerre: {
        name: 'bureauPcVerre',
        libelle: 'Bureau PC plateau en verre',
        desc: '',
        prix: 40,
        photos: ['01', '02', '03']
      },
      meubleSalonMarronClair: {
        name: 'meubleSalonMarronClair',
        libelle: 'Meuble de rangement',
        desc: '',
        prix: 100,
        photos: ['01', '02']
      },
      meubleEntree: {
        name: 'meubleEntree',
        libelle: 'Petit meuble d\'entrée',
        desc: '',
        prix: 20,
        photos: ['01', '02']
      },
      bureauWenge: {
        name: 'bureauWenge',
        libelle: 'Bureau',
        desc: '',
        prix: 150,
        photos: ['01', '02']
      },
      tableEtChaises: {
        name: 'tableEtChaises',
        libelle: 'Table + 4 chaises',
        desc: '',
        prix: 150,
        photos: ['01', '02']
      },
      cuisiniere: {
        name: 'cuisiniere',
        libelle: 'Cuisinière à induction',
        desc: '',
        prix: 450,
        photos: ['01', '02', '03', '04']
      },
      frigo: {
        name: 'frigo',
        libelle: 'Réfrigérateur',
        desc: '',
        prix: 180,
        photos: ['01']
      },
      petitMeubleCuisine: {
        name: 'petitMeubleCuisine',
        libelle: 'Meuble de rangement',
        desc: '',
        prix: 30,
        photos: ['01', '02', '03']
      },
      ecranPc: {
        name: 'ecranPc',
        libelle: 'Ecran Samsung 21.5" LED',
        prix: 100,
        photos: ['01', '02', '03', '04']
      },
      vaio: {
        name: 'vaio',
        libelle: 'Ordinateur portable Sony Vaio',
        prix: 200,
        photos: ['01', '02', '03']
      }
    };
  }

}

export default Items;
