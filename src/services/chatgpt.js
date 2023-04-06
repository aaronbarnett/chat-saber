

exports.models = async (apiKey) => {
    
    const response = await fetch(
      "https://api.openai.com/v1/models",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const json = await response.json();
    console.log('chatgpt.models response:', json);

    return json;
    
};



exports.completions = async (apiKey, messages) => {
    
  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 2048,
        temperature: 0.5,
      }),
    }
  );

  const json = await response.json();
  // console.log('chatgpt.completions response:', json);

  return json;
  
};

export default exports;
