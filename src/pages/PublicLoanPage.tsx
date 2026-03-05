import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { buildWhatsappUrl, formatDate, getComputedStatus, getLoanBySlug } from '../lib/loans'
import type { Loan } from '../types'

export function PublicLoanPage() {
  const { slug = '' } = useParams()
  const [loan, setLoan] = useState<Loan | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let cancelled = false

    void getLoanBySlug(slug)
      .then((data) => {
        if (!cancelled) {
          setLoan(data)
          setHasError(false)
        }
      })
      .catch(() => {
        if (!cancelled) setHasError(true)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  if (isLoading) {
    return (
      <main className="page">
        <header className="topbar">
          <p className="brand">EMPRESTEI</p>
        </header>
        <section className="panel">
          <h1>Emprestei</h1>
          <p>Carregando registro...</p>
        </section>
      </main>
    )
  }

  if (hasError) {
    return (
      <main className="page">
        <header className="topbar">
          <p className="brand">EMPRESTEI</p>
        </header>
        <section className="panel">
          <h1>Emprestei</h1>
          <p>Erro ao carregar registro.</p>
          <Link className="button button-outline" to="/">
            Voltar
          </Link>
        </section>
      </main>
    )
  }

  if (!loan) {
    return (
      <main className="page">
        <header className="topbar">
          <p className="brand">EMPRESTEI</p>
        </header>
        <section className="panel">
          <h1>Emprestei</h1>
          <p>Registro não encontrado.</p>
          <Link className="button button-outline" to="/">
            Voltar
          </Link>
        </section>
      </main>
    )
  }

  const status = getComputedStatus(loan)
  const extensionUrl = buildWhatsappUrl(
    loan.owner_phone,
    `Olá! Posso pedir prorrogação do empréstimo de ${loan.object_name}?`,
  )
  const returnUrl = buildWhatsappUrl(
    loan.owner_phone,
    `Olá! Quero confirmar a devolução de ${loan.object_name}.`,
  )

  return (
    <main className="page">
      <header className="topbar">
        <p className="brand">EMPRESTEI</p>
      </header>

      <section className="panel">
        <h1>{loan.object_name}</h1>
        <p className="section-copy">Registro público do empréstimo.</p>
        <img className="public-image" src={loan.photo} alt={loan.object_name} />
        <p>Categoria: {loan.category}</p>
        <p>Empréstimo: {formatDate(loan.created_at)}</p>
        <p>Prazo: {formatDate(loan.due_at)}</p>
        <p className={`status status-${status}`}>Status: {status}</p>

        <a className="button" href={extensionUrl} target="_blank" rel="noreferrer">
          Pedir prorrogação
        </a>
        <a className="button button-outline" href={returnUrl} target="_blank" rel="noreferrer">
          Confirmar devolução
        </a>
      </section>
    </main>
  )
}
