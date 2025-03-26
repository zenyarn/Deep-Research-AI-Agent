# Deep Research AI Agent 项目复现指南

本文档提供了通过与 LLM 交互，一步一步复现整个 Deep Research AI Agent 项目的详细指南。每个步骤都包含任务描述和具体提示词，帮助你引导 LLM 生成所需代码和配置。

## 项目概述

Deep Research AI Agent 是一个 AI 驱动的研究助手，能够对用户提供的主题进行深度研究，自动生成搜索查询，处理搜索结果，并最终生成全面的研究报告。项目使用 Next.js 构建前端，Zustand 管理状态，并集成了多种 AI 模型和搜索 API。

## 复现步骤

### 第一阶段：项目初始化与环境设置

#### 步骤 1：创建 Next.js 项目并安装依赖

**提示词**:

```
请帮我创建一个名为"deep-research-ai-agent"的Next.js 15项目，使用App Router。我需要以下配置：

1. 使用TypeScript
2. 配置Tailwind CSS
3. 设置以下依赖：
   - zustand (状态管理)
   - @vercel/ai 和 ai (AI SDK)
   - react-hook-form 和 @hookform/resolvers/zod (表单处理)
   - react-markdown 和 remark-gfm (Markdown渲染)
   - date-fns (日期处理)
   - lucide-react (图标)
   - react-syntax-highlighter (代码高亮)
   - zod (类型验证)

请提供完整的项目初始化命令和package.json内容。
```

#### 步骤 2：设置 UI 组件库

**提示词**:

```
请帮我设置Shadcn UI组件库，我需要以下组件：
1. Button
2. Form相关组件
3. Card
4. Textarea
5. Input
6. Accordion
7. Tabs
8. Collapsible

请提供安装和设置命令，以及components.json的配置内容。
```

#### 步骤 3：创建环境变量配置

**提示词**:

```
请创建.env.example文件，包含以下环境变量：
1. OPENROUTER_API_KEY - 用于访问LLM模型
2. EXA_SEARCH_API_KEY - 用于执行网络搜索

还需要创建相应的类型声明，确保TypeScript能正确识别这些环境变量。
```

### 第二阶段：核心类型与状态管理实现

#### 步骤 4：定义核心类型

**提示词**:

```
请创建src/app/api/deep-research/types.ts文件，定义以下核心类型：
1. ResearchState - 研究状态，包含topic、findings、completedSteps等字段
2. SearchResult - 搜索结果，包含title、url、content字段
3. ResearchFindings - 研究发现，包含summary和source字段
4. Activity - 研究活动，包含type、status、message等字段
5. Source - 来源信息，包含url和title字段
6. ModelCallOptions - 模型调用选项

请确保类型定义完整，并附带必要的注释说明字段用途。
```

#### 步骤 5：实现 Zustand 状态管理

**提示词**:

```
请创建src/store/deepResearch.ts文件，使用Zustand实现状态管理：

1. 定义DeepResearchState接口，包含：
   - topic: string;
   - questions: string[];
   - answers: string[];
   - currentQuestion: number;
   - isCompleted: boolean;
   - isLoading: boolean;
   - activities: Activity[];
   - sources: Source[];
   - report: string;

2. 定义DeepResearchActions接口，提供更新上述所有状态的方法
3. 创建初始状态对象
4. 创建并导出useDeepResearchStore hook

请确保代码类型安全，并实现所有必要的更新函数。
```

### 第三阶段：后端核心功能实现

#### 步骤 6：创建常量和工具函数

**提示词**:

```
请创建以下文件：

1. src/app/api/deep-research/constants.ts - 定义常量：
   - MAX_ITERATIONS (最大迭代次数)
   - MAX_SEARCH_RESULTS (最大搜索结果数)
   - MAX_CONTENT_CHARS (最大内容字符数)
   - MODELS (不同任务使用的模型)
   - RETRY_DELAY_MS 和 MAX_RETRY_ATTEMPTS (重试配置)

2. src/app/api/deep-research/utils.ts - 实现工具函数：
   - delay (延迟函数)
   - combineFindings (合并研究发现)
   - handleError (错误处理)

请提供完整的代码实现，包括必要的类型和注释。
```

#### 步骤 7：实现服务连接器

**提示词**:

```
请创建src/app/api/deep-research/services.ts文件，实现以下服务连接器：

1. openrouter - 连接OpenRouter API访问LLM模型
2. exa - 连接Exa Search API执行网络搜索

确保使用环境变量进行配置，处理认证和API调用格式化。
```

#### 步骤 8：实现模型调用器

**提示词**:

```
请创建src/app/api/deep-research/model-caller.ts文件，实现callModel函数：

1. 支持调用OpenRouter上的不同模型
2. 处理带结构化输出(generateObject)和文本输出(generateText)的调用
3. 实现重试逻辑
4. 更新研究状态的tokenUsed和completedSteps计数
5. 与活动跟踪器集成

请确保代码健壮，能处理各种错误情况。
```

#### 步骤 9：创建提示词模板

**提示词**:

```
请创建src/app/api/deep-research/prompts.ts文件，实现以下提示词模板：

1. PLANNING_SYSTEM_PROMPT - 用于生成搜索查询的系统提示
2. EXTRACTION_SYSTEM_PROMPT - 用于从搜索结果提取信息的系统提示
3. ANALYSIS_SYSTEM_PROMPT - 用于分析发现的系统提示
4. REPORT_SYSTEM_PROMPT - 用于生成报告的系统提示

并创建配套的用户提示函数：
1. getPlanningPrompt
2. getExtractionPrompt
3. getAnalysisPrompt
4. getReportPrompt

确保提示词设计合理，能指导模型完成对应任务。
```

#### 步骤 10：实现活动跟踪器

**提示词**:

```
请创建src/app/api/deep-research/activity-tracker.ts文件，实现活动跟踪器：

1. 创建createActivityTracker函数，返回ActivityTracker对象
2. 实现add方法，用于添加新活动
3. 集成dataStream，实时向前端发送活动更新

确保跟踪器能准确记录时间戳和状态信息。
```

#### 步骤 11：实现研究功能

**提示词**:

```
请创建src/app/api/deep-research/research-functions.ts文件，实现核心研究功能：

1. generateSearchQueries - 生成搜索查询
2. search - 执行网络搜索
3. extractContent - 从搜索结果提取内容
4. processSearchResults - 处理所有搜索结果
5. analyzeFindings - 分析研究发现
6. generateReport - 生成最终报告

每个函数都应集成活动跟踪器，处理错误情况，并更新研究状态。
```

#### 步骤 12：实现主研究流程

**提示词**:

```
请创建src/app/api/deep-research/main.ts文件，实现deepResearch函数：

1. 初始化活动跟踪器
2. 生成初始搜索查询
3. 实现迭代研究循环：
   - 执行搜索
   - 处理结果
   - 分析发现
   - 决定是继续还是完成研究
4. 生成并返回最终报告

确保代码实现迭代改进的研究流程，能够处理部分失败情况。
```

#### 步骤 13：创建 API 路由处理器

**提示词**:

```
请创建src/app/api/deep-research/route.ts文件，实现API路由处理：

1. 导出POST函数处理请求
2. 解析请求中的主题和问题回答
3. 初始化研究状态
4. 使用createDataStreamResponse创建流式响应
5. 调用deepResearch函数
6. 处理错误情况

确保实现流式数据传输，以及正确的错误处理。
```

#### 步骤 14：创建问题生成 API

**提示词**:

```
请创建src/app/api/generate-questions/route.ts文件，实现问题生成API：

1. 接收研究主题
2. 调用AI模型生成相关问题（3-5个）
3. 返回问题数组

这个API用于根据用户输入的主题生成初始问题列表。
```

### 第四阶段：前端组件实现

#### 步骤 15：实现用户输入组件

**提示词**:

```
请创建src/components/ui/deep-research/UserInput.tsx文件，实现用户输入组件：

1. 使用React Hook Form处理表单
2. 实现提交处理函数，调用/api/generate-questions API
3. 更新Zustand状态(topic和questions)
4. 处理加载状态和表单验证
5. 设计简洁美观的UI

这是用户输入研究主题的入口组件。
```

#### 步骤 16：实现问题表单组件

**提示词**:

```
请创建src/components/ui/deep-research/QuestionForm.tsx文件，实现问题表单组件：

1. 从Zustand存储获取问题和当前状态
2. 实现问题导航和表单提交逻辑
3. 更新用户回答和导航至下一问题
4. 在所有问题回答完毕后设置isCompleted
5. 显示进度指示器
6. 实现"上一题"和"下一题/开始研究"按钮

确保组件设计友好，能清晰指导用户完成问答过程。
```

#### 步骤 17：实现 QnA 组件

**提示词**:

```
请创建src/components/ui/deep-research/QnA.tsx文件，实现问答管理组件：

1. 使用useChat hook与/api/deep-research API通信
2. 处理研究完成条件(isCompleted)，触发研究流程
3. 从API响应流中提取活动、来源和报告
4. 更新对应的Zustand状态
5. 条件渲染QuestionForm和其他相关组件

这是协调整个研究流程UI交互的核心组件。
```

#### 步骤 18：实现研究活动组件

**提示词**:

```
请创建src/components/ui/deep-research/ResearchActivities.tsx文件，实现研究活动显示：

1. 使用Collapsible组件创建可折叠面板
2. 使用Tabs组件分隔活动和来源
3. 显示活动状态(pending/complete/error)和时间戳
4. 显示来源链接列表
5. 实现固定定位和响应式设计

确保组件能清晰展示实时研究进度。
```

#### 步骤 19：实现研究报告组件

**提示词**:

```
请创建src/components/ui/deep-research/ResearchReport.tsx文件，实现报告显示：

1. 使用react-markdown渲染报告内容
2. 设置代码高亮(react-syntax-highlighter)
3. 实现报告下载功能
4. 处理加载状态
5. 只在研究完成后显示

确保报告展示清晰，格式规范，便于阅读。
```

#### 步骤 20：实现已完成问题组件

**提示词**:

```
请创建src/components/ui/deep-research/CompletedQuestions.tsx文件，实现已完成问题显示：

1. 使用Accordion组件展示问题和答案
2. 只在研究完成后显示
3. 设计简洁的折叠式界面

该组件用于展示用户已经回答的所有问题。
```

#### 步骤 21：实现研究计时器组件

**提示词**:

```
请创建src/components/ui/deep-research/ResearchTimer.tsx文件，实现计时器组件：

1. 使用useState和useEffect实现计时功能
2. 在研究开始时启动计时
3. 在研究完成时停止计时
4. 格式化显示时间(秒/分钟)
5. 设计简洁的显示界面

该组件用于显示研究进行的时间。
```

#### 步骤 22：实现主页面

**提示词**:

```
请创建/修改src/app/page.tsx文件，实现主页面：

1. 导入并使用UserInput和QnA组件
2. 设计美观的页面标题和介绍
3. 添加背景样式
4. 确保页面响应式设计

这是用户访问应用的主入口页面。
```

### 第五阶段：样式和资源

#### 步骤 23：添加全局样式

**提示词**:

```
请创建/修改src/app/globals.css文件，添加全局样式：

1. 配置Tailwind基础样式
2. 添加必要的自定义CSS变量
3. 设置排版样式
4. 添加任何需要的自定义组件样式

确保样式设计现代化，与项目整体风格一致。
```

#### 步骤 24：添加背景图片

**提示词**:

```
请创建public目录并添加background.jpg作为背景图片：

1. 提供一个简单的指导，描述适合项目的背景图片特征
2. 确保图片尺寸和文件大小适中
3. 调整主页中的图片引用

这将作为应用的视觉背景。
```

### 第六阶段：测试与完善

#### 步骤 25：创建 README 文档

**提示词**:

```
请创建README.md文件，包含以下内容：

1. 项目名称和简介
2. 核心功能描述
3. 技术栈概述
4. 安装和设置指南
5. 环境变量配置
6. 使用说明
7. 开发者信息

确保文档清晰易懂，能帮助其他开发者理解和使用项目。
```

#### 步骤 26：debug 与问题排查指南

**提示词**:

```
请创建一个调试和问题排查指南，包含以下内容：

1. 常见错误及解决方法
2. API密钥设置问题
3. 模型响应调试
4. 前端组件交互问题
5. 性能优化建议

这将帮助开发者解决项目可能遇到的问题。
```

## 完整项目测试与验证

在完成上述所有步骤后，使用以下提示词进行最终测试：

**提示词**:

```
请帮我验证整个Deep Research AI Agent项目是否可以正常工作：

1. 检查所有必要文件是否已创建
2. 确认环境变量设置是否正确
3. 启动开发服务器检查前端渲染
4. 测试用户输入和问题生成
5. 验证研究流程和报告生成
6. 检查是否有任何明显错误或缺失功能

请提供任何需要修复的问题清单。
```

## 结语

通过按顺序使用上述提示词，你应该能够成功复现完整的 Deep Research AI Agent 项目。每个步骤都专注于一个特定功能或组件，使整个复现过程更加清晰和可管理。

根据需要，你可以调整提示词以获得更详细的指导或更符合你特定需求的实现。祝你复现顺利！
