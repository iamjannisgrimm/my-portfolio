
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY; // Correct way for Vite
console.log("OpenAI API Key:", import.meta.env.VITE_OPENAI_API_KEY); // For Vite


const API_URL = "https://api.openai.com/v1/chat/completions";

export async function getChatbotResponse(userMessage) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    return "An error occurred while getting a response.";
  }
}
