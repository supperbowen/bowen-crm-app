require('@/modules/user/list/list.scss');
const template = require('./list.html');
import service from '@/logic/rss.data.svc.js';

export default {
	template,
	data: function() {
		return {			
			multipleSelection: [],
			list:[]
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
		}
	},
	async mounted(){
		let data = await service.loadData();
		for(let item of data){
			this.list.push(item);
		}
		// this.$set(this.list, data)
		// console.log(data);
	}	
}