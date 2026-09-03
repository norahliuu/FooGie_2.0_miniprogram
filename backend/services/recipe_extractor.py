# 使用千问ohmi模型提取出视频音频中关于食谱和制作步骤的关键内容

from openai import OpenAI
from config import DASHSCOPE_API_KEY
import json 

client = OpenAI(
    api_key=DASHSCOPE_API_KEY,
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

def extract_recipe(audio_url: str, caption: str) -> dict:
    """把音频和文案丢给Qwen-Omni，提取结构化食谱"""

    stream = client.chat.completions.create(
        model="qwen3.5-omni-flash",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "input_audio", "input_audio": {"data": audio_url, "format": "mp3"}},
                    {"type": "text", "text": f"""你是一个专业的食谱整理助手。请听这段菜谱视频的音频，结合以下视频文案，提取食谱信息，以JSON格式输出。

视频文案：{caption}

如果这不是一个菜谱/食谱/烹饪教程视频，请只输出以下JSON：
{{"error": "这个视频不是菜谱内容，请粘贴一个做菜/烹饪教程的视频链接"}}

要求：
1. title: 菜名
2. ingredients: 食材清单，每个包含name和quantity。用量保留原话如"适量""少许"，没提到的填"未提及"
3. steps: 分步骤教程，每步包含step序号和content描述

只输出JSON，不要其他文字，不要markdown代码块。"""}
                ]
            }
        ],
        modalities=["text"],
        stream=True,
        max_tokens=4096
    )

    # 流式读取，拼接所有文本片段
    result_text = ""
    for chunk in stream:
        for choice in chunk.choices:
            if hasattr(choice, "delta") and choice.delta.content:
                result_text += choice.delta.content

    # 清理markdown标记
    result_text = result_text.replace("```json", "").replace("```", "").strip()
    return json.loads(result_text)