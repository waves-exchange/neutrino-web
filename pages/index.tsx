import React from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18nConfig } from 'locales/config';

import 'style/index.scss';
import 'shared/Layout/Layout.scss';

interface AppConfig {
    env: {
        [key: string]: string;
    };
}
const getGoogleTag = (config: AppConfig) => config.env.google_tag_id;

interface State {
    googleTagId?: string;
}

class LandingPage extends React.Component<{}, State> {
    constructor(props) {
        super(props);

        this.state = {};
    }

    async componentDidMount() {
        i18next.use(initReactI18next).init({ ...i18nConfig });

        try {
            const res = await axios.get('/api/v1/init');

            this.setState({ googleTagId: getGoogleTag(res.data.config) });
        } catch (err) {
            console.warn('Error occured on google tag id fetch');
        }
    }

    render() {
        const { googleTagId } = this.state;
        const DynamicLandingPage = dynamic(() => import('routes/LandingPage'), { ssr: true });

        return (
            <div>
                <Head>
                    <link rel="icon" href={'static/images/favicon.ico'} />
                    <title>Neutrino Dollar (USDN) - stable coin pegged to the US dollar</title>
                </Head>
                <div className="Layout">
                    <div></div>
                    <DynamicLandingPage />
                </div>
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${googleTagId}');
                    `,
                    }}
                />
                <style jsx>{`
                    background: #f1f1f1;
                `}</style>
            </div>
        );
    }
}

export default LandingPage;
