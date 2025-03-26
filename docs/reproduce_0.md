# Deep Research AI Agent 项目复现指南

本文档提供了通过提示词指导 LLM 一步一步复现 Deep Research AI Agent 项目的详细指南。每个部分包含任务描述和相应的提示词，按照顺序执行可以完整重建整个项目。

## 任务拆解概览

复现过程分为以下几个主要阶段：

1. **项目初始化与基础配置**
2. **后端 API 实现**
3. **前端界面构建**
4. **状态管理实现**
5. **集成与测试**

## 阶段一：项目初始化与基础配置

### 任务 1: 创建 Next.js 项目

**提示词：**

```
请帮我创建一个使用TypeScript的Next.js 15项目，名为"deep-research-ai-agent"。项目需要使用App Router架构。

请完成以下步骤：
1. 给出初始化项目的命令
2. 创建必要的目录结构
3. 配置tailwind.css
4. 配置Shadcn UI组件库
5. 创建基础环境变量配置，需要包含OPENROUTER_API_KEY和EXA_SEARCH_API_KEY

请为每个步骤提供具体的命令和代码实现。
```

### 任务 2: 安装项目依赖

**提示词：**

```
请为Deep Research AI Agent项目添加必要的依赖项。项目需要以下功能：
1. AI交互能力 (Vercel AI SDK)
2. 状态管理 (Zustand)
3. 表单处理 (React Hook Form, Zod)
4. UI组件 (Shadcn UI)
5. Markdown渲染 (react-markdown, remark-gfm)
6. 代码高亮 (react-syntax-highlighter)
7. 日期处理 (date-fns)

请提供完整的package.json内容或npm/yarn安装命令。
```

## 阶段二：后端 API 实现

### 任务 3: 创建类型定义和常量

**提示词：**

```
请为Deep Research AI项目创建类型定义和常量文件。需要实现以下文件：

1. `/src/app/api/deep-research/types.ts`：定义以下类型：
   - ResearchState：包含topic, completedSteps, tokenUsed, findings, processedUrl, clerificationsText
   - Activity：包含type, status, message, timestamp
   - SearchResult：包含title, url, content
   - ResearchFindings：包含summary, source
   - Source：包含url, title
   - ActivityTracker相关类型
   - ModelCallOptions类型

2. `/src/app/api/deep-research/constants.ts`：定义以下常量：
   - MAX_ITERATIONS：最大迭代次数(3)
   - MAX_SEARCH_RESULTS：最大搜索结果数
   - MAX_CONTENT_CHARS：最大内容字符数
   - MODELS：不同任务使用的模型配置
   - MAX_RETRY_ATTEMPTS：最大重试次数
   - RETRY_DELAY_MS：重试延迟时间

请提供完整的实现代码。
```

### 任务 4: 创建工具函数和活动跟踪器

**提示词：**

```
请为Deep Research AI项目创建工具函数和活动跟踪器。需要实现以下文件：

1. `/src/app/api/deep-research/utils.ts`：包含以下函数：
   - combineFindings：合并研究发现
   - handleError：处理错误
   - delay：延迟函数

2. `/src/app/api/deep-research/activity-tracker.ts`：实现活动跟踪器，包含：
   - createActivityTracker函数，返回ActivityTracker对象
   - add方法：添加新活动

请提供完整的实现代码。
```

### 任务 5: 实现 API 服务和模型调用

**提示词：**

```
请为Deep Research AI项目实现API服务连接和模型调用功能。需要实现以下文件：

1. `/src/app/api/deep-research/services.ts`：
   - 实现OpenRouter API连接
   - 实现Exa Search API连接

2. `/src/app/api/deep-research/model-caller.ts`：实现callModel函数，功能包括：
   - 支持调用OpenRouter API的不同模型
   - 实现重试机制
   - 跟踪token使用情况
   - 支持生成结构化对象和文本

请提供完整的实现代码。
```

### 任务 6: 实现提示词模板

**提示词：**

```
请为Deep Research AI项目实现提示词模板。创建`/src/app/api/deep-research/prompts.ts`文件，包含以下提示词：

1. EXTRACTION_SYSTEM_PROMPT：用于从搜索结果中提取信息
2. ANALYSIS_SYSTEM_PROMPT：用于分析研究发现
3. PLANNING_SYSTEM_PROMPT：用于生成搜索查询
4. REPORT_SYSTEM_PROMPT：用于生成研究报告

以及对应的用户提示词函数：
1. getExtractionPrompt
2. getAnalysisPrompt
3. getPlanningPrompt
4. getReportPrompt

每个提示词需要详细指导AI完成特定任务，包含任务描述、输出格式要求、考虑因素等。

请提供完整的实现代码。
```

### 任务 7: 实现研究功能

**提示词：**

```
请为Deep Research AI项目实现核心研究功能。创建`/src/app/api/deep-research/research-functions.ts`文件，实现以下功能：

1. generateSearchQueries：根据研究主题生成搜索查询
2. search：执行网络搜索
3. extractContent：从搜索结果提取内容
4. processSearchResults：处理搜索结果
5. analyzeFindings：分析研究发现
6. generateReport：生成研究报告

每个函数需要：
- 使用activity-tracker记录活动
- 调用适当的AI模型
- 处理错误情况
- 更新研究状态

请提供完整的实现代码。
```

### 任务 8: 实现研究主流程

**提示词：**

```
请为Deep Research AI项目实现研究主流程。创建`/src/app/api/deep-research/main.ts`文件，实现deepResearch函数，包含以下功能：

1. 初始化活动跟踪器
2. 生成初始搜索查询
3. 循环执行研究过程（最多MAX_ITERATIONS次）：
   - 执行搜索
   - 处理搜索结果
   - 分析发现
   - 决定是继续搜索还是结束研究
4. 生成最终研究报告

函数应接收ResearchState和dataStream参数，并通过dataStream发送实时更新。

请提供完整的实现代码。
```

### 任务 9: 实现 API 路由

**提示词：**

```
请为Deep Research AI项目实现API路由。创建`/src/app/api/deep-research/route.ts`文件，实现POST处理函数，包含以下功能：

1. 解析请求体，提取研究主题和用户澄清内容
2. 创建ResearchState对象
3. 使用createDataStreamResponse创建流式响应
4. 在响应中调用deepResearch函数
5. 实现错误处理

此外，创建`/src/app/api/generate-questions/route.ts`实现生成问题的API。

请提供完整的实现代码。
```

## 阶段三：前端界面构建

### 任务 10: 实现状态管理

**提示词：**

```
请为Deep Research AI项目实现Zustand状态管理。创建`/src/store/deepResearch.ts`文件，实现以下功能：

1. 定义DeepResearchState接口，包含：
   - topic：研究主题
   - questions：问题列表
   - answers：答案列表
   - currentQuestion：当前问题索引
   - isCompleted：是否完成问题
   - isLoading：是否正在加载
   - activities：活动列表
   - sources：来源列表
   - report：研究报告

2. 定义DeepResearchActions接口，包含所有状态更新函数

3. 使用create函数创建useDeepResearchStore钩子

请提供完整的实现代码。
```

### 任务 11: 实现基础 UI 组件

**提示词：**

```
请为Deep Research AI项目实现基础UI组件。基于Shadcn UI库，创建以下组件：

1. 按钮组件 (`/src/components/ui/button.tsx`)
2. 输入框组件 (`/src/components/ui/input.tsx`)
3. 文本区域组件 (`/src/components/ui/textarea.tsx`)
4. 卡片组件 (`/src/components/ui/card.tsx`)
5. 表单组件 (`/src/components/ui/form.tsx`)
6. 可折叠组件 (`/src/components/ui/collapsible.tsx`)
7. 手风琴组件 (`/src/components/ui/accordion.tsx`)
8. 标签页组件 (`/src/components/ui/tabs.tsx`)

请使用Shadcn UI的CLI或直接提供每个组件的实现代码。
```

### 任务 12: 实现用户输入组件

**提示词：**

```
请为Deep Research AI项目实现用户输入组件。创建`/src/components/ui/deep-research/UserInput.tsx`文件，实现以下功能：

1. 使用React Hook Form和Zod验证
2. 表单包含一个输入框用于输入研究主题
3. 提交时调用/api/generate-questions API
4. 显示加载状态
5. 成功后更新Zustand状态中的topic和questions

组件应该是客户端组件，使用"use client"指令。

请提供完整的实现代码。
```

### 任务 13: 实现问题表单组件

**提示词：**

```
请为Deep Research AI项目实现问题表单组件。创建`/src/components/ui/deep-research/QuestionForm.tsx`文件，实现以下功能：

1. 从Zustand状态获取questions、currentQuestion和其他相关状态
2. 显示当前问题
3. 使用React Hook Form和Zod处理表单
4. 实现上一题/下一题导航
5. 提交答案更新Zustand状态
6. 当所有问题回答完毕时，设置isCompleted为true
7. 显示进度条

组件应该是客户端组件，使用"use client"指令。

请提供完整的实现代码。
```

### 任务 14: 实现问答组件

**提示词：**

```
请为Deep Research AI项目实现问答组件。创建`/src/components/ui/deep-research/QnA.tsx`文件，实现以下功能：

1. 从Zustand状态获取questions、isCompleted等状态
2. 使用Vercel AI SDK的useChat钩子连接到/api/deep-research API
3. 监听isCompleted状态，当为true时开始研究流程
4. 处理AI响应，从中提取活动、来源和报告
5. 更新Zustand状态
6. 渲染子组件：QuestionForm、CompletedQuestions、ResearchTimer、ResearchActivities和ResearchReport

组件应该是客户端组件，使用"use client"指令。

请提供完整的实现代码。
```

### 任务 15: 实现已完成问题组件

**提示词：**

```
请为Deep Research AI项目实现已完成问题组件。创建`/src/components/ui/deep-research/CompletedQuestions.tsx`文件，实现以下功能：

1. 从Zustand状态获取questions、answers和isCompleted
2. 只在isCompleted为true时显示
3. 使用手风琴组件显示所有问题和答案
4. 嵌套的手风琴结构，顶层为"Questions and Answers"，点击展开所有问题
5. 每个问题可单独展开查看答案

组件应该是客户端组件，使用"use client"指令。

请提供完整的实现代码。
```

### 任务 16: 实现研究活动组件

**提示词：**

```
请为Deep Research AI项目实现研究活动组件。创建`/src/components/ui/deep-research/ResearchActivities.tsx`文件，实现以下功能：

1. 从Zustand状态获取activities和sources
2. 实现一个可折叠的浮动面板
3. 使用标签页组件分别显示"Activities"和"Sources"
4. 活动列表显示：
   - 活动状态（使用不同颜色：绿色-完成，黄色-进行中，红色-错误）
   - 活动消息
   - 时间戳
5. 来源列表显示可点击的链接

组件应该是客户端组件，使用"use client"指令。

请提供完整的实现代码。
```

### 任务 17: 实现研究计时器组件

**提示词：**

```
请为Deep Research AI项目实现研究计时器组件。创建`/src/components/ui/deep-research/ResearchTimer.tsx`文件，实现以下功能：

1. 从Zustand状态获取report、isCompleted和activities
2. 使用useState和useEffect实现计时器
3. 在activities有内容时开始计时
4. 在report有内容时停止计时
5. 显示格式化的时间（秒/分钟）
6. 以毫秒精度更新

组件应该是客户端组件，使用"use client"指令。

请提供完整的实现代码。
```

### 任务 18: 实现研究报告组件

**提示词：**

```
请为Deep Research AI项目实现研究报告组件。创建`/src/components/ui/deep-research/ResearchReport.tsx`文件，实现以下功能：

1. 从Zustand状态获取report、isCompleted、isLoading和topic
2. 只在isCompleted为true时显示
3. 显示加载状态
4. 使用react-markdown渲染Markdown格式的报告
5. 配置代码高亮功能
6. 实现报告下载功能
7. 从报告中提取<report>标签之间的内容

组件应该是客户端组件，使用"use client"指令。

请提供完整的实现代码。
```

### 任务 19: 实现主页面

**提示词：**

```
请为Deep Research AI项目实现主页面。修改`/src/app/page.tsx`文件，实现以下功能：

1. 导入并使用背景图片
2. 显示项目标题和简短描述
3. 渲染UserInput组件
4. 渲染QnA组件
5. 使用Tailwind CSS进行样式设计

请提供完整的实现代码。
```

## 阶段四：集成与测试

### 任务 20: 环境配置与部署准备

**提示词：**

```
请为Deep Research AI项目完成环境配置与部署准备工作：

1. 创建完整的.env.example文件，列出所有必要的环境变量
2. 编写项目README.md，包含：
   - 项目描述
   - 功能特点
   - 技术栈
   - 安装步骤
   - 环境变量配置
   - 使用说明
   - 开发者指南
3. 配置next.config.ts
4. 创建必要的public目录资源

请提供所有文件的完整实现代码。
```

### 任务 21: 项目测试与调试指南

**提示词：**

```
请为Deep Research AI项目创建测试与调试指南，包含以下内容：

1. 本地测试流程：
   - 如何测试前端组件
   - 如何测试后端API
   - 如何测试完整研究流程
2. 常见问题与解决方案：
   - API连接问题
   - 流式响应问题
   - 状态管理问题
3. 性能优化建议
4. 扩展功能指南：
   - 如何添加新的AI模型
   - 如何自定义研究流程
   - 如何调整提示词

请提供完整的指南文档。
```

## 最终检查清单

在完成所有步骤后，请确认：

1. 所有必要文件都已创建
2. 前端组件能正常交互
3. 后端 API 能正确响应
4. 状态管理正常工作
5. 环境变量已正确配置
6. 项目可以正常启动和运行

按照本指南中的任务和提示词，LLM 应能够逐步复现完整的 Deep Research AI Agent 项目。根据需要，可以调整提示词以获得更精确的结果。
