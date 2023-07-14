import Head from "next/head";
export default function Inactive() {
  return (
    <>
      <Head>
        <title>Forbidden 403</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <div
        style={{
          fontFamily:
            'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
          height: "100vh",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ lineHeight : "42px", }}>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}",
            }}
          />
          <h1
            className="next-error-h1"
            style={{
              display: "inline-block",
              margin: "0 20px 0 0",
              paddingRight: 23,
              fontSize: 24,
              fontWeight: 500,
              verticalAlign: "top",
            }}
          >
            Forbidden 403
          </h1>
          <div style={{ display: "inline-block" }}>
            <h2 style={{ fontSize: 14, fontWeight: 400, lineHeight: "28px"}}>
                You don&rsquo;t have permission to access this page.
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
