"use client";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { nanoid } from "nanoid";
import { useState } from "react";
import Image from "next/image";

const client = new S3Client({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY!,
  },
});

export default function Upload() {
  const [key, setKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const url = () =>
    `https://${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.ap-northeast-1.amazonaws.com/${key}`;

  const upload = async (file: File) => {
    if (!file) return;
    const key = nanoid(6);
    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET!,
      Key: key,
      Body: file as any,
    });

    try {
      const result = await client.send(command);
      if (result.$metadata.httpStatusCode === 200) {
        setKey(key);
      }
    } catch (e: any) {
      alert(e.message);
    }
  };

  if (key) {
    return (
      <main className="px-10 py-10">
        <div className="relative">
          <Image
            src={url()}
            width={200}
            height={200}
            alt="アップロードした画像"
            className="h-full"
          />
        </div>
        <p className="mt-10">{url()}</p>
        <p className="mt-10 flex gap-5 items-center">
          <button
            className="py-2 px-3 border rounded"
            onClick={() => {
              navigator.clipboard.writeText(url());
              setCopied(true);
            }}
          >
            URL をコピー
          </button>
          {copied && <span>コピーしました！</span>}
        </p>
        <p className="text-sm mt-10 opacity-60">
          ※ この URL
          は一時的なものなので、記事内で参照するのに使ったりしないでください
        </p>
      </main>
    );
  }

  return (
    <main className="py-10 px-10">
      <h1 className="text-xl">Upload Image</h1>
      <div className="mt-10">
        <input
          type="file"
          accept=".jpg,.png"
          onChange={(e) => {
            const file = e.currentTarget.files?.[0];
            if (!file) return;
            upload(file);
          }}
        />
      </div>
    </main>
  );
}
