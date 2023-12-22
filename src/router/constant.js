/**
 * 引入公共使用的组件
 */

 export const Layout = () => import('@/layout')

 /**
  * routeSortGather用于为路由表中的路由对象输出sort
  * 如查找到dashboard在数组中的下标是0，则dashboard的sort属性取值为0
  */
 export const routeSortGather = [
  'dashboard', // Dasshboard
  'system', // 组织权限中心
  'sysManage', // 系统管理
  'interfaceManage', // 接口资源
  'resourceManage', // 资源管理
  'dictManage', // 数据字典,
  'accunt', // 角色账号管理
  'roleManage', // 角色管理
  'accountManage', // 账号管理
 ]
 
 // 需要和文件夹名称拼接name属性的文件名
 export const combinedFileGather = ['detail', 'create']
  
 // 数组sort方法callback函数
 export function sortRoute (a, b) {
   return (a.meta?.sort || 0) - (b.meta?.sort || 0)
 }

// 菜单名称
export const RouteMenuTitles = {
  dashboard: '工作台',
  system: '组织权限中心',
  sysManage: '系统管理',
  interfaceManage: '接口资源',
  resourceManage: '资源管理',
  dictManage: '数据字典',
  account: '角色账号管理',
  roleManage: '角色管理',
  accountManage: '账号管理',
}