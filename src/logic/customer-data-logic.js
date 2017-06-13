import {BaseLogic} from '/src/common/logic';
/*import {hooks} from '/src/common/utils';*/

export default class projectDataLogic extends BaseLogic {
  constructor() {
    super({
      uri: 'customer',
      listUri: 'customer/list',
      enablePaging: true,
      enableSearch: true,
      pageSize: 10
    });
  }
}
