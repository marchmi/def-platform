import { nodeServiceRequest } from '@/service/nodeService.js'
const viewRequest = nodeServiceRequest('api', '/role')
const commonRequest = nodeServiceRequest('common', '/role')

export const fetchList = query => {
  return viewRequest({
    url: '',
    type: 'get',
    query
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

export const fetchSelect = id => {
  return commonRequest({
    url: `/enum`,
    type: 'get'
  })
}
