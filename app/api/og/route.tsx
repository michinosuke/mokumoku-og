import { BgSvg01 } from "@/components/bg-svg-01";
import { BgSvg02 } from "@/components/bg-svg-02";
import { BgSvg03 } from "@/components/bg-svg-03";
import { ImageResponse } from "next/og";
import { join } from "path";
import { readFile } from "fs/promises";
// App router includes @vercel/og.
// No need to install it.

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  if (!title) return new Response("query title is required.");
  const day = searchParams.get("day");
  if (!day) return new Response("query day is required.");
  const icon = searchParams.get("icon");
  if (!icon) return new Response("query icon is required.");
  const name = searchParams.get("name");
  if (!name) return new Response("query name is required.");

  const BG = (() => {
    if (Number(day) <= 10) return BgSvg01;
    if (Number(day) <= 20) return BgSvg02;
    return BgSvg03;
  })();

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <BG style={{}} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            position: "absolute",
            top: 60,
            left: 60,
            zIndex: 1000,
          }}
        >
          <svg
            id="ロゴ"
            width="74"
            height="74"
            viewBox="0 0 74 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_126_2067)">
              <path d="M1 1L19 8H55L73 1V73L55 65.5H19L1 73V1Z" fill="white" />
              <path
                d="M72.596 0.264366L54.8024 7.38149H19.2507L1.45715 0.264366C0.812418 0.0229579 0.226562 0.51019 0.226562 1.09899V72.9046C0.226562 73.492 0.812418 73.9807 1.45715 73.7392L19.2507 66.6221H54.801L72.5945 73.7392C73.2392 73.9807 73.8251 73.492 73.8251 72.9046V1.09899C73.8251 0.511662 73.2392 0.0229579 72.5945 0.264366H72.596ZM18.1776 65.1163L2.02093 71.5783V2.42379L18.1776 8.88587V65.1163ZM54.0797 64.8248H19.972V9.17585H54.0797V64.8248ZM72.0307 71.5783L55.8741 65.1163V8.88587L72.0307 2.42379V71.5783Z"
                fill="#051B2E"
              />
              <path
                d="M19.8516 8.78516H54.1982V65.2118H19.8516V8.78516Z"
                fill="url(#paint0_radial_126_2067)"
              />
            </g>
            <defs>
              <radialGradient
                id="paint0_radial_126_2067"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(37.0249 36.9985) rotate(90) scale(28.2133 17.1733)"
              >
                <stop stop-color="#FFF2AC" />
                <stop offset="1" stop-color="#F5D421" />
              </radialGradient>
              <clipPath id="clip0_126_2067">
                <rect
                  width="73.6"
                  height="73.6"
                  fill="white"
                  transform="translate(0.226562 0.199219)"
                />
              </clipPath>
            </defs>
          </svg>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0px 25px 7px",
              backgroundColor: "#071623",
              color: "white",
              lineHeight: "36px",
              height: 60,
              borderRadius: 60 / 2,
              fontWeight: 700,
            }}
          >
            <div style={{ fontSize: 46, padding: "0 14px 12px 0" }}>#</div>
            <div style={{ fontSize: 40, paddingBottom: 8 }}>もくもく</div>
            <div style={{ fontSize: 42, paddingBottom: 7 }}>ブログリレー</div>
            <div style={{ fontSize: 46, padding: "0 2px 14px 14px" }}>
              {day}
            </div>
            <div style={{ fontSize: 40, paddingBottom: 8 }}>日目</div>
          </div>
        </div>

        <div
          style={{
            width: 1000,
            paddingLeft: 60,
            fontSize: 70,
            paddingBottom: 70,
            fontWeight: "bold",
            whiteSpace: "pre-wrap",
          }}
        >
          {title}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 44,
            left: 60,
            display: "flex",
            // alignItems: "center",
            justifyContent: "flex-start",
            gap: 20,
          }}
        >
          <img
            src={icon}
            width={138}
            height={138}
            style={{ borderRadius: "100%", margin: 0, objectFit: "cover" }}
          />
          <div
            style={{
              fontSize: 42,
              display: "flex",
              height: "100%",
              lineHeight: "110px",
              margin: 0,
            }}
          >
            {name}
          </div>
        </div>
      </div>
    ),
    {
      width: 1440,
      height: 810,
      fonts: [
        {
          data: await readFile(
            join(process.cwd(), "public/ZenKakuGothicNew-Medium.ttf")
          ),
          name: "zen",
          weight: 500,
          style: "normal",
        },
        {
          data: await readFile(
            join(process.cwd(), "public/ZenKakuGothicNew-Bold.ttf")
          ),
          name: "zen",
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
