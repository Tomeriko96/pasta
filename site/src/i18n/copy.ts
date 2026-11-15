// Copy registry: one file per language in this folder (en.ts is the source).
import { type Lang } from '../lib/site';
import { facts } from './facts';
import en, { type Copy } from './en';
import nl from './nl';
import it from './it';
import de from './de';
import fr from './fr';
import es from './es';

export type { Copy };
export type { Faq } from './facts';

const BY_LANG: Record<Lang, (f: ReturnType<typeof facts>) => Copy> = { en, nl, it, de, fr, es };

const cache = new Map<Lang, Copy>();
export function copy(lang: Lang): Copy {
  if (!cache.has(lang)) cache.set(lang, BY_LANG[lang](facts(lang)));
  return cache.get(lang)!;
}
