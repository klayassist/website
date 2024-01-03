from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from gradio_client import Client
from pydantic import BaseModel
import uvicorn
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
)
gradio_client = Client("https://77a51e2d371e96dc40.gradio.live")
gradio_client.view_api(True, True)
class ChatBody(BaseModel):
    message: str
@app.post('/chat')
def chat(body: ChatBody):
    try:
        job = gradio_client.submit(body.message, api_name="/chat")
        return StreamingResponse(job)
    except Exception as e:
        # Return an error if something goes wrong
        raise HTTPException(status_code=500, detail=str(e))
if __name__ == '__main__':
    uvicorn.run("gradio:app", port=5123, reload=True)