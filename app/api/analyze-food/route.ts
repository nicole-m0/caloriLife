import { analyzeFoodWithOpenAI } from '@/lib/openai-analysis'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return Response.json(
        { error: 'Nenhum arquivo fornecido' },
        { status: 400 },
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY não configurada')
      return Response.json(
        { error: 'Servidor não configurado corretamente. Chave OpenAI faltando.' },
        { status: 500 },
      )
    }

    const result = await analyzeFoodWithOpenAI(file)

    return Response.json(result, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Erro na análise de comida:', error)

    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'

    return Response.json(
      { error: `Erro ao analisar imagem: ${errorMessage}` },
      { status: 500 },
    )
  }
}
