import {
  BaseLogic
} from '/src/common/logic';


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
