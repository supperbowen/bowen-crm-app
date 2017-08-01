import BaseLogic from '@/common/logic';

class rssDataLogic extends BaseLogic {
	constructor() {
		super({
			uri: 'api/rssoption',
			listUri: 'api/rssoption/list',
			updateUri: 'api/rssoption/save',
			createUri: 'api/rssoption/create',
			enablePaging: true,
			enableSearch: false,
			pageSize: 20
		});
	}

	async syncArticles(link) {
		let res = await this.httpGet('api/rssoption/sync', {
			link
		});
		if (res.status === 200) {
			return res.data;
		} else {
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