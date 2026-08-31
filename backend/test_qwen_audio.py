from openai import OpenAI
from config import DASHSCOPE_API_KEY

client = OpenAI(
    api_key = DASHSCOPE_API_KEY,
    base_url = "https://dashscope.aliyuncs.com/compatible-mode/v1"
)

# audio url returned by TinHuk analysis 
audio_url = "https://lf9-music-east.douyinstatic.com/obj/ies-music-hj/7672567045107698481.mp3"

# video caption returned by TikHub
caption = "不吐骨头的薯骨鸡翅，全家都吃嗨了‼️ #美食教程 #薯骨鸡翅 #红烧鸡翅 #鸡翅"

response = client.chat.completions.create(
    model="qwen-omni-turbo",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "input_audio", "input_audio": {"data": audio_url, "format": "mp3"}},
                {"type": "text", "text": f"""你是一个专业的食谱整理助手。请听这段菜谱视频的音频，结合以下视频文案，提取食谱信息，以JSON格式输出。

视频文案：{caption}

要求：
1. title: 菜名
2. ingredients: 食材清单，每个包含name和quantity。用量保留原话如"适量""少许"，没提到的填"未提及。若提及“一斤”，“一两”这样的口头用语，在保留原有quantity的基础上，在括号里备注将其转换成“千克“，”克"这样的标准单位。
3. steps: 分步骤教程，每步包含step序号和content描述

只输出JSON，不要其他文字。"""}
            ]
        }
    ],
    modalities=["text"],
    stream=False
)

print(response.choices[0].message.content)