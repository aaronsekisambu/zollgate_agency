"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getPlayer } from "@/lib/data";

const field =
  "w-full rounded-xl border border-line bg-panel px-4 py-3 outline-none placeholder:text-mute focus:border-navy";

export default function ContactForm() {
  const player = getPlayer(useSearchParams().get("player") ?? "");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="grid place-items-center rounded-2xl border border-brand/50 bg-panel p-12 text-center">
        <div>
          <p className="font-display text-4xl uppercase text-brand-deep">Message received</p>
          <p className="mt-3 text-mute">Thanks for reaching out. Our team will be in touch soon.</p>
        </div>
      </div>
    );
  }

  return (
    <form
      className="grid gap-5 rounded-2xl border border-line bg-pitch p-6 sm:grid-cols-2 sm:p-10"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: send to an API route / email service
        setSent(true);
      }}
    >
      <label className="grid gap-2 text-sm font-semibold">
        Full name
        <input required name="name" className={field} placeholder="Your name" />
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        Email
        <input required type="email" name="email" className={field} placeholder="you@example.com" />
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        I am a…
        <select name="type" className={field} defaultValue={player ? "Club" : "Player"}>
          <option>Player</option>
          <option>Parent / guardian</option>
          <option>Coach / academy</option>
          <option>Club</option>
          <option>Media / sponsor</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        Position (players)
        <select name="position" className={field} defaultValue="">
          <option value="">Not applicable</option>
          <option>Goalkeeper</option>
          <option>Defender</option>
          <option>Midfielder</option>
          <option>Forward</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
        Message
        <textarea
          required
          name="message"
          rows={6}
          className={field}
          defaultValue={player ? `I'd like to enquire about ${player.name}.` : ""}
          placeholder="Current club, highlights link, what you're looking for…"
        />
      </label>
      <button
        type="submit"
        className="rounded-full bg-navy px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-brand-deep sm:col-span-2 sm:justify-self-start"
      >
        Send message →
      </button>
    </form>
  );
}
