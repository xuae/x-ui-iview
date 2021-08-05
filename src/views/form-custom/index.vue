<!--
自定义表单页面，实现了拖拽自定义表单元素及表单配置
使用的插件有：lodash、vuedraggable
-->
<template>
  <div class="form-custom">
    <!-- 顶部 -->
    <div class="form-header">
      <div />
      <div class="form-header__buttons">
        <Button v-if="!previewing" type="primary" icon="md-eye" ghost @click="previewing = true">
          预览
        </Button>
        <Button v-if="!previewing" type="primary" @click="onSave">保存</Button>
        <Button v-if="previewing" type="primary" ghost @click="onBack">返回</Button>
      </div>
    </div>
    <!-- 编辑内容 -->
    <div v-show="!previewing" class="form-container">
      <!-- 左侧 -->
      <div class="form-list">
        <div
          class="r-w-sb-c"
          style="margin-bottom: 16px; display: flex; justify-content: space-between"
        >
          <span>请选择调查表段落</span>
          <a @click="onAddForm">添加</a>
        </div>
        <div
          v-for="(item, index) in forms"
          :key="index"
          class="form-list__item"
          :class="formActive === item ? 'active' : ''"
          @click="onClickForm(item)"
        >
          {{ item.title }}
        </div>
      </div>
      <!-- 中间 -->
      <div class="form-fields">
        <div>请选择段落字段</div>
        <Collapse :value="['fixed', 'custom']" simple>
          <Panel
            v-if="formActive && formActive.fixedFields && formActive.fixedFields.length > 0"
            name="fixed"
          >
            固定字段
            <template slot="content">
              <Checkbox
                v-for="(item, index) in formActive.fixedFields"
                :key="index"
                v-model="item.checked"
                @on-change="onChangeFixedField(item)"
              >
                {{ item.label }}
              </Checkbox>
            </template>
          </Panel>
          <Panel name="custom">
            自定义字段
            <template slot="content">
              <draggable
                :list="customFields"
                :group="{ name: 'formEditor', pull: 'clone', put: false }"
                draggable=".custom-field"
                :sort="false"
              >
                <div v-for="(item, index) in customFields" :key="index" class="custom-field">
                  <Icon :type="item.icon" />
                  {{ item.label }}
                </div>
              </draggable>
            </template>
          </Panel>
        </Collapse>
      </div>
      <!-- 右边 -->
      <div class="form-editor">
        <Input v-model="formActive.tableName" placeholder="请输入调查表名" />
        <!-- 表单 -->
        <Form :label-width="100" label-colon>
          <draggable
            :list="formActive.fields"
            group="formEditor"
            tag="Row"
            :component-data="{ props: {} }"
            :animation="340"
            style="width: 100%; height: 100%; align-content: flex-start"
          >
            <Col
              v-for="(item, index) in formActive.fields"
              :key="$_.uniqueId(item.label)"
              :span="item.span || 24"
              class="form-item"
            >
              <custom-form-item :item="item" />
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
        </Form>
      </div>
    </div>
    <!-- 预览 -->
    <div v-show="previewing" class="form-preview">
      <Tabs value="0">
        <TabPane v-for="(form, index) in forms" :key="index" :name="index + ''" :label="form.title">
          <Form :label-width="100" label-colon>
            <Row>
              <Col
                v-for="item in form.fields"
                :key="$_.uniqueId(item.label)"
                :span="item.span || 24"
                class="form-item"
              >
                <custom-form-item :item="item" />
              </Col>
            </Row>
          </Form>
        </TabPane>
      </Tabs>
    </div>
    <!-- 表单控件配置信息 -->
    <Drawer v-model="fieldConfigVisible" title="字段配置" width="360">
      <Form :model="fieldConfig" :label-width="80">
        <FormItem label="标签名" prop="label">
          <Input v-model="fieldConfig.label" placeholder="标签名" :disabled="fieldConfig.isFixed" />
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
        <template
          v-if="['radio', 'checkbox'].includes(fieldConfig.component) && !fieldConfig.isFixed"
        >
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
        <Button style="margin-right: 8px" @click="onHideFieldConfig">取消</Button>
        <Button type="primary" @click="onSaveFieldConfig">保存</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import CustomFormItem from '@/views/form-custom/components/CustomFormItem';
import draggable from 'vuedraggable';

const defaultField = {
  label: null,
  span: 24,
  component: null,
  required: false,
  // 单选、多选选项
  options: [],
};

export default {
  components: { CustomFormItem, draggable },
  data() {
    return {
      // 预览
      previewing: false,
      // 拖拽的元素数据
      dragItem: null,
      // 左侧选中的调查表段落，用的对象是否相等来判断，别深度克隆
      formActive: null,
      // 调查表段落列表
      forms: [
        {
          title: '一般情况',
          tableName: '',
          // 最终编辑的表单数据
          fields: [],
          // 固定字段列表
          fixedFields: [
            {
              label: '国际码',
              component: 'input',
              span: 12,
            },
            {
              label: '病例编码',
              component: 'input',
              span: 12,
            },
            {
              label: '姓名',
              checked: true,
              component: 'input',
              span: 12,
              required: true,
            },
            {
              label: '性别',
              checked: true,
              component: 'radio',
              span: 12,
              options: [
                { label: '男', value: '1' },
                { label: '女', value: '2' },
              ],
            },
            {
              label: '身份证号',
              checked: true,
              component: 'input',
              span: 12,
              required: true,
            },
            {
              label: '年龄（岁）',
              component: 'input',
              span: 12,
            },
            {
              label: '联系电话',
              checked: true,
              component: 'input',
              span: 12,
              required: true,
            },
            {
              label: '现住址',
              checked: true,
              component: 'area',
              span: 24,
            },
            {
              label: '详细地址',
              checked: true,
              component: 'input',
              span: 24,
            },
            {
              label: '职业',
              component: 'input',
              span: 24,
            },
            {
              label: '文化程度',
              component: 'radio',
              options: [
                { label: '学龄前儿童', value: '1' },
                { label: '小学', value: '2' },
                { label: '初中', value: '3' },
                { label: '高中或中专', value: '4' },
                { label: '大学及以上', value: '5' },
                { label: '文盲', value: '6' },
                { label: '不详', value: '7' },
              ],
            },
            {
              label: '疾病名称',
              checked: true,
              component: 'disease',
            },
            {
              label: '病例分类',
              checked: true,
              component: 'radio',
              value: '1',
              options: [
                { label: '疑似病例', value: '1' },
                { label: '临床诊断病例', value: '2' },
                { label: '实验室确诊病例', value: '3' },
                { label: '排除', value: '4', showInput: true },
              ],
            },
          ],
        },
        {
          title: '发病及临床情况',
          tableName: '',
          fields: [],
          // 固定字段列表
          fixedFields: [
            {
              label: '发病日期',
              checked: true,
              component: 'date',
              span: 12,
            },
            {
              label: '发病地点',
              checked: true,
              span: 12,
            },
            {
              label: '初诊日期',
              component: 'date',
              span: 12,
            },
            {
              label: '初诊单位',
              span: 12,
            },
            {
              label: '确诊日期',
              component: 'date',
              span: 12,
            },
            {
              label: '确诊单位',
              span: 12,
            },
            {
              label: '是否住院',
              component: 'radio',
              span: 12,
              options: [
                { label: '是', value: '1' },
                { label: '否', value: '2' },
              ],
            },
            {
              label: '住院日期',
              component: 'date',
              span: 12,
            },
            {
              label: '住院单位',
              span: 12,
            },
            {
              label: '是否发热',
              component: 'radio',
              span: 12,
              options: [
                { label: '是', value: '1' },
                { label: '否', value: '2' },
              ],
            },
            {
              label: '发热持续天数',
              span: 12,
            },
            {
              label: '最高体温',
              span: 12,
            },
            {
              label: '临床症状',
              component: 'radio',
              value: '1',
              options: [
                { label: '咳嗽', value: '1' },
                { label: '胸闷', value: '2' },
                { label: '呼吸困难', value: '3' },
                { label: '食欲减退', value: '4' },
                { label: '头痛', value: '5' },
                { label: '恶心', value: '6' },
                { label: '其他', value: '7', showInput: true },
              ],
            },
          ],
        },
        {
          title: '流行病学调查',
          tableName: '',
          fields: [],
          // 固定字段列表
          fixedFields: [
            {
              label: '发病时在现住址县区居住时间',
              labelWidth: 260,
              checked: true,
              span: 24,
              component: 'radio',
              options: [
                { label: '＜7天', value: '1' },
                { label: '7-21天', value: '2' },
                { label: '22天-3月', value: '3' },
                { label: '＞3月', value: '4' },
              ],
            },
            {
              label: '是否在集体单位',
              labelWidth: 260,
              checked: true,
              span: 24,
              component: 'radio',
              options: [
                { label: '是', value: '1' },
                { label: '否', value: '2' },
                { label: '不详', value: '3' },
              ],
            },
            {
              label: '集体单位具体名称',
              labelWidth: 260,
              span: 24,
            },
            {
              label: '过去是否患过此病',
              labelWidth: 260,
              span: 24,
              component: 'radio',
              options: [
                { label: '是', value: '1' },
                { label: '否', value: '2' },
              ],
            },
            {
              label: '发病前2个月是否有外出（或旅游史）',
              labelWidth: 260,
              span: 24,
              component: 'radio',
              options: [
                { label: '是', value: '1' },
                { label: '否', value: '2' },
              ],
            },
            {
              label: '消毒和处理情况',
              labelWidth: 260,
              span: 24,
              component: 'radio',
              options: [
                { label: '随时消毒', value: '1' },
                { label: '终末消毒', value: '2' },
              ],
            },
            {
              label: '行程信息',
              labelWidth: 260,
              span: 24,
            },
          ],
        },
        {
          title: '采样登记',
          tableName: '',
          fields: [],
          // 固定字段列表
          fixedFields: [
            {
              label: '采样项目',
              span: 12,
            },
            {
              label: '采样地点',
              span: 12,
            },
            {
              label: '采样时间',
              span: 12,
              component: 'date',
            },
            {
              label: '送样时间',
              span: 12,
              component: 'date',
            },
            {
              label: '出结果时间',
              span: 12,
              component: 'date',
            },
            {
              label: '结果',
              span: 12,
            },
          ],
        },
        {
          title: '其他情况',
          tableName: '',
          fields: [],
          // 固定字段列表
          fixedFields: [],
        },
      ],
      // 自定义字段
      customFields: [
        {
          label: '单选框',
          icon: 'md-radio-button-off',
          component: 'radio',
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ],
        },
        {
          label: '多选框',
          icon: 'md-square-outline',
          component: 'checkbox',
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ],
        },
        {
          label: '输入框',
          icon: 'md-create',
          component: 'input',
        },
      ],
      // 字段配置
      fieldConfigVisible: false,
      fieldConfig: { ...defaultField },
      fieldIndex: null,
    };
  },
  created() {
    // 根据数据生成默认的字段
    this.forms.forEach(item => {
      if (!item.fields || item.fields.length === 0) {
        // 手动添加默认选中的固定字段
        item.fixedFields &&
          item.fixedFields.forEach(field => {
            if (field.checked) {
              this.onChangeFixedField(field, item);
            }
          });
      }
    });
    this.onClickForm(this.forms[0]);
  },
  methods: {
    // 保存
    onSave() {},
    // 返回
    onBack() {
      if (this.previewing) {
        this.previewing = !this.previewing;
      } else {
        this.$router.back();
      }
    },
    // 添加左侧调查表段落
    onAddForm() {
      const item = {
        title: '新增段落',
        tableName: '',
        fields: [],
      };
      this.forms.push(item);
      this.onClickForm(item);
    },
    // 点击左侧调查表段落
    onClickForm(item) {
      this.formActive = item;
    },
    // 改变固定字段
    onChangeFixedField(item, form = this.formActive) {
      const { checked } = item;
      if (checked) {
        item.isFixed = true;
        this.onAddField(item, form);
      } else {
        if (form) {
          const index = form.fields.findIndex(f => f.label === item.label && item.isFixed);
          this.onDelField(item, index);
        }
      }
    },
    // 添加字段
    onAddField(item, form = this.formActive) {
      if (form && form.fields) {
        form.fields.push(item);
      }
    },
    // 删除字段
    onDelField(item, index) {
      if (this.formActive && this.formActive.fields) {
        this.formActive.fields.splice(index, 1);
      }
      if (item.isFixed) {
        item.checked = false;
      }
    },
    // 显示字段配置表单
    onShowFieldConfig(filed, index) {
      this.fieldIndex = index;
      const temp = this.$_.cloneDeep(filed);
      temp.span = temp?.span || 24;
      temp.required = temp?.required || false;
      this.fieldConfig = temp;
      this.fieldConfigVisible = true;
    },
    // 取消字段配置
    onHideFieldConfig() {
      this.fieldConfigVisible = false;
      this.fieldConfig = { ...defaultField };
    },
    // 保存字段配置
    onSaveFieldConfig() {
      this.fieldConfigVisible = false;
      this.formActive.fields[this.fieldIndex] = this.fieldConfig;
      this.fieldIndex = null;
      this.fieldConfig = { ...defaultField };
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
.form-custom {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
}
// 顶部
.form-header {
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;

  &__buttons {
    ::v-deep .ivu-btn {
      margin-left: @padding-sm;
    }
  }
}
// 预览
.form-preview {
  background: white;
  padding: 16px;
  flex: 1;
}

.form-container {
  flex: 1;
  display: flex;
  justify-content: stretch;

  & > div {
    background-color: white;
    padding: 16px;
    margin-right: 16px;
    &:last-child {
      margin-right: 0;
    }
  }
}
// 调查表段落
.form-list {
  width: 200px;

  &__item {
    margin-bottom: 12px;
    text-align: center;
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 5px 10px;
    cursor: pointer;

    &:hover,
    &.active {
      background-color: rgba(3, 134, 255, 61);
      color: rgba(255, 255, 255, 81);
      border: 1px solid rgba(238, 238, 238, 100);
    }
  }
}
// 调查表字段
.form-fields {
  width: 200px;

  .custom-field {
    cursor: move;
    margin-bottom: 8px;
    font-size: 14px;

    ::v-deep .ivu-icon {
      font-size: 18px;
      line-height: 1;
      vertical-align: middle;
      color: #666;
    }
  }

  ::v-deep .ivu-collapse {
    border: none;
    .ivu-collapse-item {
      border: none;
    }
    .ivu-collapse-header {
      padding-left: 0;
      border: none;
      & > i {
        margin-right: 4px;
      }
    }
    .ivu-collapse-content-box {
      padding-bottom: 0;
    }
    .ivu-checkbox-wrapper {
      display: block;
      margin: 0 0 8px 0;
    }
  }
}
// 右侧表单编辑
.form-editor {
  flex: 1;
  display: flex;
  flex-direction: column;

  ::v-deep .ivu-form {
    margin-top: 24px;
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
      background: rgb(243, 248, 255);
      .form-item__buttons {
        visibility: visible;
      }
    }
  }
}
// 字段配置表单
.drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px @padding-md;
  text-align: right;
  background: #fff;
}

// 选项配置
.field-option {
  margin-bottom: 8px;
  .handle {
    cursor: move;
  }
  .remove {
    color: #ed4014;
    cursor: pointer;
  }
}
.field-option-add {
  color: #2d8cf0;
  cursor: pointer;
  display: inline-block;
  margin-left: 24px;
}
</style>
