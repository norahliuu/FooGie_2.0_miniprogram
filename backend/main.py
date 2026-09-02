from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from services.link_parser import identify_platform, fetch_video_data, clean_share_url
from services.recipe_extractor import extract_recipe

app = FastAPI()

class ParseRequest(BaseModel):
    url: str

@app.get("/")
def hello():
    return {"message": "食谱提取后端已启动"}

@app.post("/api/parse-recipe")


def parse_recipe(request: ParseRequest):
    try:
        #step0: 清理输入的url
        clean_url = clean_share_url(request.url) 

        #step 1: 识别来源平台
        platform = identify_platform(clean_url)
        platform_display = platform 
        if video_data.get("author"):
            platform_display = f"{platform}@{video_data['author']}"
        #step 2: 调用TikHUb获取音频url和文案
        video_data = fetch_video_data(clean_url, platform)

        # 第三步：调Qwen-Omni提取食谱
        recipe = extract_recipe(video_data["audio_url"], video_data["caption"])

        return {
            "success": True,
            "data": {
                "source_url": request.url,
                "source_platform": platform_display,
                **recipe
            }
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"服务器内部错误: {str(e)}")