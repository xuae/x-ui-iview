# Table 表格

## 代码演示

### 基本用法

`data`是数组

:::demo
```html
<template>
  <x-table :columns="columns" :data="tableData">
    <template slot-scope="{ row, index }" slot="action">
      <x-link type="primary">详情</x-link>
    </template>
  </x-table>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        { title: '姓名', key: 'name' },
        { title: '年龄', key: 'age' },
        { title: '操作', slot: 'action', align: 'center' },
      ],
      tableData: [
        { name: '张三', age: 18 },
        { name: '李四', age: 16 },
      ],
    };
  },
}
</script>
```
:::

### API接口用法

`data`是方法

接收一个参数，格式如下：
```
{
  current: number,  // 当前页数
  size: number,     // 每页条数
}
```

返回的数据结构如下所示：
```
{
  data: {
    data: array,      // 列表数据
    total: number,    // 总条数
    size: number,     // 每页条数
    current: number,  // 当前页数
  }
}
```

:::demo
```html
<template>
  <x-table :columns="columns" :data="getTableData" show-sizer>
    <template slot-scope="{ row, index }" slot="action">
      <x-link type="primary">详情</x-link>
    </template>
  </x-table>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        { title: '姓名', key: 'name' },
        { title: '年龄', key: 'age' },
        { title: '操作', slot: 'action', align: 'center' },
      ],
    };
  },
  methods: {
    getTableData({ current, size }) {
      return new Promise(resolve => {
        const data = [];
        for (let i = 1; i <= size; i++) {
          data.push({
            id: i,
            name: '姓名',
            age: (current - 1) * size + i,
          })
        }
        setTimeout(() => resolve({
          data: {
            total: 100,
            current,
            data: data,
          },
        }), 2000);
      });
    },
  },
}
</script>
```
:::

### 不显示分页

`no-pages`: 是否显示分页信息，默认：`false`

:::demo
```html
<template>
  <x-table :columns="columns" :data="tableData" no-pages>
    <template slot-scope="{ row, index }" slot="action">
      <x-link type="primary">详情</x-link>
    </template>
  </x-table>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        { title: '姓名', key: 'name' },
        { title: '年龄', key: 'age' },
        { title: '操作', slot: 'action', align: 'center' },
      ],
      tableData: [
        { name: '张三', age: 18 },
        { name: '李四', age: 16 },
      ],
    };
  },
}
</script>
```
:::

### 分页配置

- `show-total`: 是否显示总条数，默认：`false`
- `show-sizer`: 是否显示每页条数，默认：`false`
- `show-elevator`: 是否显示跳转至x页，默认：`false`
- `sizes`: 每页条数，默认：`[10, 20, 30, 40]`

:::demo
```html
<template>
  <x-table :columns="columns" :data="tableData" :sizes="sizes" show-total show-sizer show-elevator>
    <template slot-scope="{ row, index }" slot="action">
      <x-link type="primary">详情</x-link>
    </template>
  </x-table>
</template>
<script>
export default {
  data() {
    const data = [];
    for (let i = 1; i <= 100; i ++) {
      data.push({ name: '张三', age: i });
    }
    return {
      sizes: [5, 10],
      columns: [
        { title: '姓名', key: 'name' },
        { title: '年龄', key: 'age' },
        { title: '操作', slot: 'action', align: 'center' },
      ],
      tableData: data,
    };
  },
}
</script>
```
:::

## API

### Props

:::warning
当 data 是 function 时，类型规定如下：
:::
```
Function({ current: number, size: number }) => Promise<{
  data: {
    data: array,      // 列表数据
    total: number,    // 总条数
    size: number,     // 每页条数
    current: number,  // 当前页数
  }
}>
```

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 版本   |
| ---- | ---- | ---- | ------ | ------ | ------ |
| data | 表格数据 | _array_ / _function_ | — | — |
| columns | 列数据，具体请查看 iview 官方文档 | _array_ | — | — |
| max-height | 出现纵向滚动条的高度 | _number_ | — | — |
| no-pages | 不显示分页 | _boolean_ | — | `false` |
| sizes | 每页数据条数 | _array_ | — | `[10, 20, 30, 40]` |
| show-sizer | 是否显示每页数量 | _boolean_ | — | `false` |
| show-elevator | 是否显示跳转x页，可以快速切换到某一页 | _boolean_ | — | `false` |
| show-total | 是否显示总条数 | _boolean_ | — | `false` |

### Slots
无

### Events
请查看 <a href="https://www.iviewui.com/components/table" target="_blank">iview</a> 官方文档中表格的事件

### Methods
| 方法名称  | 说明      | 类型      | 版本      |
| --------- | --------- | --------- | --------- |
| refreshTableData     | 刷新表格数据  | *Function(current: number, size: number)*   |
