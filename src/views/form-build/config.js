// 表单组件配置

// Input 输入框
export const input = {
  component: 'Input', // 组件名
  componentIcon: 'ios-create-outline', // 组件图标
  document: 'https://www.iviewui.com/components/input', // 官方文档地址

  // 以下是 form item 的配置信息
  config: {
    span: 24, // 占的栅格数
    label: '输入框', // 标签名
    labelWidth: null, // 标签宽度
    required: true, // 是否必填
  },

  // 以下是组件接收参数的配置信息
  props: {
    'type': 'text', // 输入框类型，可选值为 text、password、textarea、url、email、date、number、tel String text
    'size': null, // 输入框尺寸，可选值为large、small、default或者不设置 String -
    'placeholder': '请输入', // 占位文本 String -
    'clearable': true, // 是否显示清空按钮 Boolean false
    'border': true, // 是否显示边框 Boolean true
    'disabled': false, // 设置输入框为禁用状态 Boolean false
    'readonly': false, // 设置输入框为只读 Boolean false
    'maxlength': null, // 最大输入长度 Number -
    'show-word-limit': false, // 是否显示输入字数统计，可以配合 maxlength 使用 Boolean false
    'password': false, // 是否显示切换密码图标 Boolean false
    'icon': null, // 输入框尾部图标，仅在 text 类型下有效 String -
    'prefix': null, // 输入框头部图标 String -
    'suffix': null, // 输入框尾部图标 String -
    'search': false, // 是否显示为搜索型输入框 Boolean false
    'enter-button': false, // 开启 search 时可用，是否有确认按钮，可设为按钮文字 Boolean | String false
    'rows': 2, // 文本域默认行数，仅在 textarea 类型下有效 Number 2
    'autosize': false, // 自适应内容高度，仅在 textarea 类型下有效，可传入对象，如 { minRows: 2, maxRows: 6 } Boolean | Object false
    'number': false, // 将用户的输入转换为 Number 类型 Boolean false
    'autofocus': false, // 自动获取焦点 Boolean false
    'autocomplete': 'off', // 原生的自动完成功能 String off
    'element-id': null, // 给表单元素设置 id，详见 Form 用法。 String -
    'spellcheck': false, // 原生的 spellcheck 属性 Boolean false
    'wrap': 'soft', // 原生的 wrap 属性，可选值为 hard 和 soft，仅在 textarea 下生效 String soft
  },
};

export default {
  input,
};
