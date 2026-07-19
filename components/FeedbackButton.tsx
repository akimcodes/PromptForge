"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  async function submitFeedback() {
  if (!feedback.trim()) {
    alert("Please write your feedback.");
    return;
  }

  setLoading(true);

  const { error } = await supabase.from("feedback").insert([
    {
      message: feedback,
    },
  ]);

  setLoading(false);

  if (error) {
    alert("Something went wrong!");
    console.error(error);
    return;
  }

  alert("❤️ Thank you for your feedback!");

  setFeedback("");
  setOpen(false);
}

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full
        bg-gradient-to-r from-cyan-500 to-purple-600
        px-5 py-3 text-white shadow-xl
        hover:scale-105 transition"
      >
        <MessageCircle size={20} />
        Feedback
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="w-[90%] max-w-md rounded-3xl border border-white/20 bg-[#0f172a]/90 p-6 shadow-2xl">

            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                💬 Feedback
              </h2>

              <button onClick={() => setOpen(false)}>
                <X className="text-white" />
              </button>
            </div>

            <p className="mb-5 text-gray-300">
              Help us improve PromptForge ❤️
            </p>

            <textarea
              rows={5}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback..."
              className="w-full rounded-xl border border-white/20 bg-white/5 p-3 text-white outline-none"
            />

            <button
              onClick={submitFeedback}
              disabled={loading}
              className="mt-5 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 py-3 font-semibold text-white disabled:opacity-60"
            >
            {loading ? "Submitting..." : "Submit Feedback"}
            </button>

          </div>

        </div>
      )}
    </>
  );
}