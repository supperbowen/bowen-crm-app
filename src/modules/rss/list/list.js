require('@/modules/rss/list/list.scss');
const template = require('./list.html');
import service from '@/modules/rss/data.service.js';
import {
	Loading
} from 'element-ui';


export default {
	template,
	data: function() {
		return {
			multipleSelection: [],
			list: [],
			searchOptions: {
				currentPage: 0,
				pageSize: 10,
				totalItems: 0
			}
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
		formateDate(row, column, cellValue) {
			if (cellValue) {
				return new Date(cellValue).toLocaleDateString();
			} else {
				return cellValue;
			}
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		editDetail(id) {
			this.$router.push({
				name: 'crm.rss.detail',
				params: {
					id
				}
			})
		},
		async pageChanged(pageNum) {
			let loadingInstance = Loading.service({
				text: '正在加载中'
			});

			let data = await service.loadData();
			service.currentPage = pageNum;
			this.list.length = 0;
			for (let item of data) {
				this.list.push(item);
			}
			loadingInstance.close();
		}
	},
	async mounted() {
		this.searchOptions.pageSize = service.pageSize;
		let data = await service.loadData();
		this.searchOptions.totalItems = service.searchOptions.totalItems;
		for (let item of data) {
			this.list.push(item);
		}
	}
}