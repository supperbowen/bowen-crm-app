import {
	MessageBox
} from 'element-ui';

export default function(UE) {
	function showCodeModal() {
		MessageBox.$prompt('请输入代码', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
			inputErrorMessage: '邮箱格式不正确'
		}).then(({
			value
		}) => {
			this.$message({
				type: 'success',
				message: '你的邮箱是: ' + value
			});
		}).catch(() => {
			this.$message({
				type: 'info',
				message: '取消输入'
			});
		});
	}
	UE.registerUI('code', (editor, name) => {


		editor.registerCommand(name, {
			execCommand() {
				showCodeModal();
			}
		})

		let btn = new UE.ui.Button({
			name: name,
			title: '插入代码',
			onclick() {
				editor.execCommand(name);
			}
		});

		return btn;

	});
}