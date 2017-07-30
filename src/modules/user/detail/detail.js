import template from './detail.html';
require('@/modules/user/detail/detail.scss')

export default {
	template: template,
	data: function() {
		return {
			ruleForm: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				gender: '男',
				type: [],
				resource: '',
				desc: ''
			},
			rules: {
				name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					},
					{
						min: 3,
						max: 5,
						message: '长度在 3 到 5 个字符',
						trigger: 'blur'
					}
				],
				phone: [{
						required: true,
						message: '请输入电话号码',
						trigger: 'blur'
					},
					{
						min: 7,
						max: 12,
						message: '长度在 7 到 11 个字符',
						trigger: 'change'
					}
				],
				src: [{
					required: true,
					message: '请选择贯籍',
					trigger: 'change'
				}],
				date1: [{
					type: 'date',
					required: true,
					message: '请选择日期',
					trigger: 'change'
				}],
				date2: [{
					type: 'date',
					required: true,
					message: '请选择时间',
					trigger: 'change'
				}],
				type: [{
					type: 'array',
					required: true,
					message: '请至少选择一个活动性质',
					trigger: 'change'
				}],
				resource: [{
					required: true,
					message: '请选择活动资源',
					trigger: 'change'
				}],
				desc: [{
					required: true,
					message: '请填写活动形式',
					trigger: 'blur'
				}]
			}
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
};