<!-- 自定义表单构建 -->
<template>
  <div class="form-build">
    <!-- 组件列表 -->
    <div class="form-build__left">
      <div class="form-build__left-header">拖拽或点击组件</div>
      <draggable
        :list="components"
        :group="{ name: 'fields', pull: 'clone', put: false }"
        draggable=".form-build__left-item"
        :sort="false"
        :clone="cloneField"
      >
        <div v-for="(item, index) in components" :key="index" class="form-build__left-item" @click="onAddField(item)">
          <Icon :type="item.componentIcon" :size="18" />
          {{ item.config.label }}
        </div>
      </draggable>
    </div>
    <!-- 表单编辑区域 -->
    <div class="form-build__right">
      <Form :label-width="100" label-colon>
        <draggable
          :list="fields"
          group="fields"
          tag="Row"
          :animation="340"
          style="width: 100%; height: 100%; align-content: flex-start"
        >
          <Col
            v-for="(item, index) in fields"
            :key="$_.uniqueId(item.config.label)"
            :span="item.config.span || 24"
            class="form-item"
          >
            <custom-form-item :value="item" />
            <div class="form-item__buttons">
              <Button
                type="primary"
                icon="md-create"
                size="small"
                shape="circle"
                @click="onShowFieldConfig(item, index)"
              />
              <Button
                type="error"
                icon="md-trash"
                size="small"
                shape="circle"
                @click="onDelField(item, index)"
              />
            </div>
          </Col>
        </draggable>
        <h3 v-show="!fields.length" class="empty-info">从左侧拖入或点击组件进行表单设计</h3>
      </Form>
    </div>
    <field-config v-model="fieldConfigVisible" :value="fieldConfig" @save="onSaveFiledConfig" />
  </div>
</template>

<script>
import config from '@/views/form-build/config';
import CustomFormItem from './components/CustomFormItem';
import draggable from 'vuedraggable';
import FieldConfig from '@/views/form-build/components/FieldConfig';

export default {
  components: { FieldConfig, CustomFormItem, draggable },
  data() {
    return {
      // 基本组件配置信息列表
      components: Object.values(config),
      // 编辑的表单字段
      fields: [],
      // 是否显示字段配置表单
      fieldConfigVisible: false,
      fieldConfig: null,
    };
  },
  methods: {
    // 克隆字段
    cloneField(origin) {
      return this.$_.cloneDeep(origin);
    },
    // 添加字段
    onAddField(item) {
      this.fields.push(this.cloneField(item));
    },
    // 删除字段
    onDelField(item, index) {
      this.fields.splice(index, 1);
    },
    // 显示字段配置表单
    onShowFieldConfig(item, index) {
      this.fieldConfig = item;
      this.fieldConfigVisible = true;
    },
    // 保存字段配置数据
    onSaveFiledConfig(item) {
      this.fieldConfig.config = item.config;
      this.fieldConfig.props = item.props;
    },
  },
};
</script>

<style lang="less" scoped>
.form-build {
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: stretch;

  & > div {
    background: @white;
    padding: @padding-md;

    &:not(:last-child) {
      margin-right: @padding-md;
    }
  }

  &__left {
    width: 160px;
    &-header {
      margin-bottom: @padding-md;
    }
    &-item {
      cursor: move;
      padding: @padding-xs @padding-sm;
      border: 1px dashed transparent;
      background: @background-color-base;
      &:hover {
        border-color: @border-color-base;
      }
    }
  }

  &__right {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;

    .empty-info {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    ::v-deep .ivu-form {
      flex: 1;

      .ivu-form-item-label {
        cursor: move;
      }
    }
    .form-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      margin-bottom: 4px;

      ::v-deep .ivu-form-item {
        flex: 1;
        margin-bottom: 0;
      }

      &__buttons {
        width: 100px;
        text-align: right;
        visibility: hidden;
        ::v-deep .ivu-btn {
          margin-left: 4px;
        }
      }

      &:hover {
        background: @background-color-base;
        .form-item__buttons {
          visibility: visible;
        }
      }
    }
  }
}
</style>
