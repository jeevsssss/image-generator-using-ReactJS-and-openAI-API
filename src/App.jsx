import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Elon Musk petting transformers on Mars stamp design..."
  );
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`Searching for "${prompt}"...`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };

  return (
    <div className="app-main">
      <h2>Generate an Image using OpenAI API</h2>

      <div className="content-container">
        <div className="prompt-box">
          <textarea
            className="app-input"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            rows="10"
            cols="40"
          />
          <br></br>
          <button className="button" onClick={generateImage}>
            Generate an Image
          </button>
          {result.length > 0 ? (
            <img className="result-image" src={result} alt="result" />
          ) : null}
        </div>

        <div className="description-box">
          <div className="description">
            <h3>What is DALL·E?</h3>
            <p>
              DALL·E is an artificial intelligence model developed by OpenAI that can generate coherent images from textual descriptions. It has been trained on a diverse range of images and can produce impressive results based on the given prompts.
            </p>
            <h3>Example Prompts:</h3>
            <ul>
              <li>"A serene sunset over a tropical beach"</li>
              <li>"A futuristic cityscape with flying cars"</li>
              <li>"An adorable kitten playing with a ball of yarn"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
