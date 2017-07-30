require('@/modules/rssoption/list/list.scss');
const template = require('./list.html');
import service from '@/modules/rssoption/data.service.js';
import {
	Loading
} from 'element-ui';

export default {
	template,
	data: function() {
		return {
			multipleSelection: [],
			list: []
		};
	},
	methods: {
		toggleSelection(rows) {
			if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		createNew() {
			this.$router.push({
				name: 'crm.rssoption.create'
			})
		},
		editDetail(id) {
			this.$router.push({
				name: 'crm.rssoption.detail',
				params: {
					id
				}
			})
		},
		async syncArticles(item) {
			try {
				let loadingInstance = Loading.service({
					text: `正在订阅${item.name}文章`
				});
				let result = await service.syncArticles(item.link);

				if (result.error) {
					this.$notify.error({
						title: '错误',
						message: data,
						type: 'success'
					});
				}
				loadingInstance.close();
			} catch (error) {
				console.error(error);
			}
		}
	},
	async mounted() {
		let data = (await service.loadData()) || [];
		for (let item of data) {
			this.list.push(item);
		}
	}
}