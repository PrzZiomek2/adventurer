import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import Header from "@/components/common/Header/Header";
import Providers from "@/components/Providers";
import { Container } from "@/components/ui/Container";
import { Background } from "@/components/common/Background";

const inter = Inter({
   subsets: ["latin"],
   weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
   title: "Adventurer",
   description:
      "Twój przewodnik i doradca w podróżowaniu. Znajdź dopasowany do Ciebie, oryginalny pomysł na podróż w dowolnym celu.",
   keywords:
      "podróż, przewodnik, pomysły, wakacje, praca za granicą, emigracja, wskazówki",
};

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const messages = await getMessages();

   return (
      <html lang="pl">
         <body className={`${inter.className} relative`}>
            <Background />
            <NextIntlClientProvider messages={messages}>
               <Providers>
                  <Header />
                  <Container>{children}</Container>
               </Providers>
            </NextIntlClientProvider>
         </body>
      </html>
   );
}
