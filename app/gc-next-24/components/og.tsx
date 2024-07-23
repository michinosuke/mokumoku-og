export const og = ({
  title,
  fontSize,
  origin,
  titleWidth,
}: {
  title: string;
  fontSize: number;
  origin: string;
  titleWidth: string;
}) => {
  return (
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
      <img
        src={`${origin}/gc-next-24-bg.jpg`}
        width={1440}
        height={810}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
      />
      <h1
        style={{
          width: titleWidth === "normal" ? 750 : "100%",
          marginLeft: 50,
          marginRight: 50,
          paddingTop: 40,
          fontSize,
          fontWeight: "bold",
          whiteSpace: "pre-wrap",
          color: "black",
          zIndex: 100,
        }}
      >
        {title}
      </h1>
    </div>
  );
};
