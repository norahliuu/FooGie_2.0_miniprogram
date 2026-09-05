
[中文](#中文) | [English](#english)

---

<a id="english"></a>

# FooGie 2.0 

**Paste a recipe video link from Douyin/Xiaohongshu/Bilibili, and automatically extract a structured recipe with ingredients and step-by-step instructions.**

Tired of scrubbing back and forth endlessly every time trying to copy the recipe from a video?
Foogie is right here for you. 

FooGie 2.0 helps you break down complicated recipe videos, turn into easy-to-follow instruction, and tells you exactly what ingredients and quantity you need to recreate the delicious you have found and been sitting in your Save forever on Douyin/Tiktok/Xiaohongshu/Bilibili/Youtube. 

## Tech Stack

**Backend:**
- Python + FastAPI
- TikHub API (video parsing — extracts audio URL and caption)
- Alibaba Cloud Bailian Qwen3.5-Omni (audio-to-structured-recipe in one step, no separate ASR needed)

**Frontend:**
- WeChat Mini Program (native WXML + WXSS + JS)
- Local storage (wx.setStorageSync)

## Project Structure

```
Foo记/
├── backend/
│   ├── main.py
│   ├── config.py
│   ├── config.example.py
│   ├── requirements.txt
│   └── services/
│       ├── link_parser.py
│       └── recipe_extractor.py
├── miniprogram/
│   ├── app.js
│   ├── app.json
│   ├── app.wxss
│   ├── images/
│   └── pages/
│       ├── index/
│       ├── result/
│       ├── history/
│       ├── edit/
│       └── cooking/
├── .gitignore
└── README.md
```


<a id="中文"></a>

# Foo记 🍲

**不想再每次跟着视频学做菜都要来回拨动进度条、截屏保存调料？Foo记来帮忙！**

**粘贴抖音/小红书/B站的菜谱视频链接，自动提取食材清单和分步骤教程。把收藏夹里的美食端上桌。**

## 功能

- 粘贴视频链接，AI 自动提取结构化食谱（食材 + 步骤）
- 自动清理分享链接中的多余文案
- 非食谱视频内容检测
- 我的菜谱本：保存、查看、编辑、删除历史记录
  - 编辑功能：修改食材/步骤、增删、调整顺序
- 手动创建菜谱
- 做饭模式：大字单步卡片、进度条、勾选完成
- 食材勾选：标记家里已有的食材，方便采买
- 复制原视频链接，回到抖音查看原视频

## 技术栈

**后端：**
- Python + FastAPI
- TikHub API（视频解析，获取音频 URL 和文案）
- 阿里云百炼 Qwen3.5-Omni（音频直接转结构化食谱，无需单独语音识别）

**前端：**
- 微信小程序原生开发（WXML + WXSS + JS）
- 本地存储（wx.setStorageSync）

## 项目结构
```
Foo记/
├── backend/
│   ├── main.py
│   ├── config.py
│   ├── config.example.py
│   ├── requirements.txt
│   └── services/
│       ├── link_parser.py
│       └── recipe_extractor.py
├── miniprogram/
│   ├── app.js
│   ├── app.json
│   ├── app.wxss
│   ├── images/
│   └── pages/
│       ├── index/
│       ├── result/
│       ├── history/
│       ├── edit/
│       └── cooking/
├── .gitignore
└── README.md
```

