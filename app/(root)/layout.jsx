import Header from "@/components/main-page/header";

export const metadata = {
  title: "پروژه تست | داشبورد",
  description: "پروژه تست بر اساس دسترسی اشخاص",
};

export default function MainLayout({ children }) {
  return (
    <>
      <div className="mx-auto min-h-screen w-full px-6 transition-all duration-500 xl:w-[75%]">
        <Header />
        <div className="mt-5 rounded-lg pb-5">{children}</div>
      </div>
    </>
  );
}
