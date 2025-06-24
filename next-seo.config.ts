import { DefaultSeoProps } from "next-seo";

const defaultSEO: DefaultSeoProps = {
  title: "LAZISMU - Berbagi Kebaikan, Membangun Harapan",
  description:
    "Platform donasi dan layanan kemanusiaan LAZISMU. Kami berkomitmen membantu masyarakat melalui program pendidikan, kesehatan, dan pemberdayaan ekonomi.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.websiteanda.com/",
    siteName: "LAZISMU",
    images: [
      {
        url: "https://www.websiteanda.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LAZISMU Open Graph Image",
      },
    ],
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "donasi, zakat, sedekah, lazismu, kemanusiaan, pendidikan, kesehatan, ekonomi",
    },
  ],
};

export default defaultSEO;
