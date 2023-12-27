<template>
  <app-main>
    <template #content>
      <m-filter
        v-bind="filterAttrs"
        v-model:filter-params="filterAttrs.filterParams"
      >
      </m-filter>
      <div class="page-header-operate-wrap">
        <m-operation
          :operations="headerOperations"
        >
        </m-operation>
      </div>
      <m-table
        v-bind="tableAttrs"
      >
      </m-table>
      <m-pagination
        v-bind="paginationAttrs"
        @fetchData="()=>{handleSearch(filterAttrs.filterParams)}"
      >
      </m-pagination>
      <m-form-dialog
        v-bind="formDialog"
        v-model:dialog-visible="formDialog.dialogVisible"
      > 
      </m-form-dialog>
    </template>
  </app-main>
</template>
<script setup>
  import tableDef from './table.json'
  import { ref, reactive, onMounted, watchEffect } from 'vue'
  import { confirm, errorMsg, successMsg } from '@/utils/interaction'

  import AppMain from '@/components/AppMain' // 组件引入
  import MFilter from '@/components/MFilter'
  import MOperation from '@/components/MOperation'
  import MTable from '@/components/MTable'
  import MPagination from '@/components/MPagination'
  import MFormDialog from '@/components/MFormDialog'

  import usePage from '@/components/hooks/usePage' // 组件props hook
  import useFilter from '@/components/hooks/useFilter'
  import useTable from '@/components/hooks/useTable'
  import usePagination from '@/components/hooks/usePagination'
  import useOperation from '@/components/hooks/useOperation'
  import useFormDialog from '@/components/hooks/useFormDialog'
  import useTableDef from '@/components/hooks/useTableDef'
  const { getTableFields, getFilterFields, getFormFields, getItemRefer } = useTableDef(tableDef)
  
  import { fetchList, createOne, updateOne, deleteOne } from './api' // api引入
  import { fetchList as fetchResources } from '@/views/system/resourceManage/api' // api引入
  import useEnumStore from '@/store/modules/useEnumStore'

  const enumStore = useEnumStore()
  enumStore.fetchSysEnum()

  // 表格数据 分页器控制对象 搜索 重置搜索条件
  const { tableData, pagination, handleSearch, handleReset } = usePage(fetchList)

  // 筛选条件组件props
  const filterAttrs = useFilter({
    formFields: getFilterFields(),
    operations: [ // 操作栏
      {
        label: '搜索',
        handler: handleSearch, // 传递操作函数的指针
        props: { // 其它的按钮控制属性
          type: 'primary',
          size: 'default'
        }
      },
      {
        label: '重置',
        handler: handleReset,
        props: { // 其它的按钮控制属性
          type: 'info',
          size: 'default'
        }
      }
    ],
    filterParams: {
    }
  })

  // 表格中要展示的字段
  const tableColumn = getTableFields()

  // 表格组件props对象
  const tableAttrs = reactive(useTable({
    tableData: tableData,
    tableColumn: tableColumn,
    operations: [
      {
        label: '编辑',
        handler: (row) => {
          formDialog.title = '属性信息'
          formDialog.formAttrs.dataFormParams = { ...row }
          type.value = 'edit'
          formDialog.toggleDialogVisible()
        },
        props: {
          link: true
        }
      },
      {
        label: '删除',
        handler: (row) => {
          confirm().then(() => {
            deleteOne(row.uuid).then(res => {
              successMsg(res.message)
              handleSearch()
            })
          })
        },
        props: {
          link: true
        }
      }
    ],
    attrs: {
      fixedOperationColumn: 'right'
    }
  }))

  // 分页组件props对象
  const paginationAttrs = reactive(usePagination({
    pagination: pagination
  }).attrs)

  const formDialog = reactive(useFormDialog({
    formAttrs: {
      ...getFormFields(),
      operations: [
        {
          label: '关闭',
          // Using arrow functions to avoid: Uncaught (in promise) ReferenceError: Cannot access 'toggleFormDialogVisible' before initialization at setup 
          handler: (formData, ref) => { 
            toggleFormDialogVisible(ref)
          },
          props: { // 其他的按钮控制属性
            type: 'info',
            size: 'default'
          }
        },
        {
          label: '确认',
          handler: (formData, ref) => {
            handleSubmit(formData, ref)
          },
          props: { // 其他的按钮控制属性
            type: 'primary',
            size: 'default'
          }
        }
      ],
      formParams: {
      },
    }
  }))
  const refer = getItemRefer(formDialog.formAttrs.formFields)
  const resourceCodeMap = {}

  watchEffect(() => {
    const sysCode = formDialog.formAttrs.dataFormParams.sysCode
    if(resourceCodeMap[sysCode]) {
      refer.resourceCodes.props.options = resourceCodeMap[sysCode]
      return
    }
    if(sysCode) {
      fetchResources(sysCode).then(res => {
       resourceCodeMap[sysCode] = res.list
       refer.resourceCodes.props.options = resourceCodeMap[sysCode]
      })
    }
  })


  const type = ref('add') // add | edit
  
  const handleSubmit = (formData, ref) => {
    ref.validate((valid, fields) => {
      if (valid) {
        if(type.value === 'add') {
          createOne({...formData}).then(res=>{
            successMsg(res.message)
            toggleFormDialogVisible(ref)
            handleSearch()
          })
        }else {
          updateOne(formData.uuid, { ...formData }).then(res=>{
            successMsg(res.message)
            toggleFormDialogVisible(ref)
            handleSearch()
          })
        }
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  /**
   * 切换formDialog弹窗开启状态
   */
  const toggleFormDialogVisible = (ref) => {
    formDialog.formAttrs.dataFormParams = {}
    ref?.resetFields()
    formDialog.toggleDialogVisible()
  }

  /**
   * 头部操作栏
   */
  const {operations: headerOperations} = useOperation([
    {
      label: '新增',
      handler: () => { 
        type.value = 'add'
        formDialog.title = '新增属性'
        toggleFormDialogVisible()
      },
      props: {
        size: 'default'
      }
    }
  ])

  onMounted(()=>{
  })

</script>

<style lang="less" scoped>
.page-header-operate-wrap {
  display: flex;
  padding: 5px 0 15px 0;
  justify-content: flex-end;
}
</style>
