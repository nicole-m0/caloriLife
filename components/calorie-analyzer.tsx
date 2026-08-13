'use client'

import { useCallback, useEffect, useState } from 'react'
import { Loader2, RotateCcw, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UploadZone } from '@/components/upload-zone'
import { NutritionResult } from '@/components/nutrition-result'
import { analyzeFood, type AnalysisResult } from '@/lib/mock-analysis'

type Status = 'idle' | 'analyzing' | 'done'

export function CalorieAnalyzer() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [result, setResult] = useState<AnalysisResult | null>(null)

  // Libera a URL do objeto quando não for mais necessária
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleSelect = useCallback(async (file: File) => {
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setResult(null)
    setStatus('analyzing')

    try {
      const analysis = await analyzeFood(file)
      setResult(analysis)
      setStatus('done')
    } catch (error) {
      console.log('[v0] Erro ao analisar a imagem:', error)
      setStatus('idle')
    }
  }, [])

  const reset = useCallback(() => {
    setPreviewUrl(null)
    setResult(null)
    setStatus('idle')
  }, [])

  if (status === 'idle') {
    return <UploadZone onSelect={handleSelect} />
  }

  return (
    <div className="space-y-5">
      {/* Pré-visualização da imagem */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
        {previewUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl || '/placeholder.svg'}
            alt="Prévia da comida enviada"
            className="h-60 w-full object-cover"
          />
        )}

        <button
          type="button"
          onClick={reset}
          aria-label="Remover imagem"
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
        >
          <X className="size-4" />
        </button>

        {status === 'analyzing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-sm">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="font-display text-sm font-medium text-foreground">
              Analisando sua refeição...
            </p>
          </div>
        )}
      </div>

      {status === 'done' && result && (
        <>
          <NutritionResult result={result} />
          <Button
            variant="secondary"
            className="w-full rounded-2xl"
            size="lg"
            onClick={reset}
          >
            <RotateCcw className="size-4" />
            Analisar outra foto
          </Button>
        </>
      )}
    </div>
  )
}
