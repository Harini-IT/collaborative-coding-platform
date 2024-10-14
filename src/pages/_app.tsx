"use client";
import '@/styles/globals.css'
import Chart from "chart.js/auto";
import { LinearScale } from "chart.js";
import type { AppProps } from 'next/app'
import Head from 'next/head'
import {appWithTranslation} from 'next-i18next'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil'
Chart.register(LinearScale)


function App({ Component, pageProps }: AppProps) {

  return (


		<RecoilRoot>
			<Head>
				<title>CodeQuest</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' className='rounded-full' href='/assets/logo.jpg' />
				
				<meta
					name='description'
					content='Collaborative coding platform'
				/>
			</Head>
			<ToastContainer/>
			<div className='font-sans'>
			<Component {...pageProps} /> </div>
		</RecoilRoot>
	
	);

}

export default appWithTranslation(App)
