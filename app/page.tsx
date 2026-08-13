import { Leaf, Zap, ScanLine } from 'lucide-react'
import { CalorieAnalyzer } from '@/components/calorie-analyzer'

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Fundo suave */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-accent/50 to-transparent"
      />

      <div className="relative mx-auto flex max-w-lg flex-col px-5 py-10 sm:py-14">
        {/* Cabeçalho */}
        <header className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-muted-foreground">
            <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Leaf className="size-3.5" />
            </span>
            NutriSnap
          </div>

          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl">
            Calorias na palma da mão
          </h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
            Tire ou envie uma foto da sua refeição e receba na hora uma
            estimativa de calorias e macronutrientes.
          </p>
        </header>

        {/* Analisador */}
        <section className="mt-10">
          <CalorieAnalyzer />
        </section>

        {/* Como funciona */}
        <section className="mt-12">
          <h2 className="sr-only">Como funciona</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                icon: ScanLine,
                title: 'Envie',
                desc: 'Foto do prato',
              },
              {
                icon: Zap,
                title: 'Analise',
                desc: 'Em segundos',
              },
              {
                icon: Leaf,
                title: 'Descubra',
                desc: 'Calorias e macros',
              },
            ].map((step) => (
              <div
                key={step.title}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/60 p-4 text-center"
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <step.icon className="size-5" />
                </span>
                <p className="font-display text-sm font-semibold text-foreground">
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-12 text-center text-xs text-muted-foreground">
          Estimativas geradas automaticamente • Apenas para referência
        </footer>
      </div>
    </main>
  )
}
