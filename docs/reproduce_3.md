# Deep Research AI Agent 项目复现指南

本文档详细拆解了如何从零开始复现 Deep Research AI Agent 项目的过程，每个步骤都包含了具体的提示词和测试方法。通过按顺序完成这些步骤，可以构建一个功能完整的 AI 驱动研究助手系统。

## 目录

1. [项目初始化](#1-项目初始化)
2. [环境配置](#2-环境配置)
3. [前端基础结构](#3-前端基础结构)
4. [Zustand 状态管理](#4-zustand状态管理)
5. [UI 组件实现](#5-ui组件实现)
6. [API 路由实现](#6-api路由实现)
7. [研究引擎核心逻辑](#7-研究引擎核心逻辑)
8. [模型调用与提示词设计](#8-模型调用与提示词设计)
9. [搜索功能实现](#9-搜索功能实现)
10. [流式响应集成](#10-流式响应集成)
11. [活动跟踪实现](#11-活动跟踪实现)
12. [完整项目测试](#12-完整项目测试)

## 1. 项目初始化

### 任务描述

创建一个新的 Next.js 项目，配置项目所需的基础依赖和文件结构。

### 提示词

```
请帮我创建一个名为"deep-research-ai-agent"的新Next.js项目，使用App Router和TypeScript。

1. 初始化项目:
   - 使用create-next-app初始化项目
   - 确保启用TypeScript、ESLint和App Router
   - 配置Tailwind CSS
   - 设置项目的基本目录结构

2. 安装核心依赖:
   - 添加Vercel AI SDK: @ai-sdk/react ai openai
   - 添加Zustand状态管理: zustand
   - 添加UI库: @radix-ui/react-* shadcn/ui
   - 添加表单处理: react-hook-form @hookform/resolvers zod
   - 添加Markdown渲染: react-markdown remark-gfm
   - 添加语法高亮: react-syntax-highlighter
   - 添加日期处理: date-fns

请提供完整的命令和步骤，以及如何验证项目设置是否正确。
```

### 测试方法

1. 验证项目结构:

```bash
ls -la
```

确认生成了正确的目录结构（src/app, src/components 等）

2. 验证依赖安装:

```bash
npm list --depth=0
```

检查是否所有必需的依赖都已正确安装

3. 验证开发服务器:

```bash
npm run dev
```

确认开发服务器正常启动，并能在浏览器中访问 http://localhost:3000

## 2. 环境配置

### 任务描述

创建环境变量配置文件，设置必要的 API 密钥和服务配置。

### 提示词

```
请帮我配置Deep Research AI Agent项目的环境变量。我们需要使用OpenRouter API和Exa Search API来实现AI研究功能。

1. 创建环境变量配置:
   - 创建.env.example文件，列出所有需要的环境变量
   - 创建.env.local文件（确保它在.gitignore中）用于本地开发

2. 配置以下环境变量:
   - OPENROUTER_API_KEY: 用于访问多种LLM模型
   - EXA_SEARCH_API_KEY: 用于执行网络搜索

3. 更新.gitignore确保敏感信息不会被提交:
   - 添加.env.local和其他包含敏感信息的文件

请提供.env.example文件的示例内容和如何获取这些API密钥的简要指导。
```

### 测试方法

1. 验证环境变量文件:

```bash
cat .env.example
```

确认环境变量文件包含所有必需的变量

2. 验证.gitignore 配置:

```bash
cat .gitignore | grep .env
```

确认.env.local 已被添加到.gitignore

## 3. 前端基础结构

### 任务描述

创建前端的基础页面结构和样式设置。

### 提示词

```
请帮我创建Deep Research AI Agent项目的前端基础结构。我需要设置主页面、全局样式和基本UI组件。

1. 创建主页面:
   - 在src/app/page.tsx中创建应用的主页面
   - 添加页面标题和简短描述
   - 预留用户输入和问答区域的位置

2. 设置全局样式:
   - 配置tailwind.config.js添加自定义颜色和主题
   - 更新src/app/globals.css设置基础样式
   - 添加必要的字体和样式变量

3. 设置基础UI组件:
   - 使用shadcn/ui安装常用组件(card, button, input, textarea)
   - 创建组件文件夹结构(src/components/ui/)

请提供完整的代码示例和目录结构，确保页面有一个简洁现代的设计。
```

### 测试方法

1. 视觉检查:

   - 运行`npm run dev`并打开浏览器
   - 验证主页面是否正确显示标题和描述
   - 确认样式是否按期望应用

2. 验证组件结构:

```bash
ls -la src/components/ui/
```

确认基础 UI 组件文件已创建

3. 检查响应式设计:
   - 使用浏览器开发工具调整窗口大小
   - 确认页面在不同屏幕尺寸下正确响应

## 4. Zustand 状态管理

### 任务描述

实现使用 Zustand 的全局状态管理系统，用于跟踪研究过程中的各种状态。

### 提示词

```
请帮我实现Deep Research AI Agent项目的状态管理逻辑，使用Zustand库。我们需要一个全局状态来管理研究流程的各个方面。

1. 创建Zustand存储:
   - 在src/store/deepResearch.ts中创建Zustand存储
   - 定义以下状态界面:
     * 研究主题(topic)
     * 问题列表(questions)
     * 答案列表(answers)
     * 当前问题索引(currentQuestion)
     * 完成状态(isCompleted)
     * 加载状态(isLoading)
     * 研究活动(activities)
     * 信息来源(sources)
     * 研究报告(report)

2. 实现状态操作方法:
   - 为每个状态添加setter方法
   - 设置初始状态值

3. 导出store hook:
   - 创建并导出useDeepResearchStore钩子
   - 确保类型安全的状态访问

请提供完整的代码实现，包括TypeScript类型定义和所有必要的状态操作方法。
```

### 测试方法

1. 单元测试 (创建 src/store/**tests**/deepResearch.test.ts):

```javascript
import { renderHook, act } from "@testing-library/react-hooks";
import { useDeepResearchStore } from "../deepResearch";

describe("deepResearch store", () => {
  beforeEach(() => {
    act(() => {
      useDeepResearchStore.setState({
        topic: "",
        questions: [],
        answers: [],
        currentQuestion: 0,
        isCompleted: false,
        isLoading: false,
        activities: [],
        sources: [],
        report: "",
      });
    });
  });

  test("should update topic", () => {
    const { result } = renderHook(() => useDeepResearchStore());

    act(() => {
      result.current.setTopic("Artificial Intelligence");
    });

    expect(result.current.topic).toBe("Artificial Intelligence");
  });

  test("should update questions", () => {
    const { result } = renderHook(() => useDeepResearchStore());
    const testQuestions = ["Question 1", "Question 2"];

    act(() => {
      result.current.setQuestions(testQuestions);
    });

    expect(result.current.questions).toEqual(testQuestions);
  });

  // 添加更多测试以覆盖其他状态操作
});
```

2. 执行测试:

```bash
npm test src/store/__tests__/deepResearch.test.ts
```

3. 验证状态在组件中的可用性:
   创建一个简单的测试组件，导入并使用 store，验证状态更新能够正确反映在 UI 中

## 5. UI 组件实现

### 任务描述

实现项目所需的所有 UI 组件，包括用户输入、问题表单、研究活动显示和报告渲染组件。

### 提示词

```
请帮我实现Deep Research AI Agent项目的前端UI组件。我需要创建以下核心组件来实现完整的用户界面。

1. 用户输入组件(UserInput.tsx):
   - 创建一个表单，允许用户输入研究主题
   - 使用react-hook-form进行表单验证
   - 提交时发送请求到/api/generate-questions
   - 将响应中的问题和主题保存到Zustand存储

2. 问题表单组件(QuestionForm.tsx):
   - 显示当前问题并收集用户回答
   - 实现上一题/下一题导航
   - 提供完成百分比进度指示器
   - 最后一个问题提交后标记为完成

3. 研究活动组件(ResearchActivities.tsx):
   - 创建一个可折叠面板显示研究活动
   - 以标签形式显示活动和源链接
   - 按状态(完成/进行中/错误)显示活动
   - 提供时间戳和活动描述

4. 研究报告组件(ResearchReport.tsx):
   - 使用react-markdown渲染Markdown格式的报告
   - 实现代码块语法高亮
   - 添加下载按钮允许保存报告
   - 在研究完成前显示加载状态

5. 其他辅助组件:
   - CompletedQuestions.tsx: 显示所有已回答的问题
   - ResearchTimer.tsx: 显示研究进行的时间

请为每个组件提供完整的代码实现，包括样式、事件处理和与Zustand存储的集成。
```

### 测试方法

1. 组件渲染测试:
   创建`src/components/ui/deep-research/__tests__/`目录，为每个组件添加基本的渲染测试:

```javascript
// UserInput.test.tsx示例
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserInput from "../UserInput";

// 模拟Zustand存储
jest.mock("@/store/deepResearch", () => ({
  useDeepResearchStore: () => ({
    setQuestions: jest.fn(),
    setTopic: jest.fn(),
  }),
}));

describe("UserInput Component", () => {
  test("renders input field and submit button", () => {
    render(<UserInput />);

    expect(
      screen.getByPlaceholderText("Enter your research topic")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  // 添加更多测试用例...
});
```

2. 交互测试:

   - 使用`@testing-library/user-event`模拟用户交互
   - 验证表单提交、导航和状态更新

3. 视觉检查:
   - 运行开发服务器并手动检查每个组件的外观和行为
   - 确认组件在不同状态下的正确显示（加载中、完成、错误等）

## 6. API 路由实现

### 任务描述

实现项目所需的 API 路由，包括问题生成和深度研究端点。

### 提示词

```
请帮我实现Deep Research AI Agent项目的API路由。我们需要两个主要的API端点来处理问题生成和深度研究流程。

1. 问题生成API:
   - 创建src/app/api/generate-questions/route.ts
   - 实现POST处理程序接收研究主题
   - 调用AI模型生成相关问题(使用OpenRouter API)
   - 返回问题数组作为JSON响应

2. 深度研究API:
   - 创建src/app/api/deep-research/route.ts
   - 实现POST处理程序接收主题和问题回答
   - 使用Vercel AI SDK的createDataStreamResponse创建流式响应
   - 解析输入数据并初始化研究状态
   - 调用deepResearch函数启动研究流程
   - 处理可能的错误并返回适当响应

3. 类型定义:
   - 创建src/app/api/deep-research/types.ts
   - 定义ResearchState、Activity、Source等接口
   - 确保类型安全的API处理

请提供完整的代码实现，并确保正确处理错误情况和边缘情况。
```

### 测试方法

1. API 端点测试:
   使用`curl`或 Postman 测试 API 端点:

```bash
# 测试问题生成API
curl -X POST http://localhost:3000/api/generate-questions \
  -H "Content-Type: application/json" \
  -d '{"topic":"Artificial Intelligence"}'

# 测试研究API(需要有效的消息格式)
curl -X POST http://localhost:3000/api/deep-research \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"{\"topic\":\"Artificial Intelligence\",\"clerifications\":[{\"question\":\"What specific aspects of AI are you interested in?\",\"answer\":\"Machine learning and neural networks\"}]}"}]}'
```

2. 集成测试:
   创建`src/app/api/__tests__/`目录，添加 API 路由的集成测试:

```javascript
// generate-questions.test.ts 示例
import { NextRequest } from "next/server";
import { POST } from "../generate-questions/route";

// 模拟OpenRouter API调用
jest.mock("ai", () => ({
  generateText: jest.fn().mockResolvedValue({
    text: "Question 1\nQuestion 2\nQuestion 3",
    usage: { totalTokens: 100 },
  }),
}));

describe("Generate Questions API", () => {
  test("returns questions array for valid topic", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/generate-questions",
      {
        method: "POST",
        body: JSON.stringify({ topic: "Artificial Intelligence" }),
      }
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  // 添加更多测试用例...
});
```

3. 手动端到端测试:
   - 使用前端 UI 提交主题并验证问题生成
   - 回答所有问题并确认研究流程启动
   - 验证活动更新和报告生成

## 7. 研究引擎核心逻辑

### 任务描述

实现深度研究引擎的核心逻辑，这是整个系统的中心部分，负责协调研究流程。

### 提示词

```
请帮我实现Deep Research AI Agent项目的核心研究引擎。这是项目的核心部分，负责协调整个研究流程。

1. 主研究流程(main.ts):
   - 创建src/app/api/deep-research/main.ts
   - 实现deepResearch函数，接收researchState和dataStream参数
   - 创建迭代研究循环，最多执行MAX_ITERATIONS次
   - 协调搜索、处理、分析和报告生成过程
   - 使用dataStream向前端发送实时更新

2. 常量定义(constants.ts):
   - 创建src/app/api/deep-research/constants.ts
   - 定义MAX_ITERATIONS、MAX_SEARCH_RESULTS等常量
   - 配置不同任务使用的模型（PLANNING、EXTRACTION、ANALYSIS、REPORT）

3. 工具函数(utils.ts):
   - 创建src/app/api/deep-research/utils.ts
   - 实现combineFindings合并研究发现
   - 实现handleError处理各种错误情况
   - 添加其他辅助函数如delay

4. 服务配置(services.ts):
   - 创建src/app/api/deep-research/services.ts
   - 配置OpenRouter和Exa Search API客户端
   - 导出服务实例供其他模块使用

请提供完整的代码实现，确保合理处理异步操作和错误情况。
```

### 测试方法

1. 单元测试 utils.ts:
   创建`src/app/api/deep-research/__tests__/utils.test.ts`:

```javascript
import { combineFindings, handleError, delay } from "../utils";

describe("Utils functions", () => {
  test("combineFindings should merge multiple findings into one text", () => {
    const findings = [
      { summary: "Finding 1", source: "source1" },
      { summary: "Finding 2", source: "source2" },
    ];

    const result = combineFindings(findings);

    expect(result).toContain("Finding 1");
    expect(result).toContain("Finding 2");
    expect(result).toContain("source1");
    expect(result).toContain("source2");
  });

  test("delay should resolve after specified time", async () => {
    const start = Date.now();
    await delay(100);
    const duration = Date.now() - start;

    expect(duration).toBeGreaterThanOrEqual(100);
  });

  // 添加更多测试...
});
```

2. 集成测试 main.ts:
   创建一个简化的测试用例，验证研究流程的基本功能:

```javascript
import { deepResearch } from "../main";
import { ResearchState } from "../types";

// 模拟依赖函数
jest.mock("../research-functions", () => ({
  generateSearchQueries: jest
    .fn()
    .mockResolvedValue({ searchQueries: ["test query"] }),
  search: jest
    .fn()
    .mockResolvedValue([
      { title: "Test", url: "http://test.com", content: "Test content" },
    ]),
  processSearchResults: jest
    .fn()
    .mockResolvedValue([
      { summary: "Test summary", source: "http://test.com" },
    ]),
  analyzeFindings: jest
    .fn()
    .mockResolvedValue({ sufficient: true, gaps: [], queries: [] }),
  generateReport: jest.fn().mockResolvedValue("Test report"),
}));

describe("Deep Research Main Flow", () => {
  test("should complete research process and generate report", async () => {
    // 设置模拟数据流和研究状态
    const mockDataStream = { writeData: jest.fn() };
    const researchState: ResearchState = {
      topic: "Test Topic",
      completedSteps: 0,
      tokenUsed: 0,
      findings: [],
      processedUrl: new Set(),
      clerificationsText: "[]",
    };

    // 执行研究流程
    await deepResearch(researchState, mockDataStream);

    // 验证结果
    expect(researchState.findings.length).toBeGreaterThan(0);
    expect(mockDataStream.writeData).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "report",
      })
    );
  });
});
```

3. 手动功能测试:
   - 使用浏览器控制台查看研究流程中的日志输出
   - 监控前端接收到的活动流
   - 检查最终报告内容和质量

## 8. 模型调用与提示词设计

### 任务描述

实现与 AI 模型的交互逻辑，以及设计适合不同任务的提示词模板。

### 提示词

```
请帮我实现Deep Research AI Agent项目的模型调用和提示词部分。这部分负责与LLM模型的交互，指导模型执行不同的研究任务。

1. 模型调用(model-caller.ts):
   - 创建src/app/api/deep-research/model-caller.ts
   - 实现callModel函数，支持结构化输出和文本生成
   - 添加重试机制处理临时性错误
   - 跟踪令牌使用和完成步骤

2. 提示词模板(prompts.ts):
   - 创建src/app/api/deep-research/prompts.ts
   - 实现以下系统提示词:
     * EXTRACTION_SYSTEM_PROMPT: 指导模型从搜索结果中提取信息
     * ANALYSIS_SYSTEM_PROMPT: 指导模型分析当前发现并决定后续步骤
     * PLANNING_SYSTEM_PROMPT: 指导模型生成有效的搜索查询
     * REPORT_SYSTEM_PROMPT: 指导模型生成综合研究报告

   - 实现相应的用户提示词生成函数:
     * getExtractionPrompt
     * getAnalysisPrompt
     * getPlanningPrompt
     * getReportPrompt

3. 研究功能(research-functions.ts):
   - 创建src/app/api/deep-research/research-functions.ts
   - 实现研究的核心功能函数:
     * generateSearchQueries: 生成搜索查询
     * extractContent: 从搜索结果中提取相关内容
     * analyzeFindings: 分析当前发现并决定下一步
     * generateReport: 生成最终研究报告

请提供完整的代码实现，特别是精心设计的提示词，以确保模型输出的质量和一致性。
```

### 测试方法

1. 单元测试 model-caller.ts:

```javascript
import { callModel } from "../model-caller";
import { z } from "zod";

// 模拟ai库
jest.mock("ai", () => ({
  generateObject: jest.fn().mockResolvedValue({
    object: { result: "test" },
    usage: { totalTokens: 100 },
  }),
  generateText: jest.fn().mockResolvedValue({
    text: "test text",
    usage: { totalTokens: 50 },
  }),
}));

describe("Model Caller", () => {
  test("should call generateObject with schema", async () => {
    const mockState = { tokenUsed: 0, completedSteps: 0 };
    const mockTracker = { add: jest.fn() };

    const result = await callModel(
      {
        model: "test-model",
        prompt: "test prompt",
        system: "test system",
        schema: z.object({ result: z.string() }),
        activityType: "test",
      },
      mockState,
      mockTracker
    );

    expect(result).toEqual({ result: "test" });
    expect(mockState.tokenUsed).toBe(100);
    expect(mockState.completedSteps).toBe(1);
  });

  // 添加更多测试...
});
```

2. 提示词模板测试:
   创建一个简单的脚本来测试提示词模板生成的输出:

```javascript
import {
  EXTRACTION_SYSTEM_PROMPT,
  getExtractionPrompt,
  // 导入其他提示词
} from "../prompts";

// 测试用例
const testCases = [
  {
    name: "Extraction Prompt",
    system: EXTRACTION_SYSTEM_PROMPT,
    user: getExtractionPrompt(
      "Sample content about AI technology",
      "Artificial Intelligence",
      JSON.stringify([
        { question: "What is AI?", answer: "Advanced computing" },
      ])
    ),
  },
  // 添加其他测试用例
];

// 输出测试结果
testCases.forEach((test) => {
  console.log(`--- ${test.name} ---`);
  console.log("System prompt:", test.system.substring(0, 100) + "...");
  console.log("User prompt:", test.user);
  console.log("---");
});
```

3. 集成测试 research-functions.ts:
   为每个关键研究功能创建测试用例:

```javascript
import {
  generateSearchQueries,
  extractContent,
  analyzeFindings,
  generateReport,
} from "../research-functions";

// 模拟依赖
jest.mock("../model-caller", () => ({
  callModel: jest.fn().mockImplementation((options) => {
    if (options.schema) {
      if (options.activityType === "planning") {
        return Promise.resolve({ searchQueries: ["test query"] });
      } else if (options.activityType === "analyze") {
        return Promise.resolve({ sufficient: true, gaps: [], queries: [] });
      }
    }
    return Promise.resolve("Test output");
  }),
}));

describe("Research Functions", () => {
  test("generateSearchQueries should return search queries", async () => {
    const mockState = { topic: "AI", clerificationsText: "[]" };
    const mockTracker = { add: jest.fn() };

    const result = await generateSearchQueries(mockState, mockTracker);

    expect(result).toHaveProperty("searchQueries");
    expect(Array.isArray(result.searchQueries)).toBe(true);
  });

  // 添加更多测试...
});
```

4. 手动测试:
   - 通过浏览器使用项目并观察模型输出
   - 检查不同任务的输出质量(搜索查询、提取的信息、报告等)
   - 验证提示词是否成功引导模型执行预期任务

## 9. 搜索功能实现

### 任务描述

实现与 Exa Search API 的集成，用于执行网络搜索并获取研究材料。

### 提示词

```
请帮我实现Deep Research AI Agent项目的搜索功能。我们需要集成Exa Search API来执行网络搜索，获取研究主题的相关信息。

1. 实现search函数:
   - 在research-functions.ts中完善search函数
   - 使用Exa API执行网络搜索
   - 设置适当的搜索参数(结果数量、发布日期范围等)
   - 过滤和格式化搜索结果

2. 处理搜索结果:
   - 实现processSearchResults函数处理搜索结果
   - 并行处理多个搜索结果
   - 使用extractContent从每个结果中提取相关信息
   - 处理可能的API错误和超时

3. 实现URL去重机制:
   - 使用ResearchState中的processedUrl集合
   - 确保不重复处理同一个URL
   - 优化搜索效率

请提供完整的代码实现，并确保良好的错误处理和性能优化。
```

### 测试方法

1. 集成测试 search 函数:

```javascript
import { search } from "../research-functions";
import { exa } from "../services";

// 模拟Exa API
jest.mock("../services", () => ({
  exa: {
    searchAndContents: jest.fn().mockResolvedValue({
      results: [
        {
          title: "Test Result",
          url: "https://test.com",
          text: "Sample content",
        },
        {
          title: "Another Result",
          url: "https://example.com",
          text: "More content",
        },
      ],
    }),
  },
}));

describe("Search Function", () => {
  test("should return formatted search results", async () => {
    const mockState = { completedSteps: 0, processedUrl: new Set() };
    const mockTracker = { add: jest.fn() };

    const results = await search("test query", mockState, mockTracker);

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty("title");
    expect(results[0]).toHaveProperty("url");
    expect(results[0]).toHaveProperty("content");
    expect(mockState.completedSteps).toBe(1);
  });

  test("should handle API errors", async () => {
    // 模拟API错误
    exa.searchAndContents.mockRejectedValueOnce(new Error("API Error"));

    const mockState = { completedSteps: 0, processedUrl: new Set() };
    const mockTracker = { add: jest.fn() };

    const results = await search("error query", mockState, mockTracker);

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(0);
    expect(mockTracker.add).toHaveBeenCalledWith(
      "search",
      "error",
      expect.any(String)
    );
  });
});
```

2. API 密钥验证测试:
   创建一个脚本测试 Exa API 密钥是否有效:

```javascript
// scripts/test-exa-api.js
const { Exa } = require("exa-js");

const apiKey = process.env.EXA_SEARCH_API_KEY;
if (!apiKey) {
  console.error("EXA_SEARCH_API_KEY is not set");
  process.exit(1);
}

const exa = new Exa(apiKey);

async function testSearch() {
  try {
    const result = await exa.searchAndContents("test query", { numResults: 1 });
    console.log("API test successful!");
    console.log("Sample result:", result.results[0]?.title);
  } catch (error) {
    console.error("API test failed:", error.message);
  }
}

testSearch();
```

执行测试:

```bash
node scripts/test-exa-api.js
```

3. 手动测试:
   - 通过前端 UI 启动研究过程
   - 检查活动日志中的搜索结果数量
   - 验证提取的信息质量
   - 确认最终报告包含多种来源的信息

## 10. 流式响应集成

### 任务描述

实现基于 Vercel AI SDK 的流式响应功能，用于向前端实时发送研究活动和结果。

### 提示词

```
请帮我实现Deep Research AI Agent项目的流式响应功能。我们需要使用Vercel AI SDK的流式响应能力，实时向前端发送研究进度和结果。

1. 配置API路由流式响应:
   - 在route.ts中使用createDataStreamResponse
   - 设置执行函数接收dataStream对象
   - 将dataStream传递给deepResearch函数

2. 活动跟踪器流式更新:
   - 确保活动跟踪器使用dataStream.writeData发送更新
   - 格式化活动数据以便前端处理
   - 在各个研究步骤中添加适当的活动更新

3. 报告流式传输:
   - 研究完成后通过流发送最终报告
   - 设置适当的报告格式以便前端渲染

4. 前端流处理:
   - 在QnA组件中使用useChat hook处理流式数据
   - 从流数据中提取活动、来源和报告
   - 更新Zustand存储以反映最新状态

请提供完整的代码实现，确保前后端之间的无缝集成和良好的用户体验。
```

### 测试方法

1. API 端点流式响应测试:
   使用 fetch API 测试流式响应:

```javascript
// scripts/test-streaming.js
async function testStreaming() {
  try {
    const response = await fetch("http://localhost:3000/api/deep-research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: JSON.stringify({
              topic: "Artificial Intelligence",
              clerifications: [
                {
                  question: "What aspects interest you?",
                  answer: "Machine learning",
                },
              ],
            }),
          },
        ],
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      console.log("Received chunk:", chunk);
    }

    console.log("Stream complete");
  } catch (error) {
    console.error("Streaming test failed:", error);
  }
}

testStreaming();
```

2. 前端流处理测试:
   创建一个简化的测试组件，验证 useChat 钩子能够正确处理流式响应:

```javascript
import { useChat } from "@ai-sdk/react";

function TestComponent() {
  const { messages, append, data } = useChat({
    api: "/api/deep-research",
  });

  useEffect(() => {
    // 查看接收到的数据
    console.log("Received data:", data);
  }, [data]);

  const startTest = () => {
    append({
      role: "user",
      content: JSON.stringify({
        topic: "Test Topic",
        clerifications: [{ question: "Test?", answer: "Test answer" }],
      }),
    });
  };

  return (
    <div>
      <button onClick={startTest}>Start Test</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

3. 端到端测试:
   - 运行完整的应用程序
   - 提交研究主题并回答问题
   - 监控网络请求和响应流
   - 验证前端 UI 实时更新研究活动和进度

## 11. 活动跟踪实现

### 任务描述

实现活动跟踪器，用于记录和报告研究过程中的各项活动。

### 提示词

```
请帮我实现Deep Research AI Agent项目的活动跟踪功能。我们需要一个跟踪器记录研究过程中的各项活动，并将其发送给前端显示。

1. 活动跟踪器:
   - 创建src/app/api/deep-research/activity-tracker.ts
   - 实现createActivityTracker工厂函数
   - 添加add方法记录新活动
   - 使用dataStream发送活动到前端

2. 活动类型与状态:
   - 在types.ts中定义Activity接口
   - 设置不同的活动类型(planning, search, extract, analyze, generate)
   - 定义活动状态(pending, complete, warning, error)

3. 研究活动集成:
   - 在各个研究功能中添加活动跟踪调用
   - 确保适当报告开始、进行和完成状态
   - 添加时间戳和描述性消息

请提供完整的代码实现，确保活动跟踪清晰、实时并提供有用的进度信息。
```

### 测试方法

1. 单元测试活动跟踪器:

```javascript
import { createActivityTracker } from "../activity-tracker";

describe("Activity Tracker", () => {
  test("should add activity and write to data stream", () => {
    const mockDataStream = { writeData: jest.fn() };
    const mockState = {};

    const tracker = createActivityTracker(mockDataStream, mockState);

    tracker.add("test", "pending", "Test activity");

    expect(mockDataStream.writeData).toHaveBeenCalledWith({
      type: "activity",
      content: expect.objectContaining({
        type: "test",
        status: "pending",
        message: "Test activity",
        timestamp: expect.any(Date),
      }),
    });
  });
});
```

2. 集成测试:
   创建一个简化的测试脚本，模拟完整研究流程并验证活动跟踪:

```javascript
import { createActivityTracker } from "../activity-tracker";
import { deepResearch } from "../main";

// 模拟研究函数
jest.mock("../research-functions", () => ({
  generateSearchQueries: jest.fn(async (state, tracker) => {
    tracker.add("planning", "pending", "Planning research");
    await new Promise((r) => setTimeout(r, 100));
    tracker.add("planning", "complete", "Planned research");
    return { searchQueries: ["test query"] };
  }),
  // 模拟其他函数...
}));

describe("Activity Tracking in Research Flow", () => {
  test("should track activities throughout research process", async () => {
    const activities = [];
    const mockDataStream = {
      writeData: (data) => {
        if (data.type === "activity") {
          activities.push(data.content);
        }
      },
    };

    const researchState = {
      topic: "Test",
      completedSteps: 0,
      tokenUsed: 0,
      findings: [],
      processedUrl: new Set(),
      clerificationsText: "[]",
    };

    await deepResearch(researchState, mockDataStream);

    // 验证活动跟踪
    expect(activities.length).toBeGreaterThan(0);
    expect(
      activities.find((a) => a.type === "planning" && a.status === "complete")
    ).toBeTruthy();
    // 检查更多活动类型...
  });
});
```

3. 前端显示测试:
   - 运行应用并启动研究流程
   - 检查 ResearchActivities 组件是否正确显示活动
   - 验证活动状态(完成/进行中/错误)是否正确显示
   - 确认时间戳和描述正确

## 12. 完整项目测试

### 任务描述

执行完整项目的端到端测试，确保所有组件正常工作并协同运行。

### 提示词

```
请帮我为Deep Research AI Agent项目创建完整的测试计划。我需要确保整个系统从前端到后端都能正常工作，所有组件能够协同运行。

1. 端到端测试流程:
   - 制定测试用例涵盖完整的用户流程
   - 从输入主题到生成报告的全过程测试
   - 验证各种边缘情况和错误处理

2. 性能测试:
   - 测试并优化长时间运行的研究过程
   - 确保流式响应正常工作
   - 检查资源使用和可能的内存泄漏

3. 响应式设计测试:
   - 验证界面在不同设备和屏幕尺寸下的表现
   - 测试移动设备上的用户体验

4. 创建测试文档:
   - 记录测试用例和预期结果
   - 提供手动测试指南
   - 添加自动化测试脚本

请提供全面的测试计划，包括测试用例、测试脚本和指南。
```

### 测试方法

1. 创建端到端测试脚本:
   使用 Playwright 或 Cypress 自动化端到端测试流程:

```javascript
// e2e/research-flow.spec.js (使用Playwright)
import { test, expect } from "@playwright/test";

test("complete research flow", async ({ page }) => {
  // 访问应用
  await page.goto("http://localhost:3000");

  // 输入研究主题
  await page.fill(
    'input[placeholder="Enter your research topic"]',
    "Artificial Intelligence"
  );
  await page.click('button[type="submit"]');

  // 等待并回答问题
  await page.waitForSelector('form:has-text("Question 1")');
  await page.fill("textarea", "Machine learning and neural networks");
  await page.click('button:has-text("Next")');

  // 回答所有问题
  while ((await page.$('button:has-text("Next")')) !== null) {
    await page.fill("textarea", "This is my answer to the question");
    await page.click('button:has-text("Next")');
  }

  // 提交最后一个问题
  await page.fill("textarea", "This is my final answer");
  await page.click('button:has-text("Start Research")');

  // 等待研究完成
  await page.waitForSelector('div:has-text("Research Report")', {
    timeout: 120000,
  });

  // 验证结果
  expect(await page.isVisible('button:has-text("Download")')).toBeTruthy();
  expect(await page.textContent("div.prose")).toContain(
    "Artificial Intelligence"
  );
});
```

2. 手动测试清单:
   创建一个测试清单，包括以下测试案例:

```
# 手动测试清单

## 基本功能测试
- [ ] 输入研究主题并提交
- [ ] 回答所有生成的问题
- [ ] 观察研究活动实时更新
- [ ] 查看最终研究报告
- [ ] 下载报告为Markdown文件

## 错误处理测试
- [ ] 空主题提交
- [ ] 网络连接中断
- [ ] API密钥无效
- [ ] 搜索结果为空

## 响应式设计测试
- [ ] 桌面浏览器(>1200px)
- [ ] 平板设备(768px-1024px)
- [ ] 移动设备(<480px)

## 性能测试
- [ ] 长主题(>100字符)
- [ ] 多轮迭代研究(>2轮)
- [ ] 长时间研究(>2分钟)
```

3. 部署前检查清单:

```
# 部署前检查清单

## 环境变量
- [ ] OPENROUTER_API_KEY设置
- [ ] EXA_SEARCH_API_KEY设置
- [ ] 生产环境变量配置

## 性能优化
- [ ] 图片已优化
- [ ] JS包已分析和优化
- [ ] 缓存策略已配置

## 安全检查
- [ ] API密钥安全存储
- [ ] 无敏感信息泄露
- [ ] 错误处理不泄露实现细节

## 功能验证
- [ ] 所有核心功能在生产环境中工作
- [ ] 错误处理正常工作
- [ ] 设备兼容性已验证
```

4. 负载测试:
   - 使用 k6 或类似工具测试 API 端点在高负载下的表现
   - 模拟多用户同时使用系统
   - 确定系统可处理的并发用户数量和性能瓶颈

## 总结与最佳实践

通过按照本指南中的步骤进行操作，你现在应该拥有一个功能完整的 Deep Research AI Agent 系统。这个项目展示了如何结合现代前端技术、状态管理、AI 模型调用和网络搜索功能，创建一个复杂而实用的研究助手。

### 关键技术回顾

1. **前端架构**:

   - Next.js App Router 提供了强大的路由和服务器组件支持
   - Tailwind CSS 和 Shadcn UI 提供了美观现代的用户界面
   - Zustand 实现了简洁而高效的状态管理
   - React Hook Form 处理了表单验证和提交

2. **后端架构**:

   - Next.js API Routes 处理 HTTP 请求
   - Vercel AI SDK 提供了流式响应能力
   - 模块化设计使复杂的研究流程易于理解和维护
   - 错误处理确保了系统的健壮性

3. **AI 和搜索集成**:
   - OpenRouter API 提供了对多种 LLM 模型的访问
   - Exa Search API 提供了高质量的网络搜索结果
   - 精心设计的提示词模板引导模型生成高质量输出
   - 迭代研究流程模拟了人类研究过程

### 性能优化建议

1. **减少 API 调用**:

   - 考虑缓存常见搜索结果
   - 优化重试策略以减少不必要的 API 调用
   - 实现批处理以减少小型独立请求

2. **前端优化**:

   - 实现组件懒加载以加快初始加载
   - 优化大型报告的渲染性能
   - 考虑使用虚拟滚动显示长活动列表

3. **后端优化**:
   - 考虑实现队列系统处理长时间运行的研究任务
   - 添加结果缓存以避免重复处理
   - 实现更智能的搜索策略以提高信息质量

### 扩展建议

1. **功能扩展**:

   - 添加用户账户和研究历史
   - 实现研究模板和保存的问题集
   - 添加更多信息源(学术数据库、PDF 解析等)

2. **用户体验改进**:

   - 添加研究报告编辑功能
   - 实现更详细的进度显示
   - 添加更多可视化和信息图表

3. **部署和监控**:
   - 设置日志和监控系统
   - 实现使用分析以了解用户行为
   - 考虑将长时间运行的任务移至后台工作者

通过遵循这个指南，你已经构建了一个功能强大的 AI 研究助手，它展示了当今最前沿的 AI 技术和软件工程实践。继续实验和改进系统，你可以创建更强大、更个性化的研究工具。
