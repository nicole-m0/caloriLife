// Análise mock de imagens de comida.
// Substitua `analyzeFood` por uma chamada real (ex: OpenAI Vision) depois.

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

const MOCK_FOODS: Omit<FoodItem, 'confidence'>[] = [
  { name: 'Prato feito', emoji: '🍛', portion: '1 prato (450g)', calories: 720, protein: 38, carbs: 82, fat: 24 },
  { name: 'Hambúrguer artesanal', emoji: '🍔', portion: '1 unidade (250g)', calories: 640, protein: 34, carbs: 45, fat: 35 },
  { name: 'Salada Caesar', emoji: '🥗', portion: '1 tigela (300g)', calories: 320, protein: 18, carbs: 16, fat: 22 },
  { name: 'Pizza margherita', emoji: '🍕', portion: '2 fatias (220g)', calories: 560, protein: 24, carbs: 66, fat: 22 },
  { name: 'Sushi variado', emoji: '🍣', portion: '8 peças (200g)', calories: 380, protein: 20, carbs: 58, fat: 8 },
  { name: 'Açaí na tigela', emoji: '🍨', portion: '1 tigela (350g)', calories: 480, protein: 6, carbs: 78, fat: 16 },
  { name: 'Frango grelhado com legumes', emoji: '🍗', portion: '1 porção (400g)', calories: 410, protein: 46, carbs: 22, fat: 14 },
  { name: 'Macarrão à bolonhesa', emoji: '🍝', portion: '1 prato (380g)', calories: 590, protein: 26, carbs: 74, fat: 20 },
  { name: 'Panqueca com frutas', emoji: '🥞', portion: '3 unidades (300g)', calories: 520, protein: 12, carbs: 82, fat: 16 },
  { name: 'Tigela de frutas', emoji: '🍓', portion: '1 tigela (300g)', calories: 180, protein: 3, carbs: 44, fat: 1 },
]

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

/**
 * Simula uma análise de IA da imagem.
 * Retorna uma promessa que resolve após um pequeno atraso, como uma API real.
 */
export async function analyzeFood(_file: File): Promise<AnalysisResult> {
  // Simula latência de rede / processamento
  await new Promise((resolve) => setTimeout(resolve, 2200))

  const count = Math.random() > 0.6 ? 2 : 1
  const pool = [...MOCK_FOODS].sort(() => Math.random() - 0.5).slice(0, count)

  const items: FoodItem[] = pool.map((food) => ({
    ...food,
    confidence: randomBetween(0.78, 0.97),
  }))

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
}
