'use client'

import { useState } from 'react'
import { ArrowRight, Search, X } from 'lucide-react'
import { faqGroups, faqs } from '@/lib/faq'
import { FAQAccordion } from './editorial'

export function FAQBrowser() {
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState('All questions')
  const clean = query.trim().toLowerCase()
  const matches = faqs.filter(
    (item) =>
      (group === 'All questions' || item.group === group) &&
      `${item.q} ${item.a}`.toLowerCase().includes(clean),
  )
  return (
    <div className="faq-browser">
      <aside className="faq-topics">
        <div className="faq-search">
          <Search size={17} />
          <input
            type="search"
            aria-label="Search rental questions"
            placeholder="Search questions…"
            maxLength={150}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button type="button" aria-label="Clear search" onClick={() => setQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>
        <p className="overline">BROWSE BY TOPIC</p>
        <div className="topic-list">
          {['All questions', ...faqGroups].map((g) => (
            <button type="button" key={g} aria-pressed={group === g} onClick={() => setGroup(g)}>
              {g}
              <ArrowRight size={15} />
            </button>
          ))}
        </div>
      </aside>
      <section aria-label="Rental answers">
        <p role="status" className="faq-count">
          {matches.length} {matches.length === 1 ? 'answer' : 'answers'}
          {clean ? ` matching “${query.trim()}”` : ''}
        </p>
        {matches.length ? (
          <FAQAccordion questions={matches} />
        ) : (
          <div className="faq-empty">
            <h2>No matching questions.</h2>
            <p>Try another word or view the whole rental guide.</p>
            <button
              type="button"
              className="action action-outline"
              onClick={() => {
                setQuery('')
                setGroup('All questions')
              }}
            >
              Show all questions
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
