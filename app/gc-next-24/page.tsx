"use client";

import { useEffect, useState } from "react";
import Loading from "react-loading";
import ReactLoading from "react-loading";

export default function Example() {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState(
    "サイト内の検索コストを大幅削減！日本最大級のデリバリーサービス「出前館」に Vertex AI Search を導入した話"
  );
  const [fontSize, setFontSize] = useState(50);
  const [objectUrl, setObjectUrl] = useState("");
  const [titleWidth, setTitleWidth] = useState<"normal" | "full">("normal");

  const getImageUrl = () =>
    `/gc-next-24/og?${new URLSearchParams({
      title: title || "タイトル",
      fontSize: fontSize.toString(),
      titleWidth,
    })}`;

  const reloadImage = () => {
    fetch(getImageUrl())
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((objectUrl) => {
        setObjectUrl(objectUrl);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(true);
      reloadImage();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [title, fontSize, titleWidth]);

  return (
    <main className="px-10 min-h-screen relative">
      <h1 className="text-xl font-bold text-slate-600 pt-8">
        Google Cloud Next 2024
      </h1>
      <div className="flex flex-col sm:flex-row gap-8 mt-5">
        <div className="flex flex-col flex-1">
          <span className="whitespace-nowrap font-bold border-b-2 border-yellow-500 text-slate-600">
            タイトル
          </span>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" bg-yellow-500 text-white w-full rounded-lg border px-5 py-2 mt-3 font-bold"
            rows={6}
          />
          <span className="whitespace-nowrap font-bold border-b-2 border-yellow-500 text-slate-600 mt-10">
            フォントサイズ
          </span>
          <input
            value={fontSize}
            type="number"
            onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
            className="bg-yellow-500 text-white px-5 py-2 rounded-lg mt-3 w-24"
          />
          <span className="whitespace-nowrap font-bold border-b-2 border-yellow-500 text-slate-600 mt-10">
            タイトルの幅
          </span>
          <div className="flex mt-3">
            <button
              onClick={(e) => setTitleWidth("normal")}
              className={`px-5 py-2 whitespace-nowrap rounded-lg ${
                titleWidth === "normal"
                  ? "bg-yellow-500 text-white"
                  : "text-slate-600"
              }`}
            >
              制限あり
            </button>
            <button
              onClick={(e) => setTitleWidth("full")}
              className={`px-5 py-2 whitespace-nowrap rounded-lg ${
                titleWidth === "full"
                  ? "bg-yellow-500 text-white"
                  : "text-slate-600"
              }`}
            >
              制限なし
            </button>
          </div>
        </div>
        <div className="flex-1 flex gap-5 flex-col items-center">
          <div className="flex flex-col gap-5 justify-center items-center min-h-20">
            {objectUrl && <img src={objectUrl} className="shadow-lg" />}
            {isLoading && (
              <Loading
                type="spokes"
                className="absolute"
                color="blue"
                width={60}
              />
            )}
          </div>
          {objectUrl && (
            <a href={objectUrl} download="gc-next-24-og.jpg">
              <button className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold">
                ダウンロード
              </button>
            </a>
          )}
        </div>
      </div>
      <div className="h-16" />
      <footer className="absolute bottom-5 text-slate-300">
        ©︎ Michinosuke
      </footer>
    </main>
  );
}
