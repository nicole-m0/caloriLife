# Integração OpenAI - CaloriLife

## ✅ O que foi implementado

A integração com OpenAI foi completada! O aplicativo agora usa a **OpenAI Vision API** para analisar imagens de comida e calcular as calorias e macronutrientes **de forma real e precisa**.

### Arquivos criados/modificados:

1. **`lib/openai-analysis.ts`** - Serviço que integra com OpenAI Vision API
   - Função `analyzeFoodWithOpenAI()` que faz requisições à API
   - Tipos TypeScript para os dados nutricionais
   - Parsing e validação da resposta JSON

2. **`app/api/analyze-food/route.ts`** - API endpoint Next.js
   - Recebe a imagem via FormData
   - Chama o serviço OpenAI
   - Retorna os dados nutricionais em JSON

3. **`components/calorie-analyzer.tsx`** - Componente atualizado
   - Agora chama a API ao invés de usar dados fictícios
   - Melhor tratamento de erros
   - Mostra mensagens claras ao usuário

4. **`.env.local`** - Arquivo de configuração
   - Armazena a chave da API OpenAI

## 🔧 Como configurar

### Passo 1: Obter sua chave OpenAI

1. Acesse [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Faça login com sua conta OpenAI
3. Clique em "Create new secret key"
4. Copie a chave

### Passo 2: Configurar a chave no projeto

Abra o arquivo `.env.local` e substitua:

```
OPENAI_API_KEY=sua_chave_api_aqui
```

Por:

```
OPENAI_API_KEY=sk-proj-sua_chave_real_aqui
```

### Passo 3: Reiniciar o servidor

Se o servidor já estiver rodando, reinicie-o:

```bash
pnpm dev
```

## 🚀 Como funciona

1. Usuário faz upload de uma imagem de comida
2. A imagem é enviada para `/api/analyze-food`
3. A API OpenAI Vision analisa a imagem e identifica os alimentos
4. OpenAI retorna as informações nutricionais (calorias, proteína, carboidrato, gordura)
5. Os dados são exibidos no frontend de forma visual

## 📊 Exemplo de análise

Quando você faz upload de uma foto de um prato, o sistema retorna:

```json
{
  "items": [
    {
      "name": "Frango grelhado",
      "emoji": "🍗",
      "portion": "1 filé (150g)",
      "calories": 200,
      "protein": 42,
      "carbs": 0,
      "fat": 4,
      "confidence": 0.92
    },
    {
      "name": "Arroz",
      "emoji": "🍚",
      "portion": "1 xícara (150g)",
      "calories": 200,
      "protein": 4,
      "carbs": 45,
      "fat": 1,
      "confidence": 0.88
    }
  ],
  "totalCalories": 400,
  "totalProtein": 46,
  "totalCarbs": 45,
  "totalFat": 5
}
```

## ⚠️ Notas importantes

- **Modelo usado**: gpt-4-vision-preview (última versão com suporte a imagens)
- **Custos**: Cada análise de imagem consome créditos de API
  - Análise de imagem custa aproximadamente $0.01 USD por imagem
- **Taxa de sucesso**: Funciona melhor com fotos claras e bem iluminadas
- **Privacidade**: As imagens são enviadas para servidores OpenAI para análise

## 🐛 Troubleshooting

### Erro: "Chave OpenAI faltando"
- Verifique se `.env.local` existe
- Verifique se `OPENAI_API_KEY` foi configurada corretamente
- Reinicie o servidor com `pnpm dev`

### Erro: "Resposta da OpenAI não contém JSON válido"
- A imagem pode ser muito pequena ou não conter alimentos claros
- Tente com uma imagem de melhor qualidade

### Erro: "Rate limit exceeded"
- Você atingiu o limite de requisições
- Aguarde alguns minutos antes de fazer novas análises

## 📚 Referências

- [OpenAI Vision API Docs](https://platform.openai.com/docs/guides/vision)
- [OpenAI Models](https://platform.openai.com/docs/models)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
