import apiClient from '../api/client'

export const getCategories = async () => {
  const response = await apiClient.get('/v1/Categories')
  return response.data?.data || []
}

export const getCategoryWords = async (categoryId) => {
  const response = await apiClient.get(`/v1/Categories/${categoryId}/words`)
  return response.data?.data || []
}
