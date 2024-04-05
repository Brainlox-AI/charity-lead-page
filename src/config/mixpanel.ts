import mixpanel from "mixpanel-browser";

if (process.env.NODE_ENV === "development") {
  mixpanel.init("development");
} 
else {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? "", {
    debug: false,
    track_pageview: true,
    persistence: "localStorage",
  });
}

export default mixpanel; 