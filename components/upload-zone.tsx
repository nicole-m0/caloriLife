'use client'

import { useCallback, useRef, useState } from 'react'
import { ImagePlus, Camera } from 'lucide-react'
import { cn } from '@/lib/utils'

type UploadZoneProps = {
  onSelect: (file: File) => void
}

export function UploadZone({ onSelect }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0]
      if (file && file.type.startsWith('image/')) {
        onSelect(file)
      }
    },
    [onSelect],
  )

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Enviar foto da comida"
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          inputRef.current?.click()
        }
      }}
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        handleFiles(e.dataTransfer.files)
      }}
      className={cn(
        'group relative flex cursor-pointer flex-col items-center justify-center gap-5 rounded-3xl border-2 border-dashed border-border bg-card px-6 py-16 text-center transition-all',
        'hover:border-primary/60 hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        dragging && 'border-primary bg-accent/60 scale-[1.01]',
      )}
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
        <ImagePlus className="size-8" strokeWidth={1.75} />
      </div>

      <div className="space-y-1.5">
        <p className="font-display text-lg font-semibold text-foreground text-balance">
          Arraste uma foto ou clique para enviar
        </p>
        <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
          Envie uma imagem nítida do seu prato. Aceitamos JPG, PNG ou HEIC.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
        <Camera className="size-4" />
        Selecionar imagem
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}
