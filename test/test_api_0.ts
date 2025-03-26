// 使用 async 函数包装请求
async function testGemini() {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-thinking-exp:free",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "What is in this image?",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    // 检查响应状态
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API 请求失败: ${response.status} ${errorText}`);
    }

    // 解析和打印响应
    const data = await response.json();
    console.log("API 响应:");
    console.log(JSON.stringify(data, null, 2));

    // 打印模型生成的消息内容
    if (data.choices && data.choices.length > 0) {
      console.log("\n模型回答:");
      console.log(data.choices[0].message.content);
    }
  } catch (error) {
    console.error("执行出错:", error);
  }
}

// 调用函数
testGemini();
