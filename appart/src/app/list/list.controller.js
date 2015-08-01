class ListController {

  constructor(Items) {
    'ngInject';

    var list = new Items();

    this.chunkList = this.splitList(list, 3);
  }

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
