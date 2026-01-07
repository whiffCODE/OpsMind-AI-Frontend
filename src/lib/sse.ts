export const streamChat = async (
  query: string,
  onChunk: (text: string) => void,
  onSources: (sources: string[]) => void
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chat/stream`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ query }),
    }
  );

  const reader = res.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader!.read();
    if (done) break;

    const chunk = decoder.decode(value);
    if (chunk.includes("[DONE]")) break;

    const lines = chunk.split("\n").filter(Boolean);
    for (const line of lines) {
      const data = JSON.parse(line.replace("data: ", ""));
      if (data.type === "chunk") onChunk(data.text);
      if (data.type === "sources") onSources(data.sources);
    }
  }
};
