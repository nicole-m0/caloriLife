'use client'

import type { AnalysisResult } from '@/lib/mock-analysis'
import { Flame, Sparkles } from 'lucide-react'

type NutritionResultProps = {
  result: AnalysisResult
}

const MACROS = [
  { key: 'protein', label: 'Proteínas', color: 'var(--chart-1)' },
  { key: 'carbs', label: 'Carboidratos', color: 'var(--chart-2)' },
  { key: 'fat', label: 'Gorduras', color: 'var(--chart-3)' },
] as const

export function NutritionResult({ result }: NutritionResultProps) {
  const { totalProtein, totalCarbs, totalFat } = result
  const totalGrams = totalProtein + totalCarbs + totalFat || 1

  const macroValues = {
    protein: totalProtein,
    carbs: totalCarbs,
    fat: totalFat,
  }

  return (
    <div className="space-y-5">
      {/* Total de calorias em destaque */}
      <div className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground">
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium opacity-80">
              <Flame className="size-4" />
              Total estimado
            </div>
            <p className="mt-1 font-display text-5xl font-bold tracking-tight">
              {result.totalCalories.toLocaleString('pt-BR')}
              <span className="ml-1.5 text-xl font-semibold opacity-80">kcal</span>
            </p>
          </div>
          <Flame
            className="size-20 shrink-0 opacity-15"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Distribuição de macros */}
      <div className="rounded-3xl border border-border bg-card p-5">
        <h3 className="font-display text-sm font-semibold text-foreground">
          Macronutrientes
        </h3>

        <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-muted">
          {MACROS.map((macro) => (
            <div
              key={macro.key}
              style={{
                width: `${(macroValues[macro.key] / totalGrams) * 100}%`,
                backgroundColor: macro.color,
              }}
            />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {MACROS.map((macro) => (
            <div key={macro.key} className="rounded-2xl bg-secondary/60 p-3">
              <div className="flex items-center gap-1.5">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: macro.color }}
                  aria-hidden="true"
                />
                <span className="text-xs font-medium text-muted-foreground">
                  {macro.label}
                </span>
              </div>
              <p className="mt-1.5 font-display text-xl font-bold text-foreground">
                {Math.round(macroValues[macro.key])}
                <span className="ml-0.5 text-sm font-medium text-muted-foreground">
                  g
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Itens detectados */}
      <div className="rounded-3xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <h3 className="font-display text-sm font-semibold text-foreground">
            {result.items.length > 1
              ? `${result.items.length} itens detectados`
              : 'Item detectado'}
          </h3>
        </div>

        <ul className="mt-4 space-y-3">
          {result.items.map((item, i) => (
            <li
              key={`${item.name}-${i}`}
              className="flex items-center gap-4 rounded-2xl bg-secondary/50 p-3"
            >
              <span
                className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-background text-2xl"
                aria-hidden="true"
              >
                {item.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">
                  {item.name}
                </p>
                <p className="text-sm text-muted-foreground">{item.portion}</p>
              </div>
              <div className="text-right">
                <p className="font-display font-semibold text-foreground">
                  {item.calories}
                  <span className="ml-0.5 text-xs font-normal text-muted-foreground">
                    kcal
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {Math.round(item.confidence * 100)}% de confiança
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="px-2 text-center text-xs leading-relaxed text-muted-foreground text-pretty">
        Valores são estimativas geradas por análise automática e podem variar
        conforme o preparo e a porção real.
      </p>
    </div>
  )
}
