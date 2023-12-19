<template>
  <app-main>
    <template #content>
      <mi-tabs tab-position="top" v-model="sysCode" style="height: 45px">
        <mi-tab-pane v-for="(sys, key) in systems" :key="key" :label="sys.value" :name="sys.key"></mi-tab-pane>
      </mi-tabs>
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
  import MOperation from '@/components/MOperation'
  import MTable from '@/components/MTable'
  import MFormDialog from '@/components/MFormDialog'

  import usePage from '@/components/hooks/usePage' // 组件props hook
  import useTable from '@/components/hooks/useTable'
  import useOperation from '@/components/hooks/useOperation'
  import useFormDialog from '@/components/hooks/useFormDialog'
  import useTableDef from '@/components/hooks/useTableDef'
  const { getTableFields, getFilterFields, getFormFields } = useTableDef(tableDef)
  
  import { fetchList, createOne, updateOne, deleteOne } from './api' // api引入
  import useEnumStore from '@/store/modules/useEnumStore'

  const enumStore = useEnumStore()
  enumStore.fetchSysEnum()

  const systems = ref(enumStore.sysCode)

  // 表格数据 分页器控制对象 搜索 重置搜索条件
  const { tableData } = usePage(fetchList)

  // 分页插件内部会触发第一次列表查询
  const handleSearch = async (sysCode) => {
    if(!sysCode) {
      return
    }
    fetchList(sysCode).then(res => {
      const list = res.list || []
      tableData.value = [...list]
    })
  }

  
  const sysCode = ref('') // 当前选中的系统
  watchEffect(() => {
    if(sysCode.value){
      handleSearch(sysCode.value)
      enumStore.fetchApiEnum(sysCode.value)
    }
  })

  watchEffect(() => {
    if(systems.value.length){
      sysCode.value = systems.value[0].key
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
          formDialog.title = '编辑资源'
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
              handleSearch(sysCode.value)
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

  const type = ref('add') // add | edit
  
  const handleSubmit = (formData, ref) => {
    ref.validate((valid, fields) => {
      if (valid) {
        if(formData.parentResource === formData.resourceCode){
          errorMsg(`资源CODE不能与系统CODE相同`)
          return
        }
        if(type.value==='add') {
          createOne({...formData}).then(res=>{
            successMsg(res.message)
            toggleFormDialogVisible(ref)
            handleSearch(sysCode.value)
          })
        }else {
          updateOne(formData.uuid,{...formData}).then(res=>{
            successMsg(res.message)
            toggleFormDialogVisible(ref)
            handleSearch(sysCode.value)
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
      label: '新增系统根节点',
      handler: () => { 
        type.value = 'add'
        formDialog.title = '新增系统根节点'
        formDialog.formAttrs.dataFormParams = { parentResource: sysCode.value, type: 'MENU' }
        formDialog.toggleDialogVisible()
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
