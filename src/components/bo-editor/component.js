import template from './component.html';
import '@/components/bo-editor/component.scss';
import Vue from 'vue';

window.errorHandler = function(err) {
	console.error(err);
}

var index = 0;

Vue.component('bo-editor', {
	template: template,
	props: ['value','width','height'],
	data() {
		return {
			id: 'bo-editor' + index++,
			ue: null
		};
	},
	mounted() {
		var editorEl =  this.$el.querySelector('script');
		editorEl.setAttribute('id', this.id);
		editorEl.style.width = `${this.width||600}px`;
		editorEl.style.height = `${this.height||300}px`;

		this.ue = UE.getEditor(this.id);
		this.ue.ready(() => {
			this.ue.setContent(this.value || '', false);
		});
	},
	methods: {
		// 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
		updateValue: function(value) {
			this.$emit('input', this.ue.getContent());
		}
	},
	watch: {
		value(newVal) {
			this.ue.ready(() => {
				this.ue.setContent(this.value || '', false);
			});
			//this.ue.setContent(newVal || '', false);
		}
	}
});