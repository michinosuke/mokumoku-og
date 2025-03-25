export const og = ({
  title,
  fontSize,
  titleWidth,
  titleAlign,
  titleColor,
  templateUrl,
}: {
  title: string;
  fontSize: number;
  titleWidth?: number | null;
  titleAlign?: "center" | "left" | null;
  titleColor?: string | null;
  templateUrl: string;
}) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: 1440,
        height: 810,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <img
        src={templateUrl}
        width={1440}
        height={810}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
      />
      <div
        style={{
          display: "flex",
          paddingLeft: 120,
          paddingRight: 120,
        }}
      >
        <h1
          style={{
            width: "100%",
            paddingTop: 100,
            display: "flex",
            justifyContent: titleAlign === "center" ? "center" : "flex-start",
            textAlign: titleAlign ?? "center",
            fontSize,
            fontWeight: "bold",
            whiteSpace: "pre-wrap",
            color: titleColor ?? "black",
            zIndex: 100,
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};
