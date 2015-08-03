/**
 * Controller of the list page
 */
class ListController {

  constructor(Items) {
    'ngInject';

    // Get all items in the constant
    var list = new Items();

    this.chunkList = this.splitList(list, 3);
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
    var chunk = {};
    angular.forEach(list, (item) => {
      if (_.size(chunk) >= chunkSize) {
        result.push(chunk);
        chunk = {};
      }
      chunk[item.name] = item;
    });
    if (_.size(chunk) !== 0) {
      result.push(chunk);
    }
    return result;
  }

}

export default ListController;
