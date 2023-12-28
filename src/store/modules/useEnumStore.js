import { defineStore } from 'pinia'
import { fetchSelect as fetchSysEnum } from '@/views/system/sysManage/api'
import { fetchSelect as fetchApiEnum } from '@/views/system/interfaceManage/api'
import { fetchSelect as fetchRoleEnum } from '@/views/account/roleManage/api'

const useEnumStore = defineStore('enumStore', {
  state: () => {
    return {
      sysCode: [], // 系统编号
      uris: [], // 系统接口集合
      roles: []
    }
  },
  getters: {},
  actions: {
    /**
     * 获取系统鉴权code
     */
    fetchSysEnum() {
      fetchSysEnum().then( res =>{
        this.sysCode.length = 0
        res.list.forEach(option => {
          this.sysCode.push({ key: option.sysCode, value: option.sysName })
        })
      })
    },
    /**
     * 获取系统接口信息
     */
    fetchApiEnum(sysCode) {
      fetchApiEnum(sysCode).then( res =>{
        this.uris.length = 0
        res.list.forEach(api => {
          this.uris.push({ key: api.uri, value: api.interfaceName })
        })
      })
    },
    /**
     * 获取系统接口信息
     */
     fetchRoleEnum(sysCode) {
      fetchRoleEnum(sysCode).then( res =>{
        this.roles.length = 0
        res.list.forEach(role => {
          this.roles.push({ key: role.uuid, value: role.roleName })
        })
      })
    },
  }
})

export default useEnumStore
