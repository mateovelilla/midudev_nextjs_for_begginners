import { NextUIProvider } from '@nextui-org/react';
import { I18NProvider, useI18N } from 'context/i18n';
import Head from 'next/head';
import '../styles/globals.css'
const DefaultHeadApp = () => {
  const { translate } = useI18N();
  return (
    <Head>
      <title>{translate('SEO_DEFAULT_TITLE')}</title>
    </Head>
  )
}
function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <I18NProvider>
        <DefaultHeadApp/>
        <Component {...pageProps} />
      </I18NProvider>f
    </NextUIProvider>
  );
}

export default MyApp
