import { useQuery } from '@tanstack/react-query'
import { getSentInquiries, getReceivedInquiries } from '../../api/inquiries.api'

export function useInquiriesSent(page = 1, limit = 20) {
  return useQuery({
    queryKey: ['inquiries', 'sent', page, limit],
    queryFn: () => getSentInquiries(page, limit),
  })
}

export function useInquiriesReceived(page = 1, limit = 20) {
  return useQuery({
    queryKey: ['inquiries', 'received', page, limit],
    queryFn: () => getReceivedInquiries(page, limit),
  })
}
