import template from './detail.html';
require('@/modules/rss/detail/detail.scss')
import service from '@/modules/rss/data.service.js';
import '@/components/bo-editor/component.js';
import {
	Loading
} from 'element-ui';


export default {
	template: template,
	data: function() {
		return {

			data: {
				name: '',
				title: '',
				icon: '',
				isPush: false,
				ctg: 'article',
				pushDate: new Date(),
				content: '',
				remark: '',
				pubDate: new Date(),
				author: '',
				created: new Date(),
				updated: new Date()
			},
			ctgs: [{
				label: '文章',
				value: 'article'
			}, {
				label: '关于',
				value: 'about'
			}],
			rules: {
				name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					},
					{
						max: 200,
						message: '长度在 3 到 5 个字符',
						trigger: 'blur'
					}
				]
			}
		};
	},
	methods: {
		handleImgUploaded(file) {
			this.data.icon = file.url;
		},
		submitForm(formName) {
			this.$refs[formName].validate(async(valid) => {
				if (valid) {
					let loadingInstance = Loading.service({
						text: '正在保存中'
					});

					let data = await service.saveCreate(this.data);
					if (data.error) {
						this.$notify.error({
							title: '错误',
							message: data,
							type: 'success'
						});
					} else {
						this.data = data;
					}
					loadingInstance.close();
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		goBack() {
			this.$router.back();
		}
	},
	async mounted() {
		let loadingInstance = Loading.service({
			text: '正在加载'
		});
		let data = {};
		if (this.$route.params.id) {
			data = await service.loadItem(this.$route.params.id);
		} else {
			data = await service.createNew(this.data);
		}
		loadingInstance.close();
		this.data = data;
	}
};