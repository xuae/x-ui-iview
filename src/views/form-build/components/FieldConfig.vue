<template>
  <!-- 表单控件配置信息 -->
  <Drawer :value="show" title="字段配置" width="360" @on-close="onClose">
    <Form :model="fieldConfig" :label-width="80">
      <FormItem label="标签名" prop="label">
        <Input v-model="fieldConfig.label" placeholder="标签名" />
      </FormItem>
      <FormItem label="标签宽度" prop="labelWidth">
        <Input v-model="fieldConfig.labelWidth" type="number" placeholder="标签宽度" />
      </FormItem>
      <FormItem label="表单栅格" prop="span">
        <InputNumber v-model="fieldConfig.span" :min="2" :max="24" :step="4" />
      </FormItem>
      <FormItem label="必填" prop="required">
        <i-switch v-model="fieldConfig.required">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
      </FormItem>
      <Divider>Props</Divider>
      <FormItem label="尺寸" prop="size">
        <Select v-model="fieldProps.size">
          <Option value="small" label="small" />
          <Option value="default" label="default" />
          <Option value="large" label="large" />
        </Select>
      </FormItem>
      <FormItem label="占位文本" prop="placeholder">
        <Input v-model="fieldProps.placeholder" placeholder="占位文本" />
      </FormItem>
      <FormItem label="是否禁用" prop="disabled">
        <i-switch v-model="fieldProps.disabled">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
      </FormItem>
      <template v-if="['radio', 'checkbox'].includes(fieldConfig.component)">
        <Divider>选项</Divider>
        <draggable :list="fieldConfig.options" draggable=".field-option" handle=".handle">
          <div
            v-for="(item, index) in fieldConfig.options"
            :key="$_.uniqueId(item.label)"
            class="field-option"
          >
            <Icon type="md-menu" size="20" class="handle" />
            <Input v-model="item.label" placeholder="选项名" style="width: 160px" />
            <Input v-model="item.value" placeholder="选项值" style="width: 100px" />
            <Icon
              type="ios-remove-circle-outline"
              size="20"
              class="remove"
              @click="onDelOption(item, index)"
            />
          </div>
          <div slot="footer" class="field-option-add" @click="onAddOption">
            <Icon type="ios-add-circle-outline" size="18" />
            添加选项
          </div>
        </draggable>
      </template>
    </Form>
    <div class="drawer-footer">
      <Button style="margin-right: 8px" @click="onClose">取消</Button>
      <Button type="primary" @click="onSave">保存</Button>
    </div>
  </Drawer>
</template>

<script>
export default {
  name: 'FieldConfig',
  model: {
    prop: 'visible',
    event: 'change',
  },
  props: {
    // 是否显示，可使用 v-model
    visible: {
      type: Boolean,
      default: false,
    },
    // 字段配置数据
    value: {
      type: Object,
    },
  },
  data() {
    return {
      show: false,
      // 表单字段配置项数据
      filedData: {},
      fieldConfig: {},
      fieldProps: {},
    };
  },
  watch: {
    visible: {
      handler(val) {
        this.show = val;
        if (val) {
          this.filedData = this.$_.cloneDeep(this.value);
          this.fieldConfig = this.filedData?.config;
          this.fieldProps = this.filedData?.props;
        } else {
          this.filedData = {};
        }
      },
      immediate: true,
    },
  },
  methods: {
    // emit change 事件
    emitChange(val) {
      this.$emit('change', val);
    },
    emitSave() {
      for (const k in this.fieldConfig) {
        const val = this.fieldConfig[k];
        if (!val && val !== 0) {
          this.fieldConfig[k] = null;
        } else if (k === 'labelWidth') {
          this.fieldConfig[k] = Number(val);
        }
      }
      this.$emit('save', this.filedData);
    },
    // 关闭抽屉
    onClose() {
      this.emitChange(false);
    },
    // 保存字段配置
    onSave() {
      this.emitSave();
      this.onClose();
    },
    // 删除选项
    onDelOption(item, index) {
      this.fieldConfig.options.splice(index, 1);
    },
    // 添加选项
    onAddOption() {
      this.fieldConfig.options.push({
        label: '',
        value: '',
      });
    },
  },
};
</script>

<style lang="less" scoped>
// 字段配置表单
.drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
