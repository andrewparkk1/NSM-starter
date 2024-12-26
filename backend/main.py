import modal
from fastapi import FastAPI, WebSocket
from pydantic import BaseModel
from supabase import create_client, Client as SupabaseClient

# Model path configuration
FOLDER_MOUNT = ""

# Create Modal image
image = (modal.Image.debian_slim()
    .pip_install(
        "fastapi[standard]",
        "supabase==2.0.3"
    )
)

# Create mount
model_mount = modal.Mount.from_local_dir(FOLDER_MOUNT, remote_path="/root/folder")

# Initialize apps
app = modal.App(name="nsm-starter", image=image)
web_app = FastAPI()

# Initialize Supabase client
supabase: SupabaseClient = create_client(
    'your-supabase-url',
    'your-supabase-key'
)

class StringRequest(BaseModel):
    text: str

@web_app.post("/process_string")
async def process_string(request: StringRequest):
    try:
        print(f"Received string: {request.text}")
        return {"status": "success", "message": request.text}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.function(secrets=[modal.Secret.from_name("your-secret-name")], mounts=[model_mount])
@modal.asgi_app()
def run_app():
    return web_app