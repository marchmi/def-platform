import { defineStore } from 'pinia'
import { fetchSelect as fetchSysEnum } from '@/views/system/sysManage/api'
import { fetchSelect as fetchApiEnum } from '@/views/system/interfaceManage/api'

const useEnumStore = defineStore('enumStore', {
  state: () => {
    return {
      sysCode: [], // 系统编号
      uris: [], // 系统接口集合
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
        res.list.forEach(option => {
          this.uris.push({ key: option.uri, value: option.interfaceName })
        })
      })
    },
  }
})

export default useEnumStore
