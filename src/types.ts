export const OWNER_ID = 'pilot-user'
export const OWNER_WHATSAPP = '5511999999999'

export type LoanCategory = 'livros' | 'eletronicos' | 'ferramentas' | 'outros'
export type LoanStatus = 'active' | 'returned'
export type LoanComputedStatus = LoanStatus | 'overdue'

export type Loan = {
  id: string
  slug: string
  owner_id: string
  owner_phone: string
  photo: string
  object_name: string
  category: LoanCategory
  borrower_name: string
  borrower_phone: string
  created_at: string
  due_at: string
  status: LoanStatus
}

export type CreateLoanPayload = {
  photo: string
  object_name: string
  category: LoanCategory
  borrower_name: string
  borrower_phone: string
  due_in_days: number
}
