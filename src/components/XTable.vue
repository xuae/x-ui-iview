<!--表格组件-->
<template>
  <div class="base-table">
    <!-- 表格 -->
    <Table
      v-bind="$attrs"
      :loading="loadingTable"
      :data="tableData"
      :max-height="maxHeight"
      :columns="columns"
      v-on="$listeners"
    >
      <template
        v-for="item in slotsColumns"
        :slot="item.slot"
        slot-scope="{ column, row, index }"
      >
        <slot :name="item.slot" :column="column" :row="row" :index="index" />
      </template>
    </Table>
    <Page
      v-if="!noPages"
      :show-elevator="showElevator"
      :show-sizer="showSizer"
      :page-size-opts="sizes"
      :page-size="pageData.size"
      :total="pageData.total"
      :show-total="showTotal"
      :current="pageData.current"
      @on-page-size-change="onSizeChange"
      @on-change="onCurrentChange"
    ></Page>
  </div>
</template>
<script>
export default {
  name: 'XTable',
  props: {
    // 表格数据，可以是数组，也可以是一个 promise
    data: {
      type: [Array, Function],
      required: true,
    },
    // 列数据
    columns: {
      type: Array,
      required: true,
    },

    // 加载中
    loading: {
      type: Boolean,
      default: false,
    },
    // 出现纵向滚动条的高度
    maxHeight: {
      type: Number,
    },

    // 分页数据
    pages: Object,
    // 不显示分页
    noPages: {
      type: Boolean,
      default: false,
    },
    // 每页数据条数
    sizes: {
      type: Array,
      default: () => [10, 20, 30, 40],
      validator: val => Array.isArray(val) && val.length > 0,
    },
    // 是否显示每页数量
    showSizer: {
      type: Boolean,
      default: false,
    },
    // 是否显示跳转x页，可以快速切换到某一页
    showElevator: {
      type: Boolean,
      default: false,
    },
    // 是否显示总条数
    showTotal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loadingTable: false,
      tableData: [],
      pageData: {
        total: 0,
        current: 1,
        size: this.sizes[0],
      },
    };
  },
  computed: {
    slotsColumns() {
      if (!this.columns) {
        return [];
      }
      return this.columns.filter(item => Boolean(item.slot));
    },
  },
  watch: {
    loading: {
      handler(val) {
        this.loadingTable = val;
      },
      immediate: true,
    },
    data: {
      handler() {
        this.refreshTableData();
      },
      deep: true,
    },
    pages: {
      handler(val) {
        this.pageData = {
          ...this.pageData,
          ...val,
        };
      },
      deep: true,
      immediate: true,
    },
    noPages: {
      handler(val) {
        if (Array.isArray(this.data)) {
          if (val) {
            this.tableData = [...this.data];
          } else {
            const { current, size } = this.pageData;
            this.tableData = this.data?.slice(
              (current - 1) * size,
              current * size
            );
          }
        }
      },
      immediate: true,
    },
  },
  created() {
    this.refreshTableData(this.pageData.current, this.pageData.size);
  },
  methods: {
    // 获取表格数据
    async getTableData(current = 1, size = this.sizes[0]) {
      this.changeLoading(true);
      if (typeof this.data === 'function') {
        try {
          const res = await this.data({
            current,
            size,
          });
          if (
            res.data &&
            res.data.total > 0 &&
            res.data.data.length === 0 &&
            current > 1
          ) {
            return this.getTableData(current - 1);
          }
          this.tableData = res.data?.data || [];
          this.pageData.current = res.data?.current || 1;
          this.pageData.total = res.data?.total || 0;
          this.pageData.size = size;
        } catch (e) {
          console.warn(e);
        }
      } else if (Array.isArray(this.data)) {
        if (this.noPages) {
          this.tableData = [...this.data];
        } else {
          this.tableData = this.data?.slice(
            (current - 1) * size,
            current * size
          );
          this.pageData.total = this.data?.length || 0;
          this.pageData.current = current;
          this.pageData.size = size;
        }
      }
      this.changeLoading(false);
    },
    // 当前页数变了
    onCurrentChange(current) {
      if (!this.loadingTable) {
        this.getTableData(current, this.pageData.size);
      }
    },
    // 每页条数变了
    onSizeChange(size) {
      this.getTableData(1, size);
    },
    // 改变loading的值
    changeLoading(val) {
      this.loadingTable = val;
      this.$emit('update:loading', val);
    },
    // 刷新表格数据
    refreshTableData(current = 1, size = this.sizes[0]) {
      this.getTableData(current, size);
    },
  },
};
</script>
<style lang="less" scoped>
.base-table {
  ::v-deep .ivu-table-wrapper {
    overflow: unset;
  }

  ::v-deep .ivu-table {
    th {
      height: 48px;
      color: #333333;
    }

    td {
      color: #666666;
    }
  }

  ::v-deep .ivu-page {
    text-align: center;
    margin-top: @padding-md;
  }
}
</style>
