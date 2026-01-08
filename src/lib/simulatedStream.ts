export async function simulateStream(
  fullText: string,
  onChunk: (chunk: string) => void,
  speed = 25
) {
  const words = fullText.split(" ");
  let current = "";

  for (let i = 0; i < words.length; i++) {
    current += (i === 0 ? "" : " ") + words[i];
    onChunk(current);
    await new Promise((r) => setTimeout(r, speed));
  }
}
