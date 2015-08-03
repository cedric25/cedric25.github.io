class DetailController {

  constructor($stateParams, Items) {
    'ngInject';

    // Code name of the item
    this.name = $stateParams.name;

    // Selected item from the list
    this.item = new Items()[this.name];

    // Template path of the item's HTML full description
    this.templateDescUrl = 'app/items/desc/' + this.item.name + '.html';

    // Init of the image displayed
    this.selectPicture('thumb');
  }

  selectPicture(filename) {
    this.selectedPicName = filename;
    this.pathBigPicture = 'assets/images/items/' + this.name + '/' + filename + '.jpg';
  }

}

export default DetailController;
