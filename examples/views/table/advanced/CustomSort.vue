<template>
  <div>
    <p>点击列头排序的实现，通过 <table-api-link prop="header-cell-click"/> 事件和 <table-api-link prop="sort"/> 方法非常简单就可以实现</p>

    <vxe-table
      border
      highlight-hover-row
      highlight-current-row
      ref="xTable"
      height="300"
      :data.sync="tableData"
      @header-cell-click="headerCellClickEvent">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable :filters="[{label: 'id大于10', value: 10}, {label: 'id大于40', value: 40}]" :filter-method="filterNameMethod"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          highlight-hover-row
          highlight-current-row
          ref="xTable"
          height="300"
          :data.sync="tableData"
          @header-cell-click="headerCellClickEvent">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable :filters="[{label: 'id大于10', value: 10}, {label: 'id大于40', value: 40}]" :filter-method="filterNameMethod"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          },
          methods: {
            headerCellClickEvent ({ column, triggerSort, triggerFilter }) {
              // 如果点击了列并且没触发对应的按钮，则手动排序
              if (!triggerSort && !triggerFilter) {
                this.$refs.xTable.sort(column.property)
              }
            },
            filterNameMethod ({ value, row, column }) {
              return row.id >= value
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    headerCellClickEvent ({ column, triggerSort, triggerFilter }) {
      // 如果点击了列并且没触发对应的按钮，则手动排序
      if (!triggerSort && !triggerFilter) {
        this.$refs.xTable.sort(column.property)
      }
    },
    filterNameMethod ({ value, row, column }) {
      return row.id >= value
    }
  }
}
</script>
