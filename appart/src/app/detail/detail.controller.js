/**
 * Controller of the detail page
 */
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

    this.item.photos.unshift('thumb');
    this.chunkPhotosList = this.splitList(this.item.photos, 4);
  }

  /**
   * Zoom on a picture when clicked
   * @param filename
   */
  selectPicture(filename) {
    this.selectedPicName = filename;
    this.pathBigPicture = 'assets/images/items/' + this.name + '/' + filename + '.jpg';
  }

  /**
   * Split a table in groups of 'chunkSize' elements
   * > Display properly a row of bootstrap cols
   * @param list
   * @param chunkSize
   * @returns {Array}
   */
  splitList(list, chunkSize) {
    var result = [];
    var chunk = [];
    angular.forEach(list, (item) => {
      if (_.size(chunk) >= chunkSize) {
        result.push(chunk);
        chunk = [];
      }
      chunk.push(item);
    });
    if (_.size(chunk) !== 0) {
      result.push(chunk);
    }
    return result;
  }

}

export default DetailController;
