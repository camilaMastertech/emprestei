import { OWNER_ID, OWNER_WHATSAPP } from '../types'
import type { CreateLoanPayload, Loan, LoanComputedStatus } from '../types'

const LOANS_STORAGE_KEY = 'emprestei.loans.v1'

const DAY_IN_MS = 24 * 60 * 60 * 1000

const nowIso = () => new Date().toISOString()

const addDays = (isoDate: string, days: number) => new Date(new Date(isoDate).getTime() + days * DAY_IN_MS).toISOString()

const normalizePhone = (phone: string) => phone.replace(/\D/g, '')

const makeSlug = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

const getStoredLoans = (): Loan[] => {
  const raw = localStorage.getItem(LOANS_STORAGE_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw) as Loan[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const setStoredLoans = (loans: Loan[]) => localStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(loans))

export const getLoans = () => getStoredLoans()

export const getLoanBySlug = (slug: string) => getStoredLoans().find((loan) => loan.slug === slug)

export const createLoan = (payload: CreateLoanPayload): Loan => {
  const loans = getStoredLoans()
  const createdAt = nowIso()
  let slug = makeSlug()
  while (loans.some((loan) => loan.slug === slug)) {
    slug = makeSlug()
  }

  const loan: Loan = {
    id: crypto.randomUUID(),
    slug,
    owner_id: OWNER_ID,
    owner_phone: OWNER_WHATSAPP,
    photo: payload.photo,
    object_name: payload.object_name.trim(),
    category: payload.category,
    borrower_name: payload.borrower_name.trim(),
    borrower_phone: normalizePhone(payload.borrower_phone),
    created_at: createdAt,
    due_at: addDays(createdAt, payload.due_in_days),
    status: 'active',
  }

  setStoredLoans([loan, ...loans])
  return loan
}

export const markLoanAsReturned = (id: string) => {
  const loans = getStoredLoans()
  const next = loans.map((loan) => (loan.id === id ? { ...loan, status: 'returned' as const } : loan))
  setStoredLoans(next)
}

export const getComputedStatus = (loan: Loan): LoanComputedStatus => {
  if (loan.status === 'returned') return 'returned'
  if (Date.now() > new Date(loan.due_at).getTime()) return 'overdue'
  return 'active'
}

export const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(isoDate))

export const buildWhatsappUrl = (phone: string, text: string) =>
  `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(text)}`
