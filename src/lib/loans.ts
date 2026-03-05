import { createClient } from '@supabase/supabase-js'
import { OWNER_ID, OWNER_WHATSAPP } from '../types'
import type { CreateLoanPayload, Loan, LoanComputedStatus } from '../types'

const LOANS_STORAGE_KEY = 'emprestei.loans.v1'
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const CLOUD_PERSISTENCE_ENABLED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
const supabase = CLOUD_PERSISTENCE_ENABLED ? createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!) : null

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

const sortLoans = (loans: Loan[]) =>
  [...loans].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

const findUniqueSlug = async (existingLoans: Loan[]) => {
  let slug = makeSlug()
  const hasSlugLocally = () => existingLoans.some((loan) => loan.slug === slug)

  if (!supabase) {
    while (hasSlugLocally()) {
      slug = makeSlug()
    }
    return slug
  }

  while (true) {
    const { data, error } = await supabase.from('loans').select('id').eq('slug', slug).maybeSingle()
    if (error) throw new Error(error.message)
    if (!data && !hasSlugLocally()) return slug
    slug = makeSlug()
  }
}

export const isCloudPersistenceEnabled = () => CLOUD_PERSISTENCE_ENABLED

export const getLoans = async (): Promise<Loan[]> => {
  if (!supabase) return sortLoans(getStoredLoans())

  const { data, error } = await supabase.from('loans').select('*').order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return (data ?? []) as Loan[]
}

export const getLoanBySlug = async (slug: string): Promise<Loan | null> => {
  if (!supabase) return getStoredLoans().find((loan) => loan.slug === slug) ?? null

  const { data, error } = await supabase.from('loans').select('*').eq('slug', slug).maybeSingle()
  if (error) throw new Error(error.message)
  return (data as Loan | null) ?? null
}

export const createLoan = async (payload: CreateLoanPayload): Promise<Loan> => {
  const loans = getStoredLoans()
  const createdAt = nowIso()
  const slug = await findUniqueSlug(loans)

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

  if (supabase) {
    const { error } = await supabase.from('loans').insert(loan)
    if (error) throw new Error(error.message)
    return loan
  }

  setStoredLoans(sortLoans([loan, ...loans]))
  return loan
}

export const markLoanAsReturned = async (id: string) => {
  if (supabase) {
    const { error } = await supabase.from('loans').update({ status: 'returned' }).eq('id', id)
    if (error) throw new Error(error.message)
    return
  }

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
