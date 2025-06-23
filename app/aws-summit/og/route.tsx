import { ImageResponse } from "next/og";
import { join } from "path";
import { og } from "../components/og";
import { readFile } from "fs/promises";

export async function GET(request: Request) {
  const host = request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto");
  const origin = `${proto}://${host}`;
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  if (!title) return new Response("query title is required.");
  const fontSize = searchParams.get("fontSize");
  if (!fontSize) return new Response("query fontSize is required.");
  const titleWidth = searchParams.get("titleWidth");
  const templateUrl = searchParams.get("templateUrl");
  if (!templateUrl) return new Response("query templateUrl is required.");
  const titleAlign = searchParams.get("titleAlign");
  if (titleAlign && titleAlign !== "center" && titleAlign !== "left") {
    return new Response("titleAlign allowed center or left");
  }
  const titleColor = searchParams.get("titleColor");

  return new ImageResponse(
    og({
      title,
      fontSize: parseInt(fontSize, 10),
      titleWidth: isNaN(Number(titleWidth)) ? null : Number(titleWidth),
      templateUrl,
      titleAlign: titleAlign as "center" | "left" | undefined,
      titleColor,
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
