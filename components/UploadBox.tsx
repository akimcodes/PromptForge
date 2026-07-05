"use client";
import { useState } from "react";
type UploadBoxProps = {
  setGeneratedPrompt: React.Dispatch<React.SetStateAction<string>>;
};

export default function UploadBox(props: UploadBoxProps) {
  console.log(props);
  console.log(typeof props.setGeneratedPrompt);

  const [image, setImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState("");
  async function generatePrompt() {
    console.log(imageBase64.substring(0,15));
        if (!imageBase64) {
          alert("Please upload an image first!");
          return;
        }

        try {
      const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imageBase64,
        prompt:
          "Analyze this image very carefully and recreate it as an AI image generation prompt. Describe the subject, composition, camera angle, lighting, colors, background, style, lens, quality, atmosphere and every important visual detail. Return only the prompt.",
      }),
      });

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      alert("Failed to generate prompt");
      return;
    }

    props.setGeneratedPrompt(data.text);
  } catch (err) {
    console.error(err);
    alert("Failed to generate prompt");
  }
}
  return (
    <section className="flex justify-center mt-20">
      <div className="w-full max-w-2xl border-2 border-dashed border-purple-500 rounded-2xl p-10 text-center">

        <h2 className="text-3xl font-bold mb-6">
          Upload Your Image
        </h2>

        <p className="text-gray-400 mb-8">
          Drag & Drop your image here or click to browse.
        </p>

        <input
        type="file"
        accept="image/*"
        className="mb-8"
        onChange={(e) => {
          const file = e.target.files?.[0];

         if (!file) return;

        setImage(URL.createObjectURL(file));

        const reader = new FileReader();

        reader.onloadend = () => {
        const base64 = reader.result as string;

        setImageBase64(base64);
        };

        reader.readAsDataURL(file);
        }}
        />
        <br />

        {image &&(
          <img
          src={image}
          alt="Preview"
          className="mx-auto mt-6 w-80 rounded-lg border border-purple-500"
          />
        )}

        <button
          onClick={generatePrompt}
          className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg"
          >
          Generate Prompt
        </button>

      </div>
    </section>
  );
}