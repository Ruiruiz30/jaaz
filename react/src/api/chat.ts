import { Message, Model } from '@/types/types'
import { buildApiUrl } from '@/utils/api'

export const getChatSession = async (sessionId: string) => {
  const response = await fetch(buildApiUrl(`/api/chat_session/${sessionId}`))
  const data = await response.json()
  return data as Message[]
}

export const sendMessages = async (payload: {
  sessionId: string
  canvasId: string
  newMessages: Message[]
  textModel: Model
  imageModel: Model
}) => {
  const response = await fetch(buildApiUrl(`/api/chat`), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: payload.newMessages,
      canvas_id: payload.canvasId,
      session_id: payload.sessionId,
      text_model: payload.textModel,
      image_model: payload.imageModel,
    }),
  })
  const data = await response.json()
  return data as Message[]
}

export const cancelChat = async (sessionId: string) => {
  const response = await fetch(buildApiUrl(`/api/cancel/${sessionId}`), {
    method: 'POST',
  })
  return await response.json()
}
