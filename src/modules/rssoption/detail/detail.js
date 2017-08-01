import template from './detail.html';
import service from '@/modules/rssoption/data.service.js';
require('@/modules/rssoption/detail/detail.scss')
import '@/components/bo-editor/component.js';
import {
	Loading
} from 'element-ui';


export default {
	template: template,
	data: function() {
		return {
			dialogImageUrl: '',
			data: {
				name: '',
				icon: '',
				title: '',
				link: '',
				remark: '',
				filters: [],
				appendText: '',
				prependText: '',
				created: new Date(),
				updated: new Date()
			},
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
		handleImgUploaded(file) {
			this.data.icon = file.url;
		},
		goBack() {
			this.$router.push({
				name: 'crm.rssoption.list'
			})
		}
	},
	async mounted() {
		if (this.$route.params.id) {
			this.data = await service.loadItem(this.$route.params.id);
		} else {
			this.data = await service.createNew(this.data);
		}
	}
};