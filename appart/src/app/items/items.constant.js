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
      /*bureauWenge: {
        name: 'bureauWenge',
        libelle: 'Bureau',
        desc: 'Acheté 210€ à Conforama en avril 2105. Dimensions : ',
        prix: 150
      },*/
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
      }/*,
      frigo: {
        name: 'frigo',
        libelle: 'Réfrigérateur',
        desc: 'Acheté 360€ en janvier 2013.',
        prix: 180
      },
      petitMeubleCuisine: {
        name: 'petitMeubleCuisine',
        libelle: 'Meuble de rangement',
        desc: 'Acheté 80€ en février 2103. Dimensions : ',
        prix: 30
      }*/
    };
  }

}

export default Items;
