import { createFileRoute, redirect } from "@tanstack/react-router";

// The Busan tourism site is served as static HTML from /public/site so the
// original design stays byte-for-byte identical.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ href: "/site/index.html" });
  },
  head: () => ({
    meta: [
      { title: "BUSAN — 부산 관광 안내 | Busan is Good" },
      {
        name: "description",
        content:
          "해운대·광안리·감천문화마을 등 부산 16개 구·군의 명소와 맛집을 다국어로 안내하고 길찾기까지 지원하는 부산 여행 가이드.",
      },
      { property: "og:title", content: "BUSAN — 부산 관광 안내" },
      {
        property: "og:description",
        content: "부산 명소·맛집·카페를 지역별로 찾고 네이버 지도로 길찾기까지.",
      },
    ],
  }),
  component: () => null,
});
