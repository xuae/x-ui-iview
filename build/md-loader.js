const mdIt = require('markdown-it');
const mdAnchor = require('markdown-it-anchor');
const mdToc = require('markdown-it-toc-done-right');
const mdContainer = require('markdown-it-container');
const {
  parse,
  compileTemplate,
  // compiler,
} = require('@vue/component-compiler-utils');
const compiler = require('vue-template-compiler');
const prism = require('prismjs');
const loadLanguages = require('prismjs/components/');
// 生成中文锚点时，不存在 %xx
const uslug = require('uslug');
const slugify = s => uslug(s);

module.exports = function (source) {
  // 自动给 markdown 文件内容添加目录占位符
  source = `[TOC]\n${source}`;
  // console.log(source);
  // 需要解析成 vue 代码块集合
  const componentCodeList = [];
  let styleCodeList = [];
  let demoBlockId = 0;
  const md = mdIt({
    html: true, // 在源码中启用 HTML 标签
    xhtmlOut: true, // 使用 '/' 来闭合单标签 （比如 <br />）
    // 将 markdown 中的代码块用 highlight 高亮显示
    highlight: function (str, lang) {
      if (!lang) {
        lang = 'markdown';
      }
      if (lang && !prism.languages[lang]) {
        loadLanguages([lang]);
      }
      const html = prism.highlight(str, prism.languages[lang], lang);
      const className = `language-${lang}`;
      return `<pre v-pre class="${className} line-numbers match-braces"><code class="${className}">${html}</code></pre>`;
    },
  });
  // 根据标题生成标题锚点
  md.use(mdAnchor, {
    // level: [1, 2, 3],
    slugify: slugify,
    permalink: true, // 是否在标题旁加入永久链接
    permalinkBefore: false, // 将永久链接放在标题的前面
    permalinkSymbol: '#', // 永久链接的符号 http://graphemica.com/%F0%9F%94%97
    permalinkClass: 'header-anchor', // 类名
  });
  // 根据标题生成文档目录
  md.use(mdToc, {
    level: [2, 3, 4, 5],
    slugify: slugify,
    listType: 'ul',
    containerClass: 'table-of-contents', // 类名
  });
  // 解析【:::tip:::】
  md.use(mdContainer, 'tip');
  // 解析【:::success:::】
  md.use(mdContainer, 'success');
  // 解析【:::warning:::】
  md.use(mdContainer, 'warning');
  // 解析【:::error:::】
  md.use(mdContainer, 'error');
  // 解析【:::demo:::】
  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        // 获取 demo 第一行的描述内容
        const desc = m && m.length > 1 ? m[1] : '';
        // 获取vue组件示例的代码
        const nextIndex = tokens[idx + 1];
        const content = nextIndex.type === 'fence' ? nextIndex.content : '';
        // 将 content 解析为 vue 组件基本属性对象;
        const descriptor = parse({
          source: content,
          filename: 'inline-component', // TODO：这里有待调整，不写此属性无法解析 script
          compiler,
        });
        const { template, styles } = descriptor;
        let { script } = descriptor;
        styleCodeList = styleCodeList.concat(styles);

        // 将template的转为render函数
        let templateCodeRender = '';
        if (template && template.content) {
          const compiled = compileTemplate({
            source: template.content,
            compiler: compiler,
          });
          const { tips, errors, code } = compiled;
          // tips
          if (tips && tips.length) {
            tips.forEach(tip => {
              console.warn(tip);
            });
          }
          // errors
          if (errors && errors.length) {
            console.error(`\n  Error compiling template:\n${errors}\n`);
          }
          // code
          if (code) {
            templateCodeRender = `${code}`;
          }
        }

        // 获取script的代码
        script = script ? script.content : '';
        if (script) {
          script = script.trim();
          script = script
            .replace(/export\s+default/, 'const exportJavaScript =')
            .replace(
              /import ({.*}) from 'vue'/g,
              (s, s1) => `const ${s1} = Vue`
            )
            /*.replace(
              /import ({.*}) from 'x-ui'/g,
              (s, s1) => `const ${s1} = require('x-ui')`
            );*/
        } else {
          script = 'const exportJavaScript = {};';
        }
        // 代码块解析将需要解析vue组件的存储，渲染html用组件名称替代
        const name = `demo-block-${demoBlockId}`;
        demoBlockId++;
        const demoComponentContent = `"${name}":(function () {
          ${templateCodeRender}
          ${script}
           return {
             render,
             staticRenderFns,
             ...exportJavaScript
          }
        })()`;
        // 渲染组件代码添加到数据集合
        componentCodeList.push(demoComponentContent);
        // 将需要渲染的示例用 demo-block 组件包裹替换插槽显示示例效果
        return `<demo-block>
        <template #source><${name} /></template>
        ${desc ? `<template #description>${md.render(desc)}</template>` : ''}
        `;
      }
      return '</demo-block>';
    },
  });

  // 将所有转换好的代码字符串拼接成vue单组件template、script、style格式
  return `
    <template>
      <div ref="doc" class="demo-doc">
        ${md.render(source)}
      </div>
    </template>
    <script>
    import * as Vue from 'vue';
    export default {
      name: 'DemoDoc',
      components: {
        ${componentCodeList.join(',')}
      },
      data() {
        return {
          directories: [],
        }
      },
      mounted() {
        // 把当前路由加在锚点前面
        document.querySelectorAll('a.header-anchor').forEach(this.setHref);
        // 修改目录 a 标签的 href
        document.querySelectorAll('.table-of-contents a').forEach(a => {
          this.setHref(a);
          this.directories.push(a);
        });
        this.$parent.$el.addEventListener('scroll', this.windowScroll);
        // 重新跳转至锚点处
        const hash = this.$route.hash;
        if (hash) {
          this.$parent.$el.scrollTop = document.querySelector(decodeURI(hash))?.offsetTop - 75;
        }
      },
      beforeDestroy() {
        this.$parent.$el.removeEventListener('scroll', this.windowScroll);
      },
      methods: {
        windowScroll() {
          const scrollTop = this.$parent.$el.scrollTop;
          const anchors = document.querySelectorAll('a.header-anchor');
          let hasActive = false;
          for(let i = 0; i < anchors.length; i++) {
            const a = anchors[i];
            const aTop = a.offsetTop;
            const directory = this.directories.find(d => {
              return d.getAttribute('href') === a.getAttribute('href');
            });
            if(!directory) {
              continue;
            }
            if(hasActive) {
              directory.classList.remove('active');
            } else {
              const next = anchors[i + 1] || a;
              const nextTop = next.offsetTop;
              if(i === anchors.length -1 || aTop >= scrollTop || (aTop < scrollTop && nextTop - 300 > scrollTop)) {
                hasActive = true;
                !directory.classList.contains('active') && directory.classList.add('active');
              } else {
                directory.classList.remove('active');
              }
            }
          }
        },
        setHref(a) {
          const route = this.$route;
          const href = a.getAttribute('href');
          if (href && href.indexOf('#') === 0) {
            a.setAttribute('href', '#' + route.path + href);
          }
        }
      },
    }
    </script>
    <style lang="less" scoped>
    @import "../../assets/style/demo.less";
    </style>
  `;
  /*
    <style lang='less'>
    ${Array.from(styleCodeList, m => m.content).join('\n')}
    </style>
  */
};
