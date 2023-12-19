import { nodeServiceRequest } from '@/service/nodeService.js'
const viewRequest = nodeServiceRequest('api', '/resource')
const commonRequest = nodeServiceRequest('common', '/resource')

export const fetchList = sysCode => {
  return viewRequest({
    url: `/tree/${sysCode}`,
    type: 'get'
  })
}

export const createOne = body => {
  return viewRequest({
    url: '',
    type: 'post',
    body
  })
}

export const fetchDetail = id => {
  return viewRequest({
    url: `/${id}`,
    type: 'get'
  })
}

export const updateOne = (id, body) => {
  return viewRequest({
    url: `/${id}`,
    type: 'put',
    body
  })
}

export const deleteOne = id => {
  return viewRequest({
    url: `/${id}`,
    type: 'delete'
  })
}
