import BaseLogic from '@/common/logic';

class rssDataLogic extends BaseLogic {
	constructor() {
		super({
			uri: 'api/rss',
			listUri: 'api/rss/list',
			createUri: 'api/rss/create',
			updateUri: 'api/rss/save',
			deleteUri:'api/rss/delete',
			enablePaging: true,
			enableSearch: false,
			pageSize: 10
		});
	}

	async loadPageHtml(link) {
		link = encodeURIComponent(link);
		let res = await this.httpGet('api/rss/page', {
			link: link
		});
		if (res.status === 200) {
			return res.data;
		} else {
			console.error(res.message);
		}
	}

	async afterItemLoaded(item) {
		item.isPush = item.isPush || false;
		item.pushDate = item.pushDate || new Date();
		item.icon = item.icon || '';
		item.ctg = item.ctg || 'article';
	}

	async afterCreate(item){
		item.ctg = 'article';
		item.isPush = false;
		item.pushDate = new Date();
	}

}
const dataService = new rssDataLogic();

export default dataService;