import   BaseLogic from '../common/logic';

class rssDataLogic extends BaseLogic {
  constructor() {
    super({
      uri: 'rss',
      listUri: 'rss/list',
      enablePaging: true,
      enableSearch: true,
      pageSize: 10
    });
  }
}
const dataService = new rssDataLogic();

export default dataService;