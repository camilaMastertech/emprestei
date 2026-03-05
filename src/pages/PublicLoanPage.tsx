import { Link, useParams } from 'react-router-dom'
import { buildWhatsappUrl, formatDate, getComputedStatus, getLoanBySlug } from '../lib/loans'

export function PublicLoanPage() {
  const { slug = '' } = useParams()
  const loan = getLoanBySlug(slug)

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
