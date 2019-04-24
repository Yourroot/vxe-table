import XEUtils from 'xe-utils'

const browse = XEUtils.browse()
const HandleFunc = {
  browse,
  wheelType: /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel',
  isPx (val) {
    return val && /^\d+(px)?$/.test(val)
  },
  isScale (val) {
    return val && /^\d+%$/.test(val)
  },
  getColumnList (columns) {
    let result = []
    columns.forEach(column => {
      if (column.children) {
        result.push.apply(result, HandleFunc.getColumnList(column.children))
      } else {
        result.push(column)
      }
    })
    return result
  },
  getColumnConfig (_vm, { renderHeader, renderCell } = {}) {
    return {
      // 基本属性
      type: _vm.type,
      property: _vm.prop,
      label: _vm.label,
      width: _vm.width,
      minWidth: _vm.minWidth,
      fixed: _vm.fixed,
      align: _vm.align,
      headerAlign: _vm.headerAlign,
      ellipsis: _vm.ellipsis,
      showTitle: _vm.showOverflowTitle,
      showTooltip: _vm.showOverflowTooltip,
      indexMethod: _vm.indexMethod,
      formatter: _vm.formatter,
      // 渲染属性
      visible: true,
      level: 1,
      rowSpan: 1,
      colSpan: 1,
      renderWidth: 0,
      children: _vm.children,
      renderHeader: renderHeader || _vm.renderHeader,
      renderCell: renderCell || _vm.renderCell
    }
  },
  // 有序的组装列配置
  assemColumn (_vm) {
    let { $table, $parent, columnConfig } = _vm
    let children = $parent.children
    if (children) {
      children.splice([].indexOf.call($parent.$el.children, _vm.$el), 0, columnConfig)
    } else {
      $table.collectColumn.splice([].indexOf.call($table.$refs.hideColumn.children, _vm.$el), 0, columnConfig)
    }
  },
  checkScrolling (bodyElem, leftBody, rightBody) {
    if (leftBody) {
      HandleFunc.updateScrolling(leftBody.$el.parentNode, bodyElem.scrollLeft)
    }
    if (rightBody) {
      HandleFunc.updateScrolling(rightBody.$el.parentNode, bodyElem.clientWidth < bodyElem.scrollWidth - bodyElem.scrollLeft)
    }
  },
  updateScrolling (wrapperElem, isMiddle) {
    let className = wrapperElem.className
    if (isMiddle) {
      className = className.replace('scrolling--none', 'scrolling--middle')
    } else {
      className = className.replace('scrolling--middle', 'scrolling--none')
    }
    wrapperElem.className = className
  }
}

export default HandleFunc
