"use client";

import { useEffect, useState } from "react";

import Loading from "react-loading";
import { format } from "date-fns";

type Template = { url: string; titleColor: string };

const host: string = (() => {
  if (typeof location !== "undefined") {
    return location.protocol + "//" + location.host;
  }
  return "";
})();

const templates: Template[] = [
  { url: `${host}/iret-media-template/1.png`, titleColor: "white" },
  { url: `${host}/iret-media-template/2.png`, titleColor: "white" },
  { url: `${host}/iret-media-template/3.png`, titleColor: "white" },
  { url: `${host}/iret-media-template/4.png`, titleColor: "black" },
  { url: `${host}/iret-media-template/5.png`, titleColor: "black" },
];

export default function IretMedia() {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [fontSize, setFontSize] = useState(50);
  const [objectUrl, setObjectUrl] = useState("");
  const [titleWidth, setTitleWidth] = useState<"normal" | "full">("normal");
  const [titleAlign, setTitleAlign] = useState<"center" | "left">("center");
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(
    templates[0]
  );

  const getImageUrl = () =>
    `/iret-media/og?${new URLSearchParams({
      title: title || "タイトル",
      fontSize: fontSize.toString(),
      titleWidth,
      templateUrl: selectedTemplate.url,
      titleAlign,
      titleColor: selectedTemplate.titleColor,
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
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      reloadImage();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [title, fontSize, titleWidth]);

  useEffect(() => {
    setIsLoading(true);
    reloadImage();
  }, [titleAlign, selectedTemplate]);

  console.log(templates);

  return (
    <>
      <main className="min-h-[95vh] relative bg-[#e9ecee]">
        <header className="h-16 w-full bg-white flex items-center justify-center">
          <img src="/iret-media-logo.svg" alt="iret media" className="h-8" />
        </header>
        <div className="flex flex-col sm:flex-row gap-8 mt-5 px-10">
          <div className="flex flex-col flex-1">
            <span className="whitespace-nowrap font-bold border-b-2 pb-1 border-iret-media-theme text-slate-600">
              タイトル
            </span>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className=" bg-white w-full rounded-lg px-5 py-2 mt-3 font-bold focus:outline-iret-media-theme text-slate-700"
              placeholder="タイトルを入力してください。"
              rows={6}
            />
            <span className="whitespace-nowrap font-bold border-b-2 pb-1 border-iret-media-theme text-slate-600 mt-5">
              テンプレート（{templates.length}種）
            </span>
            <p className="text-xs mt-3 text-slate-500">
              ※{templates.length}
              種類ありますのでお好みのデザインを選択してください。横にスライドすると全てのデザインを確認できます。
            </p>
            <ul className="flex gap-3 mt-5 overflow-x-scroll items-center">
              {templates.map((template, i) => (
                <li
                  key={i}
                  className={`${
                    selectedTemplate.url === template.url
                      ? "border-2 border-iret-media-theme"
                      : "opacity-60"
                  } shrink-0`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <img
                    src={template.url}
                    className={`${
                      selectedTemplate.url === template.url ? "h-32" : "h-28"
                    }`}
                  />
                </li>
              ))}
            </ul>
            <span className="whitespace-nowrap font-bold border-b-2 pb-1 border-iret-media-theme text-slate-600 mt-8">
              フォントサイズ
            </span>
            <div>
              <input
                value={fontSize}
                type="number"
                onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                className="bg-white px-5 py-2 rounded-lg mt-3 w-24 focus:outline-iret-media-theme text-slate-700"
              />
              <span className="pl-3 text-slate-700">px</span>
            </div>
            <span className="whitespace-nowrap font-bold border-b-2 pb-1 border-iret-media-theme text-slate-600 mt-8">
              揃え方
            </span>
            <div className="flex mt-3">
              <button
                onClick={(e) => setTitleAlign("left")}
                className={`px-5 py-2 whitespace-nowrap rounded-lg ${
                  titleAlign === "left" ? "bg-slate-700" : ""
                }`}
              >
                <div className="w-8 h-8 flex flex-col justify-between">
                  <div
                    className={`${
                      titleAlign === "left" ? "bg-white" : "bg-black"
                    } h-1 rounded-full`}
                  ></div>
                  <div
                    className={`${
                      titleAlign === "left" ? "bg-white" : "bg-black"
                    } h-1 rounded-full w-4/5`}
                  ></div>
                  <div
                    className={`${
                      titleAlign === "left" ? "bg-white" : "bg-black"
                    } h-1 rounded-full`}
                  ></div>
                  <div
                    className={`${
                      titleAlign === "left" ? "bg-white" : "bg-black"
                    } h-1 rounded-full w-4/5`}
                  ></div>
                </div>
              </button>
              <button
                onClick={(e) => setTitleAlign("center")}
                className={`px-5 py-2 whitespace-nowrap rounded-lg ${
                  titleAlign === "center" ? "bg-slate-700" : ""
                }`}
              >
                <div className="w-8 h-8 flex flex-col justify-between items-center">
                  <div
                    className={`${
                      titleAlign === "center" ? "bg-white" : "bg-black"
                    } h-1 rounded-full w-full`}
                  ></div>
                  <div
                    className={`${
                      titleAlign === "center" ? "bg-white" : "bg-black"
                    } h-1 rounded-full w-4/5`}
                  ></div>
                  <div
                    className={`${
                      titleAlign === "center" ? "bg-white" : "bg-black"
                    } h-1 rounded-full w-full`}
                  ></div>
                  <div
                    className={`${
                      titleAlign === "center" ? "bg-white" : "bg-black"
                    } h-1 rounded-full w-4/5`}
                  ></div>
                </div>
              </button>
            </div>
          </div>
          <div className="flex-1 flex gap-5 flex-col items-center mt-3">
            <div className="flex flex-col gap-5 justify-center items-center min-h-20">
              {objectUrl && <img src={objectUrl} className="shadow-xl" />}
              {isLoading && (
                <Loading
                  type="spokes"
                  className="absolute"
                  color="#58db15"
                  width={70}
                />
              )}
            </div>
            {objectUrl && (
              <a
                href={objectUrl}
                download={`iret-media-${format(new Date(), "yyyyMMdd-HHmmss")}`}
              >
                <button className="bg-slate-700 text-white px-3 py-2 rounded-lg font-bold">
                  ダウンロード
                </button>
              </a>
            )}
            <div className="mt-14 px-5 py-2 text-slate-700 border-4 border-iret-media-theme border-dotted rounded-lg">
              <p>
                ※画像が設定されていない場合は、マーケGにて作成させていただきます。
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="text-slate-400 text-center py-4 bg-[#e9ecee]">
        ©︎ Michinosuke
      </footer>
    </>
  );
}
