import { enumToArray } from '@/utils'

// 上架状态
export const ON_SHELF_STATUS = enumToArray({
    onShelf: '上架',
    takeOff: '下架'
})

export const IS_NECESSARY = enumToArray({
    necessary: '必要',
    unnecessary: '非必要'
})
