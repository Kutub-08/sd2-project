import axiosClient from './axiosClient'
import type { ApiSuccess, PaginatedData } from '../types/api.types'
import type { Inquiry } from '../types/inquiry.types'

type InquiryResponse = Inquiry

export async function createInquiry(listingId: string, message: string) {
  const res = await axiosClient.post<ApiSuccess<InquiryResponse>>('/inquiries', {
    listingId,
    message,
  })
  return res.data.data
}

export async function getSentInquiries(page = 1, limit = 20) {
  const res = await axiosClient.get<ApiSuccess<PaginatedData<InquiryResponse>>>('/inquiries/sent', {
    params: { page, limit },
  })
  return res.data.data
}

export async function getReceivedInquiries(page = 1, limit = 20) {
  const res = await axiosClient.get<ApiSuccess<PaginatedData<InquiryResponse>>>('/inquiries/received', {
    params: { page, limit },
  })
  return res.data.data
}

export async function updateInquiryStatus(id: string, status: 'PENDING' | 'RESPONDED' | 'CLOSED') {
  const res = await axiosClient.patch<ApiSuccess<InquiryResponse>>(`/inquiries/${id}/status`, { status })
  return res.data.data
}
