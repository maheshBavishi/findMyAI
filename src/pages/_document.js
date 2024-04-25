import { Html, Head, Main, NextScript } from "next/document";
const logo = "/assets/logo/favicon-icon.png";

export const metadata = {
  title: "FindMyAITool - List of AI Tools ",
  description:
    "Take your business to the next level with our cutting-edge list of AI tools. Enhance productivity, optimize operations, and boost revenue in 2024.",
  keywords:
    "List of AI Tools, AI Tool FInder, Find AI Tools, All AI Tools List, AI tool List, Category wise AI Tools, Large directory of AI Tools",
  colorScheme: `dark`,
  openGraph: {
    description:
      "Discover the best ChatGPT GPTs; plugins for AI at ProGPT.tools. Enhance your AI assistant capabilities.",
    images: [
      {
        url: "https://client-assets-rh.s3.ap-south-1.amazonaws.com/images/appImg/png-1713785914818",
        alt: "FindMyAITool - List of AI Tools Logo",
        "secure_url": "https://client-assets-rh.s3.ap-south-1.amazonaws.com/images/appImg/png-1713785914818",
      },
    ],
    domain: `findmyaitool.com`,
    site: "https://findmyaitool.com/",
    card: `findmyaitool.com`,
    url: "https://findmyaitool.com/",
    type: "website",
    locale: "en_GB",
    siteName: `https://findmyaitool.com/`,
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },


  },
  other: {
    "parsely-title": "Findmyaitool",
    "parsely-link": "https://findmyaitool.com/",
    "parsely-type": "index",
    "theme-color": '#000000',
    language: "en",
    seobility: "87af7f952834eba23b638e40d8c87f69",
    google: "notranslate",
    "ahrefs-site-verification": "225f8c5aa55116ede1a3bb1f010ae727633c17aa4bd1b1f336cd5b3730e9599b",

  },






};
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content={metadata.openGraph.images.url} />
        <meta name="twitter:image:alt" content={metadata.openGraph.images.alt} />
        <meta property="twitter:domain" content={metadata.openGraph.domain} />
        <meta property="twitter:url" content={metadata.openGraph.site} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"
        ></link>
        <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
        <link rel="icon" href={logo} sizes="any" as="image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
