import Head from "next/head";
import { FC, Fragment } from "react";
import { Navbar, SideMenu } from "../../ui";

interface Props {
  children: JSX.Element | Array<JSX.Element>;
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name='description' content={pageDescription} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={pageDescription} />

        {imageFullUrl && <meta name='og:image' content={imageFullUrl} />}
      </Head>

      <nav>
        <Navbar />
      </nav>

      {/* //TODO: Sidebar */}
      <SideMenu />

      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        {children}
      </main>

      {/* footer */}
      <footer>{/* //TODO: mi custom footer */}</footer>
    </Fragment>
  );
};
