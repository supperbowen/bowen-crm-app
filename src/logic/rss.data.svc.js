import BaseLogic from '../common/logic';

class rssDataLogic extends BaseLogic {
	constructor() {
		super({
			uri: 'api/rss',
			listUri: 'api/rss/list',
			enablePaging: true,
			enableSearch: false,
			pageSize: 20
		});
  }
  
  async loadPageHtml(link){    
    link = encodeURIComponent(link);
    let res = await this.httpGet('api/rss/page',{link:link});
    if(res.status === 200){
      return res.data;
    }else{
      console.error(res.message);
    }
  }

	async afterItemLoaded(item) {
    //item.pubDate = new Date(item.pubDate);
    item.isPush = item.isPush || false;
    item.pushDate = item.pushDate || new Date();
    // item.content = item.content || await this.loadPageHtml(item.link);
    // item.remark = (item.description || item.content).replace(/<[^>]+>/g,"").slice(0,50);
	}

}
const dataService = new rssDataLogic();

export default dataService;