# Deep Research AI Agent 项目文档

## 目录

1. [项目概述](#项目概述)
2. [源码结构](#源码结构)
3. [核心功能模块](#核心功能模块)
4. [前端界面](#前端界面)
5. [状态管理](#状态管理)
6. [环境配置](#环境配置)
7. [启动指南](#启动指南)
8. [技术栈详解](#技术栈详解)
9. [开发注意事项](#开发注意事项)

## 项目概述

Deep Research AI Agent 是一个强大的研究助手系统，能够根据用户提供的主题执行多轮迭代研究，自动生成搜索查询，分析搜索结果，并最终生成全面的研究报告。系统利用先进的大语言模型和网络搜索功能，模拟人类研究过程中的迭代改进和深度分析。

## 源码结构

```
/deep-research-ai-agent
├── public/
│   └── background.jpg           # 主页背景图片
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── deep-research/   # 深度研究API实现
│   │   │       ├── main.ts      # 主研究流程
│   │   │       ├── activity-tracker.ts # 活动跟踪器
│   │   │       ├── constants.ts # 常量定义
│   │   │       ├── prompts.ts   # LLM提示词模板
│   │   │       ├── research-functions.ts # 研究相关功能
│   │   │       ├── types.ts     # 类型定义
│   │   │       └── utils.ts     # 工具函数
│   │   ├── globals.css          # 全局样式
│   │   └── page.tsx             # 主页面
│   ├── components/
│   │   └── ui/
│   │       ├── card.tsx         # 卡片组件
│   │       ├── button.tsx       # 按钮组件
│   │       └── deep-research/   # 研究相关组件
│   │           ├── CompletedQuestions.tsx # 已完成问题组件
│   │           ├── QnA.tsx      # 问答组件
│   │           ├── QuestionForm.tsx # 问题表单组件
│   │           ├── ResearchActivities.tsx # 研究活动组件
│   │           ├── ResearchReport.tsx # 研究报告组件
│   │           ├── ResearchTimer.tsx # 研究计时器组件
│   │           └── UserInput.tsx # 用户输入组件
│   ├── lib/
│   │   └── utils.ts             # 通用工具函数
│   └── store/
│       └── deepResearch.ts      # Zustand状态管理
├── .env.example                 # 环境变量示例
├── .env.local                   # 本地环境变量(需创建)
├── .gitignore                   # Git忽略文件配置
├── components.json              # Shadcn UI组件配置
├── next.config.ts               # Next.js配置
├── package.json                 # 项目依赖
├── tailwind.config.js           # Tailwind配置
└── tsconfig.json                # TypeScript配置
```

## 核心功能模块

### 1. 研究流程引擎 (`src/app/api/deep-research/main.ts`)

这是整个研究过程的核心协调器，负责管理研究的完整生命周期：

- 初始化研究状态和活动跟踪器
- 生成初始搜索查询
- 执行迭代研究循环 (最多执行配置的最大迭代次数)
- 处理搜索结果和分析发现
- 控制何时结束研究并生成报告

```typescript
export async function deepResearch(researchState: ResearchState, dataStream: any) {
    let iteration = 0;
    const activityTracker = createActivityTracker(dataStream, researchState);
    const initialQueries = await generateSearchQueries(researchState, activityTracker);
    // 迭代研究循环
    // ...
}
```

### 2. 研究功能模块 (`src/app/api/deep-research/research-functions.ts`)

包含多个专门的研究功能：

- `generateSearchQueries`: 基于研究主题和问题生成搜索查询
- `search`: 使用Exa API执行网络搜索
- `processSearchResults`: 处理和提取搜索结果中的有用信息
- `analyzeFindings`: 分析当前发现并决定是否需要更多搜索
- `generateReport`: 创建最终的研究报告

### 3. 活动跟踪器 (`src/app/api/deep-research/activity-tracker.ts`)

追踪和报告研究过程中的各项活动，为用户提供实时反馈：

- 搜索查询的生成和执行
- 信息提取和处理
- 分析进展
- 报告生成

### 4. 提示词模板 (`src/app/api/deep-research/prompts.ts`)

为不同任务设计的专门LLM提示词：

```typescript
export const EXTRACTION_SYSTEM_PROMPT = `
You are a senior technical documentation writer working in R&D department of a company.
// ...
`;
```

## 前端界面

### 主页面 (`src/app/page.tsx`)

提供了用户友好的研究界面：

```typescript
export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start gap-8 py-16">
      {/* 背景图片 */}
      <div className="fixed top-0 left-0 w-full h-full object-cover -z-10 bg-black/30">
        <Image src={bg} alt="Deep Research AI Agent" className="w-full h-full object-cover opacity-50" />
      </div>
      
      {/* 标题区域 */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl sm:text-8xl font-bold font-dancing-script italic bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Deep Research
        </h1>
        <p className="text-gray-600 text-center max-w-[90vw] sm:max-w-[50vw]">
          Enter a topic and answer a few questions to generate a comprehensive research report.
        </p>
      </div>
      
      {/* 用户输入和问答组件 */}
      <UserInput />
      <QnA />
    </main>
  );
}
```

### 研究交互组件

- `UserInput.tsx`: 允许用户输入研究主题
- `QnA.tsx`: 处理问题和答案交互
- `QuestionForm.tsx`: 向用户提问以改进研究
- `ResearchActivities.tsx`: 显示研究活动和进度
- `ResearchReport.tsx`: 展示最终研究报告
- `CompletedQuestions.tsx`: 显示已完成的问题

## 状态管理

使用Zustand管理应用状态 (`src/store/deepResearch.ts`):

- 研究主题
- 用户问答
- 研究活动
- 研究发现
- 报告内容
- 加载状态

```typescript
// 推测的Zustand存储结构
interface DeepResearchStore {
  topic: string;
  questions: string[];
  answers: Record<string, string>;
  isCompleted: boolean;
  activities: Activity[];
  sources: Source[];
  report: string;
  isLoading: boolean;
  
  // 操作方法
  setTopic: (topic: string) => void;
  addQuestion: (question: string) => void;
  setAnswer: (questionId: string, answer: string) => void;
  setActivities: (activities: Activity[]) => void;
  setSources: (sources: Source[]) => void;
  setReport: (report: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}
```

## 环境配置

项目需要以下环境变量 (在`.env.local`中配置):

```
OPENROUTER_API_KEY='您的OpenRouter API密钥'
EXA_SEARCH_API_KEY='您的Exa搜索API密钥'
```

## 启动指南

1. 克隆仓库
2. 安装依赖
   ```bash
   npm install --legacy-peer-deps
   ```
3. 创建`.env.local`文件并添加所需的API密钥
4. 启动开发服务器
   ```bash
   npm run dev
   ```
5. 访问 http://localhost:3000 开始使用

## 技术栈详解

### 前端技术

- **Next.js 15**: 使用App Router架构的React框架
- **Tailwind CSS**: 用于样式设计的实用工具CSS框架
- **Shadcn UI**: 基于Radix UI构建的可定制组件库
- **Zustand**: 轻量级状态管理库
- **Vercel AI SDK**: AI功能集成工具包
- **React Markdown**: Markdown渲染组件

### 后端技术

- **Next.js API Routes**: 提供后端API功能
- **OpenRouter SDK**: 访问多种LLM模型
- **Exa Search API**: 执行网络搜索
- **AI/LLM模型**:
  - 规划: openai/gpt-4o
  - 信息提取: openai/gpt-4o-mini
  - 分析: openai/gpt-4o
  - 报告生成: google/gemini-2.0-flash-thinking-exp:free

## 开发注意事项

1. **环境变量**: 确保所有必要的API密钥都已正确配置

2. **模型优化**: 不同任务使用不同的模型以优化性能和成本

3. **迭代控制**: 通过`MAX_ITERATIONS`常量控制最大研究迭代次数，防止过度消耗API资源

4. **错误处理**: 使用Promise.allSettled确保即使部分搜索失败也能继续研究流程

5. **代码结构**: 保持模块化和功能分离，方便扩展和维护

6. **提示词优化**: 持续优化LLM提示词以提高研究质量

7. **UI响应性**: 确保用户界面提供足够的实时反馈，增强用户体验

---

