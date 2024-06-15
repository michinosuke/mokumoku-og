"use client";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { nanoid } from "nanoid";
import { useState } from "react";

const client = new S3Client({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY!,
  },
  endpoint: "https://d35yi2p0ou13gt.cloudfront.net",
});

export default () => {
  const [file, setFile] = useState<File | null>(null);

  const upload = async () => {
    if (!file) return;
    const key = nanoid(6);
    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET!,
      Key: key,
      Body: file.stream(),
    });
    const result = await client.send(command);
    console.log(result);
  };

  return (
    <main className="py-10 px-10">
      <div>
        <input
          type="file"
          accept=".jpg,.png"
          onChange={(e) => {
            const file = e.currentTarget.files?.[0];
            if (!file) return;
            setFile(file);
          }}
        />
      </div>
      <div>
        <button
          onClick={() => upload()}
          className="px-3 py-2 border rounded mt-10"
        >
          Upload
        </button>
      </div>
    </main>
  );
};
