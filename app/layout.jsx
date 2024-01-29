import { ThemeProvider } from "@/providers/theme-provider";
import SessionProviders from "@/providers/session-provider";
import { Toaster } from "@/components/ui/sonner";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({ subsets: ["latin"] });

export const metadata = {
  title: "پروژه تست",
  description: "پروژه تست بر اساس دسترسی اشخاص",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body className={vazir.className}>
        <SessionProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
