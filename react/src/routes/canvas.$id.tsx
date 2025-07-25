import { getCanvas, renameCanvas } from '@/api/canvas'
import CanvasExcali from '@/components/canvas/CanvasExcali'
import CanvasHeader from '@/components/canvas/CanvasHeader'
import ChatInterface from '@/components/chat/Chat'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { CanvasProvider } from '@/contexts/canvas'
import { Session } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/canvas/$id')({
  component: Canvas,
})

function Canvas() {
  const [canvasName, setCanvasName] = useState('')
  const [sessionList, setSessionList] = useState<Session[]>([])

  const { id } = useParams({ from: '/canvas/$id' })

  const { data: canvas, isLoading } = useQuery({
    queryKey: ['canvas', id],
    queryFn: () => getCanvas(id),
  })

  useEffect(() => {
    console.log('👇canvas', canvas)
    if (canvas && !canvasName) {
      setCanvasName(canvas.name)
      setSessionList(canvas.sessions)
    }
  }, [canvas, canvasName])

  const handleNameSave = async () => {
    await renameCanvas(id, canvasName)
  }

  return (
    <CanvasProvider>
      <div className="flex flex-col w-screen h-screen">
        <CanvasHeader
          canvasName={canvasName}
          canvasId={id}
          onNameChange={setCanvasName}
          onNameSave={handleNameSave}
        />
        <ResizablePanelGroup
          direction="horizontal"
          className="w-screen h-screen"
          autoSaveId="jaaz-chat-panel"
        >
          <ResizablePanel className="relative" defaultSize={80}>
            <div className="w-full h-full">
              {isLoading ? (
                <div className="flex-1 flex-grow px-4 bg-accent w-[24%] absolute right-0">
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              ) : (
                <CanvasExcali canvasId={id} initialData={canvas?.data} />
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={25} maxSize={35} minSize={25}>
            <div className="flex-1 flex-grow bg-accent/50 w-full">
              <ChatInterface
                canvasId={id}
                sessionList={sessionList}
                setSessionList={setSessionList}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </CanvasProvider>
  )
}
