<template>
  <div :class="classes" :style="styles" @click="back">
    <slot>
      <div :class="innerClasses">
        <i class="ivu-icon ivu-icon-ios-arrow-up" />
      </div>
    </slot>
  </div>
</template>

<script>
import { scrollTop } from 'view-design/src/utils/assist';
const prefixCls = 'ivu-back-top';

export default {
  name: 'XBackTop',
  props: {
    height: {
      type: Number,
      default: 400,
    },
    bottom: {
      type: Number,
      default: 30,
    },
    right: {
      type: Number,
      default: 30,
    },
    duration: {
      type: Number,
      default: 1000,
    },
    target: {
      type: Function,
      default: () => window,
    },
  },
  data() {
    return {
      backTop: false,
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-show`]: this.backTop,
        },
      ];
    },
    styles() {
      return {
        bottom: `${this.bottom}px`,
        right: `${this.right}px`,
      };
    },
    innerClasses() {
      return `${prefixCls}-inner`;
    },
  },
  watch: {
    target: {
      handler(val, oldVal) {
        if (val) {
          val().addEventListener('scroll', this.handleScroll, false);
          val().addEventListener('resize', this.handleScroll, false);
        }
        if (oldVal) {
          oldVal().removeEventListener('scroll', this.handleScroll, false);
          oldVal().removeEventListener('resize', this.handleScroll, false);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  beforeDestroy() {
    this.target().removeEventListener('scroll', this.handleScroll, false);
    this.target().removeEventListener('resize', this.handleScroll, false);
  },
  methods: {
    handleScroll(event) {
      this.backTop = event.target.scrollTop >= this.height;
    },
    back() {
      const sTop = this.target().scrollTop;
      scrollTop(this.target(), sTop, 0, this.duration);
      this.$emit('on-click');
    },
  },
};
</script>

<style scoped></style>
