// src/i18n/i18n.ts
// ─────────────────────────────────────────────────────────────
// Sistema de traducción client-side para portfolio single-page
//
// USO EN COMPONENTES ASTRO:
//   <span data-i18n="nav.inicio">Inicio</span>
//
// El texto dentro del tag es el fallback visible antes de que
// el script cargue (evita flash de contenido vacío).
// ─────────────────────────────────────────────────────────────

import es from './es.json';
import en from './en.json';

export type Lang = 'es' | 'en';

const translations: Record<Lang, Record<string, string>> = { es, en };

// ── Lee el idioma guardado (o detecta del navegador) ──
export function getLang(): Lang {
  const saved = localStorage.getItem('lang') as Lang | null;
  if (saved === 'es' || saved === 'en') return saved;
  return navigator.language.startsWith('es') ? 'es' : 'en';
}

// ── Aplica todas las traducciones al DOM ──
export function applyLang(lang: Lang): void {
  const dict = translations[lang];

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n!;
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  // Actualiza el atributo lang del html para accesibilidad
  document.documentElement.lang = lang;

  // Guarda preferencia
  localStorage.setItem('lang', lang);
}

// ── Toggle entre es/en ──
export function toggleLang(): Lang {
  const current = getLang();
  const next: Lang = current === 'es' ? 'en' : 'es';
  applyLang(next);
  return next;
}