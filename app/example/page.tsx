"use client";

import { useState } from "react";

export default function Example() {
  const [title, setTitle] = useState(
    "React + @vercel/og で\nPNG 形式のサムネイルを\n自動生成する"
  );
  const [icon, setIcon] = useState(
    "https://mokumoku-kai.s3.ap-northeast-1.amazonaws.com/KyZdcb"
  );
  const [name, setName] = useState("みちのすけ");
  const [day, setDay] = useState("1");

  const url = () =>
    `https://mokumoku-og.vercel.app/api/og?${new URLSearchParams({
      title,
      icon,
      name,
      day,
    })}`;

  console.log({ url: url() });

  return (
    <main className="grid gap-2 px-10 py-10">
      <h1 className="text-lg">サムネイルジェネレータ</h1>
      <div className="w-full flex mt-5">
        <span className="whitespace-nowrap">タイトル:</span>
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="ml-5 bg-slate-200 text-gray-700 w-full"
          rows={3}
        />
      </div>
      <div className="w-full flex">
        <span className="whitespace-nowrap">アイコン:</span>
        <input
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="ml-5 bg-slate-200 text-gray-700 w-full"
        />
      </div>
      <div className="w-full flex">
        <span className="whitespace-nowrap">名前:</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="ml-5 bg-slate-200 text-gray-700 w-full"
        />
      </div>
      <div className="w-full flex">
        <span className="whitespace-nowrap">日目:</span>
        <input
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="ml-5 bg-slate-200 text-gray-700 w-full"
        />
      </div>
      <img src={url()} className="w-full max-w-screen-sm mt-5" />
    </main>
  );
}
