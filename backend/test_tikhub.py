import requests 
from config import TIKHUB_API_KEY

url = "https://api.tikhub.io/api/v1/douyin/app/v3/fetch_one_video_by_share_url"

params = {
    "share_url": "https://v.douyin.com/lSv-W1Zglsk/"
}

headers = {
    "Authorization": f"Bearer {TIKHUB_API_KEY}"
}

response = requests.get(url, params=params, headers=headers)
print(response.json())