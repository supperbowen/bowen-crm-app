import   BaseLogic from '../common/logic';

class rssDataLogic extends BaseLogic {
  constructor() {
    super({
      uri: 'api/rss',
      listUri: 'api/rss/list',
      enablePaging: true,
      enableSearch: false,
      pageSize: 10
    });
  }
}
const dataService = new rssDataLogic();

export default dataService;