import Vue from 'vue'

export default function codePlugin(UE, handler) {
	UE.registerUI('bocode', function(editor, uiName) {
		//注册按钮执行时的command命令，使用命令默认就会带有回退操作
		editor.registerCommand(uiName, {
			execCommand: function() {
				//alert('execCommand:' + uiName)
				handler(editor, uiName);
			}
		});
		//创建一个button
		var btn = new UE.ui.Button({
			//按钮的名字
			name: uiName,
			//提示
			title: '源码',
			//添加额外样式，指定icon图标，这里默认使用一个重复的icon
			cssRules: 'background-position: -500px 0;',
			//点击时执行的命令
			onclick: function() {
				//这里可以不用执行命令,做你自己的操作也可
				editor.execCommand(uiName);
			}
		});
		return btn;
	}, 1);
}