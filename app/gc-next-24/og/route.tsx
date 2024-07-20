import { ImageResponse } from "next/og";
import { join } from "path";
import { readFile } from "fs/promises";
import { og } from "../components/og";

export async function GET(request: Request) {
  const host = request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto");
  const origin = `${proto}://${host}`;
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  if (!title) return new Response("query title is required.");
  const fontSize = searchParams.get("fontSize");
  if (!fontSize) return new Response("query fontSize is required.");

  console.log(`${origin}/gc-next-24-bg.png`);

  return new ImageResponse(
    og({
      title,
      fontSize: parseInt(fontSize, 10),
      origin,
    }),
    {
      width: 1440,
      height: 810,
      fonts: [
        {
          data: await readFile(
            join(process.cwd(), "public/NotoSansJP-ExtraBold.ttf")
          ),
          name: "zen",
          weight: 900,
          style: "normal",
        },
      ],
    }
  );
}
