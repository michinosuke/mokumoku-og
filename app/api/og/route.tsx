import { BgSvg01 } from "@/components/bg-svg-01";
import { BgSvg02 } from "@/components/bg-svg-02";
import { BgSvg03 } from "@/components/bg-svg-03";
import { BgSvg04 } from "@/components/bg-svg-04";
import { BgSvg05 } from "@/components/bg-svg-05";
import { Icon01 } from "@/components/icon-01";
import { Icon02 } from "@/components/icon-02";
import { Icon03 } from "@/components/icon-03";
import { Icon04 } from "@/components/icon-04";
import { Icon05 } from "@/components/icon-05";
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

  const term = (() => {
    if (Number(day) <= 7 * 1) return 1;
    if (Number(day) <= 7 * 2) return 2;
    if (Number(day) <= 7 * 3) return 3;
    if (Number(day) <= 7 * 4) return 4;
    return 5;
  })();

  const BG = (() => {
    if (term === 1) return BgSvg01;
    if (term === 2) return BgSvg02;
    if (term === 3) return BgSvg03;
    if (term === 4) return BgSvg04;
    return BgSvg05;
  })();

  const Icon = (() => {
    if (term === 1) return Icon01;
    if (term === 2) return Icon02;
    if (term === 3) return Icon03;
    if (term === 4) return Icon04;
    return Icon05;
  })();

  const TitleLeft = () => (
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
  );

  const TitleCenter = () => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: 1000,
          fontSize: 70,
          paddingBottom: 70,
          fontWeight: "bold",
          whiteSpace: "pre-wrap",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {title}
      </div>
    </div>
  );

  const HeaderLeft = () => (
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
      {<Icon />}
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
        <div style={{ fontSize: 40, paddingBottom: 8 }}>もくもく会</div>
        <div style={{ fontSize: 42, padding: "0 0 7px 7px" }}>ブログリレー</div>
        <div style={{ fontSize: 46, padding: "0 2px 14px 14px" }}>{day}</div>
        <div style={{ fontSize: 40, paddingBottom: 8 }}>日目</div>
      </div>
    </div>
  );

  const HeaderCenter = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        position: "absolute",
        top: 60,
        left: 0,
        zIndex: 1000,
        width: "100%",
      }}
    >
      {<Icon />}
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
        <div style={{ fontSize: 40, paddingBottom: 8 }}>もくもく会</div>
        <div style={{ fontSize: 42, padding: "0 0 7px 7px" }}>ブログリレー</div>
        <div style={{ fontSize: 46, padding: "0 2px 14px 14px" }}>{day}</div>
        <div style={{ fontSize: 40, paddingBottom: 8 }}>日目</div>
      </div>
    </div>
  );

  const HeaderLast = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        position: "absolute",
        top: 60,
        left: 0,
        width: "100%",
      }}
    >
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
        <div style={{ fontSize: 40, paddingBottom: 8 }}>もくもく会</div>
        <div style={{ fontSize: 42, padding: "0 0 7px 7px" }}>ブログリレー</div>
        <div
          style={{
            margin: "6px 4px 0px 6px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Icon />
          <div
            style={{
              fontSize: 50,
              color: "black",
              fontWeight: "bold",
              position: "absolute",
              paddingBottom: "20px",
            }}
          >
            {day}
          </div>
        </div>
        <div style={{ fontSize: 40, paddingBottom: 8 }}>日目</div>
      </div>
    </div>
  );

  const ProfileLeft = () => (
    <div
      style={{
        position: "absolute",
        bottom: 44,
        left: 60,
        display: "flex",
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
  );

  const ProfileCenter = () => (
    <div
      style={{
        position: "absolute",
        bottom: 44,
        left: 0,
        display: "flex",
        justifyContent: "center",
        width: "100%",
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
  );

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
        <BG
          style={{
            position: "absolute",
            left: 0,
            top: 0,
          }}
        />

        {term <= 3 ? (
          <HeaderLeft />
        ) : term === 4 ? (
          <HeaderCenter />
        ) : (
          <HeaderLast />
        )}

        {term <= 3 ? <TitleLeft /> : <TitleCenter />}

        {term <= 3 ? <ProfileLeft /> : <ProfileCenter />}
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
