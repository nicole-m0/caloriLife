import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export type FoodItem = {
  name: string
  emoji: string
  portion: string
  calories: number
  protein: number // gramas
  carbs: number // gramas
  fat: number // gramas
  confidence: number // 0 a 1
}

export type AnalysisResult = {
  items: FoodItem[]
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
}

/**
 * Converte um arquivo para base64
 */
async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  return Buffer.from(buffer).toString('base64')
}

/**
 * Analisa uma imagem de comida usando OpenAI Vision API
 * Retorna informações nutricionais dos alimentos detectados
 */
export async function analyzeFoodWithOpenAI(file: File): Promise<AnalysisResult> {
  try {
    const base64Image = await fileToBase64(file)

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
            {
              type: 'text',
              text: `Analise esta imagem de comida e retorne um JSON com as informações nutricionais de cada alimento identificado.

Retorne APENAS um JSON válido (sem código, sem explicações) com esta estrutura:
{
  "items": [
    {
      "name": "Nome do alimento em português",
      "emoji": "Emoji apropriado",
      "portion": "Descrição da porção (ex: 1 prato de 450g)",
      "calories": número inteiro de calorias,
      "protein": número em gramas,
      "carbs": número em gramas,
      "fat": número em gramas,
      "confidence": número entre 0 e 1 representando certeza da identificação
    }
  ]
}

Regras:
1. Seja preciso nas estimativas de calorias e macronutrientes
2. Use emojis relevantes para cada alimento
3. A confiança deve ser alta (0.85+) para alimentos claramente identificáveis
4. Inclua todos os alimentos visíveis na imagem
5. Retorne APENAS JSON, sem texto adicional`,
            },
          ],
        },
      ],
    })

    const content = response.choices[0].message.content
    if (!content) {
      throw new Error('Nenhuma resposta recebida da OpenAI')
    }

    // Limpa a resposta em caso de código markdown
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Resposta da OpenAI não contém JSON válido')
    }

    const parsedResponse = JSON.parse(jsonMatch[0])

    // Valida e transforma os dados
    if (!Array.isArray(parsedResponse.items)) {
      throw new Error('Formato de resposta inválido: items não é um array')
    }

    const items: FoodItem[] = parsedResponse.items.map((item: any) => ({
      name: String(item.name || 'Alimento desconhecido'),
      emoji: String(item.emoji || '🍽️'),
      portion: String(item.portion || '1 porção'),
      calories: Math.round(Number(item.calories) || 0),
      protein: Math.round(Number(item.protein) || 0),
      carbs: Math.round(Number(item.carbs) || 0),
      fat: Math.round(Number(item.fat) || 0),
      confidence: Math.min(1, Math.max(0, Number(item.confidence) || 0.8)),
    }))

    // Calcula totais
    const totals = items.reduce(
      (acc, item) => ({
        totalCalories: acc.totalCalories + item.calories,
        totalProtein: acc.totalProtein + item.protein,
        totalCarbs: acc.totalCarbs + item.carbs,
        totalFat: acc.totalFat + item.fat,
      }),
      { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 },
    )

    return { items, ...totals }
  } catch (error) {
    console.error('Erro ao analisar imagem com OpenAI:', error)
    throw error
  }
}
