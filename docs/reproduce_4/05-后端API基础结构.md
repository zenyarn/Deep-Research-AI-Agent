# 后端 API 基础结构

本文档将指导你实现 Deep Research AI Agent 项目的后端 API 基础结构，包括问题生成 API 和研究流程 API 的基础设置。

## 步骤概览

1. 创建问题生成 API 端点
2. 实现问题生成逻辑
3. 设置深度研究 API 基础路由
4. 创建活动跟踪器
5. 定义 API 响应结构
6. 测试 API 功能

## 详细步骤与提示词

### 1. 创建问题生成 API 端点

**提示词：**

```
请为 deep-research-ai-agent 项目创建一个问题生成API端点。这个API将接收用户输入的研究主题，并返回一系列相关问题，以收集更多信息来指导研究过程。

具体要求：
1. 创建 src/app/api/generate-questions/route.ts 文件，实现 POST 处理函数
2. 接收包含研究主题 (topic) 的 JSON 请求
3. 返回一个问题数组（暂时使用硬编码的问题，稍后我们会连接到 AI 模型）
4. 实现适当的错误处理

请提供完整的 route.ts 文件代码，包括适当的类型定义、请求解析和错误处理。
```

**测试方法：**

- 使用 Postman 或 curl 发送 POST 请求测试 API
- 确认 API 能接收主题并返回问题数组
- 测试错误情况（无效请求体等）的处理

### 2. 集成 OpenRouter 实现动态问题生成

**提示词：**

```
请更新问题生成API，使其使用 OpenRouter 集成大语言模型来动态生成与研究主题相关的问题。具体要求：

1. 使用 AI SDK 和 OpenRouter 集成
2. 创建一个针对问题生成的适当提示词
3. 使用模型生成 4-5 个与主题相关的问题
4. 确保生成的问题能帮助收集相关信息，引导研究过程
5. 处理API密钥验证和错误情况

请提供更新后的 route.ts 文件代码，包括：
- OpenRouter 集成
- 提示词设计
- 响应处理
- 错误处理机制

如果模型调用失败，应该提供一组默认问题作为后备选项。
```

**测试方法：**

- 配置环境变量，确保 API 密钥设置正确
- 使用 Postman 或 curl 测试 API，提供各种主题
- 验证生成的问题是否与主题相关
- 测试错误处理（如 API 密钥无效或模型超时）

### 3. 创建深度研究 API 路由

**提示词：**

```
请为 deep-research-ai-agent 项目创建深度研究 API 的基础路由。这个 API 将处理整个研究过程，接收用户的主题和问题答案，并生成综合研究报告。

具体要求：
1. 创建 src/app/api/deep-research/route.ts 文件
2. 使用 Vercel AI SDK 的 createDataStreamResponse 创建流式响应
3. 实现 POST 处理函数，解析请求中的主题和答案
4. 设置研究状态的初始结构
5. 准备调用深度研究主函数（稍后实现）

输入格式应为包含以下内容的 JSON：
- topic: 用户研究主题
- clerifications: 问题和答案的数组

请注意，这个阶段只需实现 API 路由的基本结构，后续我们会实现实际的研究功能。

请提供完整的路由文件代码。
```

**测试方法：**

- 确认路由文件能够正确编译
- 创建一个简单的测试脚本，发送请求验证基本解析功能
- 确保流式响应设置正确（暂不测试完整功能）

### 4. 创建活动跟踪器

**提示词：**

```
请为 deep-research-ai-agent 项目创建活动跟踪器模块。这个模块将负责记录研究过程中的各项活动，并通过流式响应实时发送给前端。

具体要求：
1. 创建 src/app/api/deep-research/activity-tracker.ts 文件
2. 实现 createActivityTracker 函数，接收数据流和研究状态
3. 实现 add 方法，记录活动并发送到数据流
4. 活动应包含以下信息：
   - 类型（如 search, extract, analyze 等）
   - 状态（pending, complete, error, warning）
   - 消息
   - 时间戳

请确保活动跟踪器能够与之前设置的流式响应系统集成，并能正确序列化活动数据。

请提供完整的活动跟踪器模块代码。
```

**测试方法：**

- 创建一个简单的测试函数，验证活动跟踪器能正确创建和记录活动
- 确认活动数据结构和格式是否正确
- 验证时间戳生成是否正确

### 5. 创建辅助工具和常量

**提示词：**

```
请为 deep-research-ai-agent 项目创建辅助工具和常量模块，这些将在整个研究过程中使用。

具体要求：
1. 创建 src/app/api/deep-research/constants.ts 文件，包含：
   - MAX_ITERATIONS: 最大研究迭代次数（设为 3）
   - MAX_SEARCH_RESULTS: 每次搜索的最大结果数（设为 5）
   - MAX_CONTENT_CHARS: 每个内容的最大字符数（设为 15000）
   - MODELS: 各个任务使用的模型配置
   - MAX_RETRY_ATTEMPTS: 模型调用最大重试次数（设为 3）
   - RETRY_DELAY_MS: 重试间隔时间（设为 1000）

2. 创建 src/app/api/deep-research/utils.ts 文件，实现以下工具函数：
   - delay: 创建延迟的 Promise
   - combineFindings: 合并研究发现为一个文本字符串
   - handleError: 统一错误处理函数

请提供这两个文件的完整代码，确保它们能被其他模块正确导入和使用。
```

**测试方法：**

- 验证常量和工具函数文件能正确编译
- 创建简单的测试函数，测试各工具函数功能
- 确认错误处理函数的逻辑是否正确

### 6. 测试 API 端点的基础功能

**提示词：**

```
请创建一组测试脚本，以验证我们已经实现的 API 端点基础功能。具体要求：

1. 创建一个测试文件 src/app/api/__tests__/api-tests.ts（或按你的项目结构进行调整）
2. 实现以下测试场景：
   - 测试问题生成 API：发送主题，验证返回问题数组
   - 测试深度研究 API 的基本解析：发送主题和问题答案，验证请求解析是否正确
   - 测试活动跟踪器：创建模拟数据流，验证活动记录功能

3. 创建一个 curl 或 Postman 测试集合，用于手动测试 API 端点

请提供测试文件的代码和手动测试的命令或步骤。注意，由于我们还没有实现完整的研究功能，这些测试主要是验证基本结构和解析功能。
```

**测试方法：**

- 运行自动化测试脚本，确认所有测试通过
- 使用提供的 curl 命令或 Postman 集合手动测试 API
- 验证错误情况处理是否正确

## 总结与下一步

完成上述步骤后，你应该已经建立了项目后端 API 的基础结构，包括问题生成 API 和深度研究 API 的路由设置，以及一系列支持模块。虽然完整的研究功能尚未实现，但这些组件为下一步实现核心研究引擎提供了良好的基础。

确保所有测试都通过后，再继续下一阶段的开发。

下一步：前往 [研究引擎核心实现](./06-研究引擎核心实现.md) 开始构建项目的核心研究功能。
