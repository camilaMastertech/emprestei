import { useEffect, useMemo, useRef, useState } from 'react'
import { classifyObjectFromDataUrl } from '../lib/imageClassifier'
import {
  buildWhatsappUrl,
  createLoan,
  formatDate,
  getComputedStatus,
  getLoans,
  isCloudPersistenceEnabled,
  markLoanAsReturned,
} from '../lib/loans'
import type { ChangeEvent, FormEvent } from 'react'
import type { Loan, LoanCategory } from '../types'

const CATEGORY_OPTIONS: { value: LoanCategory; label: string }[] = [
  { value: 'livros', label: 'livros' },
  { value: 'eletronicos', label: 'eletrônicos' },
  { value: 'ferramentas', label: 'ferramentas' },
  { value: 'outros', label: 'outros' },
]

const emptyForm = {
  photo: '',
  object_name: '',
  category: 'livros' as LoanCategory,
  borrower_name: '',
  borrower_phone: '',
  due_in_days: 14,
}

export function HomePage() {
  const [form, setForm] = useState(emptyForm)
  const [loans, setLoans] = useState<Loan[]>([])
  const [lastCreated, setLastCreated] = useState<Loan | null>(null)
  const [isClassifying, setIsClassifying] = useState(false)
  const [classificationHint, setClassificationHint] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [loadError, setLoadError] = useState('')
  const latestUploadRef = useRef(0)

  useEffect(() => {
    let cancelled = false

    void getLoans()
      .then((items) => {
        if (!cancelled) {
          setLoans(items)
          setLoadError('')
        }
      })
      .catch(() => {
        if (!cancelled) setLoadError('Não foi possível carregar os empréstimos.')
      })

    return () => {
      cancelled = true
    }
  }, [])

  const shareUrl = useMemo(() => {
    if (!lastCreated) return '#'
    const publicLink = `${window.location.origin}/l/${lastCreated.slug}`
    const text = `Te emprestei ${lastCreated.object_name}. Prazo: ${formatDate(lastCreated.due_at)}. Registro: ${publicLink}`
    return buildWhatsappUrl(lastCreated.borrower_phone, text)
  }, [lastCreated])

  const onPhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setClassificationHint('')
    setIsClassifying(true)
    latestUploadRef.current += 1
    const uploadId = latestUploadRef.current

    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = String(reader.result)
      setForm((prev) => ({ ...prev, photo: dataUrl }))

      void classifyObjectFromDataUrl(dataUrl)
        .then((result) => {
          if (!result || uploadId !== latestUploadRef.current) return
          setClassificationHint(`Sugestão automática: ${result.label} (${Math.round(result.confidence * 100)}%)`)
          setForm((prev) => (prev.object_name.trim() ? prev : { ...prev, object_name: result.label }))
        })
        .catch(() => {
          if (uploadId !== latestUploadRef.current) return
          setClassificationHint('Não consegui identificar automaticamente. Você pode preencher manualmente.')
        })
        .finally(() => {
          if (uploadId === latestUploadRef.current) {
            setIsClassifying(false)
          }
        })
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!form.photo || isSaving) return

    try {
      setIsSaving(true)
      const created = await createLoan(form)
      setLastCreated(created)
      setLoans(await getLoans())
      setForm(emptyForm)
      setLoadError('')
    } catch {
      setLoadError('Não foi possível salvar o empréstimo.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleMarkReturned = async (id: string) => {
    try {
      await markLoanAsReturned(id)
      setLoans(await getLoans())
      setLoadError('')
    } catch {
      setLoadError('Não foi possível atualizar o status do empréstimo.')
    }
  }

  return (
    <main className="page">
      <header className="topbar">
        <p className="brand">EMPRESTEI</p>
        <button className="menu-icon" type="button" aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </header>

      <section className="hero">
        <h1>Eu empresto e não esqueço.</h1>
        <p className="hero-subtitle">Controle simples, direto e com WhatsApp.</p>
        <p className="hero-text">
          Cadastre em segundos o que saiu da sua mão, com foto, prazo e link público para facilitar o retorno.
        </p>
        <p className="section-copy">
          Persistência: {isCloudPersistenceEnabled() ? 'Supabase (produção)' : 'localStorage (local)'}
        </p>
        <a href="#registro" className="pill-link">
          registrar agora
        </a>
      </section>

      <section className="panel" id="registro">
        <h2>Registrar novo empréstimo</h2>
        <p className="section-copy">Preencha os dados essenciais para gerar o registro e compartilhar por WhatsApp.</p>
        <form className="form" onSubmit={onSubmit}>
          <label className="field">
            Foto do objeto
            <input required type="file" accept="image/*" onChange={onPhotoChange} />
          </label>

          {form.photo && <img className="preview-image" src={form.photo} alt="Pré-visualização do objeto" />}
          {(isClassifying || classificationHint) && (
            <p className="hint">{isClassifying ? 'Analisando foto para sugerir o objeto...' : classificationHint}</p>
          )}

          <label className="field">
            Nome do objeto
            <input
              required
              type="text"
              value={form.object_name}
              onChange={(event) => setForm((prev) => ({ ...prev, object_name: event.target.value }))}
            />
          </label>

          <label className="field">
            Categoria
            <select
              value={form.category}
              onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value as LoanCategory }))}
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            Nome da pessoa
            <input
              required
              type="text"
              value={form.borrower_name}
              onChange={(event) => setForm((prev) => ({ ...prev, borrower_name: event.target.value }))}
            />
          </label>

          <label className="field">
            Telefone (WhatsApp)
            <input
              required
              type="tel"
              placeholder="5511999999999"
              value={form.borrower_phone}
              onChange={(event) => setForm((prev) => ({ ...prev, borrower_phone: event.target.value }))}
            />
          </label>

          <label className="field">
            Prazo (em dias)
            <input
              min={1}
              required
              type="number"
              value={form.due_in_days}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, due_in_days: Number(event.target.value) || emptyForm.due_in_days }))
              }
            />
          </label>

          <button className="button" type="submit">
            {isSaving ? 'Salvando...' : 'Salvar empréstimo'}
          </button>
        </form>

        {lastCreated && (
          <a className="button button-outline" href={shareUrl} target="_blank" rel="noreferrer">
            Compartilhar no WhatsApp
          </a>
        )}
      </section>

      <section className="panel" id="lista">
        <h2>Meus empréstimos</h2>
        <p className="section-copy">Acompanhe prazos, status e lembretes sem fricção.</p>
        {loadError && <p className="hint">{loadError}</p>}
        <div className="cards">
          {loans.length === 0 && <p className="empty">Nenhum empréstimo ainda.</p>}

          {loans.map((loan) => {
            const computedStatus = getComputedStatus(loan)
            const remindText = `Oi, ${loan.borrower_name}. Lembrete do empréstimo: ${loan.object_name}. Prazo: ${formatDate(loan.due_at)}.`
            const remindUrl = buildWhatsappUrl(loan.borrower_phone, remindText)

            return (
              <article className="card" key={loan.id}>
                <img className="card-thumb" src={loan.photo} alt={loan.object_name} />
                <div className="card-content">
                  <h3>{loan.object_name}</h3>
                  <p>{loan.borrower_name}</p>
                  <p>Prazo: {formatDate(loan.due_at)}</p>
                  <p className={`status status-${computedStatus}`}>Status: {computedStatus}</p>

                  {loan.status !== 'returned' && (
                    <button className="button" type="button" onClick={() => handleMarkReturned(loan.id)}>
                      Marcar como devolvido
                    </button>
                  )}

                  <a className="button button-outline" href={remindUrl} target="_blank" rel="noreferrer">
                    WhatsApp lembrete
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <a
        className="whatsapp-fab"
        href="https://wa.me/5511999999999?text=Olá!%20Quero%20falar%20sobre%20um%20empr%C3%A9stimo%20no%20Emprestei."
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir WhatsApp"
      >
        WA
      </a>
    </main>
  )
}
