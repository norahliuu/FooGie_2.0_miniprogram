# 识别用户输入链接是否来自于程序支持的社交媒体平台
# 输入url后续会通过FastAPI发送指令到main
import requests
from config import TIKHUB_API_KEY

def identify_platform(url: str) -> str:
    """
    Return the name of the social media plantform of the entered URL 
    If the URL comes from a plantform that is not supported, then return ValueError
    
    返回用户输入url的来源平台名称
    如果url来源不在支持范围,将报错ValueError
    """
    url = url.strip()

    if "xiaohongshu.com" in url or "xhslink.com" in url:
        return "小红书"
    elif "douyin.com" in url:
        return "抖音"
    elif "bilibili.com" in url or "b23.tv" in url:
        return "B站"
    else:
        raise ValueError("不支持的链接，请粘贴小红书/抖音/B站的视频链接")


def fetch_video_data(url: str, platform: str) -> dict:
    """
    Return audio file to the video from the url and the video's caption by calling Tikhub API
    用TikHub解析url视频来源,返回视频内的音频内容和视频标题
    """

    if platform == "抖音":
        api_url = "https://api.tikhub.io/api/v1/douyin/app/v3/fetch_one_video_by_share_url" # url to TikHub to call API service
        params = {"share_url": url} # 附加到api url之后s
    else:
        raise ValueError(f"{platform}平台视频暂未支持，敬请期待")

    headers = {"Authorization": f"Bearer {TIKHUB_API_KEY}"}
    response = requests.get(api_url, params=params, headers=headers)
    data = response.json()

    if data.get("code") != 200:
        raise ValueError(f"视频解析失败: {data.get('message', '未知错误')}")

    aweme = data["data"]["aweme_detail"]

    # 提取音频URL
    audio_url = aweme["music"]["play_url"]["url_list"][0]

    # 提取视频文案
    caption = aweme.get("desc", "")

    return {
        "audio_url": audio_url,
        "caption": caption
    }

