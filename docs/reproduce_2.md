# Deep Research AI Agent 项目复现指南

## 项目概述

Deep Research AI Agent 是一个强大的研究助手系统，能够根据用户提供的主题执行多轮迭代研究，自动生成搜索查询，分析搜索结果，并最终生成全面的研究报告。系统利用现代技术栈（Next.js, Tailwind CSS, Zustand 等）和 AI 模型（通过 OpenRouter 访问）实现，具有直观的用户界面和强大的研究能力。

## 复现策略

本文档将项目复现过程分解为多个渐进式任务，每个任务都包含：

- 任务描述
- 提示词（引导 LLM 完成该任务）
- 验证方法（确保任务正确完成）
- 潜在问题与解决方案

## 任务拆解

### 1. 项目初始化与基础设置

#### 1.1 创建 Next.js 项目和安装依赖

**提示词：**

```
请帮我创建一个名为"deep-research-ai-agent"的Next.js 15应用程序（使用App Router），并安装以下依赖：
1. UI库：Tailwind CSS, Shadcn UI
2. 状态管理：Zustand
3. 表单处理：React Hook Form, Zod
4. Markdown渲染：React Markdown, Remark-GFM
5. AI集成：AI SDK (@ai-sdk/react)
6. 其他工具库：date-fns, lucide-react

请生成完整的项目初始化命令和package.json文件内容。同时，请配置好Tailwind CSS和其他必要的设置。
```

**验证方法：**

- 运行`npm run dev`确保项目能成功启动
- 检查 package.json 确保所有依赖都已正确安装
- 检查 tailwind.config.js 和 next.config.js 配置是否正确

#### 1.2 配置环境变量

**提示词：**

```
请创建一个.env.example文件，包含项目所需的环境变量：
1. OPENROUTER_API_KEY - 用于访问LLM模型
2. EXA_SEARCH_API_KEY - 用于执行网络搜索

同时，请提供如何设置这些API密钥的简要说明，并解释在本地开发环境中如何使用.env.local文件。
```

**验证方法：**

- 检查.env.example 文件是否包含所有必要的环境变量
- 测试.env.local 文件是否能被正确加载（可以通过简单的日志输出验证）

### 2. 后端实现

#### 2.1 创建类型定义

**提示词：**

```
请在src/app/api/deep-research/types.ts文件中定义以下类型：
1. ResearchState - 表示研究状态的接口
2. Activity - 表示研究活动的接口
3. Source - 表示信息来源的接口
4. SearchResult - 表示搜索结果的接口
5. ResearchFindings - 表示研究发现的接口

这些类型将在整个项目中使用，所以请确保它们清晰、全面，并带有适当的JSDoc注释。
```

**验证方法：**

- 检查类型定义是否完整、清晰
- 确保类型定义不会导致 TypeScript 编译错误
- 验证 JSDoc 注释是否提供了足够的信息

#### 2.2 实现 Constants 和 Utilities

**提示词：**

```
请创建以下两个文件：

1. src/app/api/deep-research/constants.ts：
   - 定义MAX_ITERATIONS（最大研究迭代次数，设为3）
   - 定义MAX_SEARCH_RESULTS（每次搜索的最大结果数，设为5）
   - 定义MAX_CONTENT_CHARS（每个内容的最大字符数，设为15000）
   - 定义MAX_RETRY_ATTEMPTS（最大重试次数，设为3）
   - 定义RETRY_DELAY_MS（重试延迟，设为1000）
   - 定义MODELS对象，包含PLANNING、EXTRACTION、ANALYSIS和REPORT模型配置

2. src/app/api/deep-research/utils.ts：
   - 创建combineFindings函数，用于合并研究发现
   - 创建handleError函数，用于处理和记录错误
   - 创建delay函数，用于异步延迟
```

**验证方法：**

- 检查常量值是否正确设置
- 验证工具函数是否能正确执行（可以编写简单的单元测试）
- 确保没有语法或类型错误

#### 2.3 创建 AI 模型调用器

**提示词：**

```
请创建src/app/api/deep-research/model-caller.ts文件，实现与AI模型的交互：

1. 导入必要的依赖（generateObject, generateText等）
2. 创建callModel函数，该函数应该：
   - 接收模型、提示词、系统提示、模式和活动类型参数
   - 实现重试逻辑（使用MAX_RETRY_ATTEMPTS和RETRY_DELAY_MS常量）
   - 支持结构化输出（使用generateObject）和文本输出（使用generateText）
   - 更新研究状态（令牌使用和完成步骤）
   - 处理错误并通过活动跟踪器报告

请确保函数具有适当的类型注解，并处理各种边缘情况。
```

**验证方法：**

- 使用模拟（mock）AI 模型响应测试 callModel 函数
- 验证重试逻辑是否正常工作
- 检查错误处理是否恰当

#### 2.4 实现提示词模板

**提示词：**

```
请创建src/app/api/deep-research/prompts.ts文件，定义以下提示词模板：

1. EXTRACTION_SYSTEM_PROMPT - 用于从搜索结果中提取信息的系统提示
2. ANALYSIS_SYSTEM_PROMPT - 用于分析研究发现的系统提示
3. PLANNING_SYSTEM_PROMPT - 用于生成搜索查询的系统提示
4. REPORT_SYSTEM_PROMPT - 用于生成最终报告的系统提示

另外，为每个系统提示创建对应的用户提示函数：
- getExtractionPrompt
- getAnalysisPrompt
- getPlanningPrompt
- getReportPrompt

每个提示词应该清晰指导模型完成特定任务，并包含必要的上下文和指令。
```

**验证方法：**

- 检查提示词是否清晰、具体且无歧义
- 验证提示函数是否正确组合系统提示和用户数据
- 测试提示词在简单示例上的效果（可以使用 OpenAI Playground 等工具）

#### 2.5 创建活动跟踪器

**提示词：**

```
请创建src/app/api/deep-research/activity-tracker.ts文件，实现研究活动跟踪功能：

1. 创建createActivityTracker函数，该函数应返回一个具有add方法的对象
2. add方法应接收类型、状态和消息参数，并将活动信息写入数据流
3. 活动信息应包含时间戳、类型、状态和消息
4. 活动类型可以是planning、search、extract、analyze或generate
5. 状态可以是pending、complete、warning或error

确保活动跟踪器能够实时向前端发送活动更新。
```

**验证方法：**

- 测试活动跟踪器是否能正确记录和发送活动信息
- 验证时间戳、类型、状态和消息是否正确格式化
- 检查 dataStream.writeData 的调用是否正确

#### 2.6 实现研究功能

**提示词：**

```
请创建src/app/api/deep-research/research-functions.ts文件，实现以下核心研究功能：

1. generateSearchQueries - 根据研究主题和澄清生成搜索查询
2. search - 使用Exa API执行网络搜索
3. extractContent - 从搜索结果中提取相关信息
4. processSearchResults - 处理所有搜索结果
5. analyzeFindings - 分析研究发现并决定下一步行动
6. generateReport - 生成最终研究报告

每个函数都应该：
- 使用适当的提示词和模型
- 更新活动状态
- 处理错误情况
- 返回预期的结果类型

请确保函数之间的协作逻辑清晰，并且错误处理健壮。
```

**验证方法：**

- 对每个函数编写单元测试，使用模拟数据和模拟 API 响应
- 测试各种边缘情况和错误场景
- 验证函数之间的数据流是否正确

#### 2.7 实现服务连接器

**提示词：**

```
请创建src/app/api/deep-research/services.ts文件，实现外部服务连接：

1. 创建openrouter函数，用于连接OpenRouter API
2. 创建exa对象，用于连接Exa Search API

确保这些连接使用环境变量中的API密钥，并处理可能的身份验证错误。
```

**验证方法：**

- 使用有效的 API 密钥测试连接是否成功
- 测试无效 API 密钥时的错误处理
- 验证 API 调用参数是否正确

#### 2.8 实现主研究流程

**提示词：**

```
请创建src/app/api/deep-research/main.ts文件，实现核心研究流程：

1. 创建deepResearch函数，该函数应接收研究状态和数据流参数
2. 实现研究迭代循环：
   - 生成初始搜索查询
   - 执行搜索
   - 处理搜索结果
   - 分析发现
   - 根据分析结果决定是否继续搜索
3. 生成最终研究报告
4. 将报告写入数据流

确保函数能够处理各种边缘情况，如没有找到结果、API错误等。
```

**验证方法：**

- 使用模拟数据测试整个研究流程
- 验证迭代逻辑是否正确工作
- 测试不同退出条件（足够信息、达到最大迭代、无更多查询）

#### 2.9 实现 API 路由

**提示词：**

```
请创建src/app/api/deep-research/route.ts文件，实现API路由处理：

1. 创建POST处理函数，用于接收前端请求
2. 从请求体中提取主题和澄清问题
3. 初始化研究状态
4. 使用createDataStreamResponse创建流式响应
5. 调用deepResearch函数开始研究流程
6. 实现错误处理逻辑

确保API能够正确接收和处理请求，并以流的形式返回响应。
```

**验证方法：**

- 使用 Postman 或类似工具测试 API 端点
- 验证 API 是否能正确处理有效和无效请求
- 测试流式响应是否正常工作

#### 2.10 实现问题生成 API

**提示词：**

```
请创建src/app/api/generate-questions/route.ts文件，实现问题生成API：

1. 创建POST处理函数，用于接收主题并生成相关问题
2. 使用适当的LLM模型生成与主题相关的澄清问题
3. 返回生成的问题数组
4. 实现错误处理逻辑

生成的问题应该能帮助系统更好地理解用户的研究需求。
```

**验证方法：**

- 测试不同主题下 API 是否能生成相关且有用的问题
- 验证 API 的响应格式是否正确
- 检查错误处理是否恰当

### 3. 前端实现

#### 3.1 创建状态管理

**提示词：**

```
请创建src/store/deepResearch.ts文件，使用Zustand实现状态管理：

1. 定义DeepResearchState接口，包含以下状态：
   - topic（研究主题）
   - questions（问题列表）
   - answers（答案列表）
   - currentQuestion（当前问题索引）
   - isCompleted（是否完成问答）
   - isLoading（是否正在加载）
   - activities（研究活动列表）
   - sources（信息来源列表）
   - report（研究报告内容）

2. 定义DeepResearchActions接口，包含以下操作：
   - setTopic、setQuestions、setAnswers等setter函数

3. 创建useDeepResearchStore hook，实现状态和操作

确保状态管理逻辑清晰，并提供适当的类型安全。
```

**验证方法：**

- 创建一个简单的测试组件，验证状态更新是否正常工作
- 检查 TypeScript 类型是否正确
- 验证所有操作是否按预期更新状态

#### 3.2 实现 UI 组件 - UserInput

**提示词：**

```
请创建src/components/ui/deep-research/UserInput.tsx组件，实现研究主题输入功能：

1. 创建表单，包含输入字段和提交按钮
2. 使用React Hook Form和Zod进行表单验证
3. 在提交时调用/api/generate-questions API
4. 将生成的问题和主题保存到Zustand状态
5. 实现加载状态和错误处理

确保组件具有良好的用户体验和适当的反馈机制。
```

**验证方法：**

- 测试表单验证是否正常工作
- 验证 API 调用和状态更新是否成功
- 检查加载状态和错误处理是否恰当
- 测试 UI 在不同屏幕尺寸下的响应性

#### 3.3 实现 UI 组件 - QuestionForm

**提示词：**

```
请创建src/components/ui/deep-research/QuestionForm.tsx组件，实现问题表单功能：

1. 显示当前问题和进度
2. 创建用于输入答案的表单
3. 使用React Hook Form和Zod进行表单验证
4. 实现上一题/下一题导航
5. 在完成所有问题后触发研究流程
6. 显示进度指示器

确保组件能够高效地收集用户对问题的回答，并提供直观的导航体验。
```

**验证方法：**

- 测试导航功能（上一题/下一题）是否正常工作
- 验证表单提交是否正确更新状态
- 检查进度指示器是否准确反映当前状态
- 确保所有问题完成后正确触发研究流程

#### 3.4 实现 UI 组件 - ResearchActivities

**提示词：**

```
请创建src/components/ui/deep-research/ResearchActivities.tsx组件，实现研究活动显示功能：

1. 创建可折叠面板，显示研究活动和来源
2. 使用选项卡区分活动和来源
3. 为不同活动状态（完成/进行中/错误）显示不同的指示器
4. 显示活动的时间戳
5. 为来源提供链接

确保组件能够清晰地展示研究进度，并允许用户查看详细信息。
```

**验证方法：**

- 测试折叠功能是否正常工作
- 验证活动和来源是否正确显示
- 检查状态指示器是否正确反映活动状态
- 测试来源链接是否正常工作

#### 3.5 实现 UI 组件 - ResearchReport

**提示词：**

```
请创建src/components/ui/deep-research/ResearchReport.tsx组件，实现研究报告显示功能：

1. 使用react-markdown渲染Markdown格式的报告
2. 配置语法高亮（使用react-syntax-highlighter）
3. 实现报告下载功能
4. 显示加载状态
5. 添加适当的样式和布局

确保组件能够优雅地展示研究报告，并提供良好的阅读体验。
```

**验证方法：**

- 测试 Markdown 渲染是否正确
- 验证语法高亮是否有效
- 检查下载功能是否正常工作
- 测试不同内容长度下的 UI 表现

#### 3.6 实现 UI 组件 - CompletedQuestions

**提示词：**

```
请创建src/components/ui/deep-research/CompletedQuestions.tsx组件，实现已完成问题显示功能：

1. 使用嵌套的Accordion组件展示问题和答案
2. 只在所有问题回答完毕后显示
3. 提供可折叠界面，节省空间
4. 添加适当的样式和布局

确保组件能够清晰地展示用户回答的所有问题和答案。
```

**验证方法：**

- 测试折叠功能是否正常工作
- 验证问题和答案是否正确显示
- 检查组件只在适当的时候显示

#### 3.7 实现 UI 组件 - ResearchTimer

**提示词：**

```
请创建src/components/ui/deep-research/ResearchTimer.tsx组件，实现研究计时器功能：

1. 使用useState和useEffect实现计时器
2. 在研究开始时启动计时
3. 在研究完成时停止计时
4. 格式化显示时间（秒/分钟）
5. 添加适当的样式

确保组件能够准确地显示研究进行的时间。
```

**验证方法：**

- 测试计时器是否在适当的时候启动和停止
- 验证时间格式化是否正确
- 检查长时间运行下计时器的准确性

#### 3.8 实现 UI 组件 - QnA

**提示词：**

```
请创建src/components/ui/deep-research/QnA.tsx组件，实现问答和研究流程管理功能：

1. 使用useChat钩子与后端API交互
2. 处理流式响应，更新活动、来源和报告状态
3. 在所有问题回答完毕后触发研究流程
4. 管理其他组件的显示（QuestionForm、CompletedQuestions等）
5. 处理加载状态和错误

这是前端的核心协调组件，负责将用户输入传递给后端并处理响应。
```

**验证方法：**

- 测试与后端 API 的交互是否正常
- 验证流式响应处理是否正确
- 检查状态更新和组件显示逻辑
- 测试错误场景下的表现

#### 3.9 实现主页面

**提示词：**

```
请更新src/app/page.tsx文件，实现主页面布局：

1. 添加标题和描述
2. 集成UserInput和QnA组件
3. 添加背景和样式
4. 确保页面在不同屏幕尺寸下具有响应性

这是用户与应用交互的主要入口点。
```

**验证方法：**

- 测试页面在各种设备上的响应性
- 验证组件集成是否正确
- 检查整体视觉效果和用户体验

### 4. 集成与测试

#### 4.1 整合前后端

**提示词：**

```
现在我们已经实现了所有必要的组件，请确保前后端正确集成：

1. 检查API路由是否正确配置
2. 验证前端组件是否正确调用API
3. 测试数据流是否在各组件间正确传递
4. 确保环境变量在开发和生产环境中都能正确加载

列出可能的集成问题和解决方案。
```

**验证方法：**

- 进行端到端测试，模拟完整的用户流程
- 验证数据在系统各部分之间的一致性
- 检查 API 调用和响应处理

#### 4.2 优化与调试

**提示词：**

```
请提供优化和调试指南，包括：

1. 性能优化建议（如减少不必要的渲染）
2. 常见错误和解决方案
3. 用于调试的日志策略
4. 改进模型提示词的建议
5. 处理API限制和错误的策略

这些指南将帮助开发者在系统运行过程中识别和解决问题。
```

**验证方法：**

- 使用性能分析工具测试优化效果
- 验证错误处理策略是否有效
- 测试系统在各种负载下的表现

## 项目运行和验证

**提示词：**

```
现在，请提供运行和验证整个项目的指南：

1. 启动开发服务器的步骤
2. 测试研究流程的示例主题
3. 验证系统各部分是否正常工作的检查表
4. 常见问题和故障排除步骤

同时，请说明如何监控系统性能和资源使用情况。
```

**验证方法：**

- 按照指南运行项目
- 使用示例主题进行测试
- 检查所有功能是否按预期工作
- 监控系统资源使用情况

## 总结

这个项目复现指南将帮助开发者逐步构建 Deep Research AI Agent 系统。每个任务都有明确的提示词指导 LLM 生成代码，以及验证方法确保任务正确完成。通过遵循这个指南，开发者可以构建一个功能完整的研究助手系统，能够执行深度研究并生成全面的研究报告。
