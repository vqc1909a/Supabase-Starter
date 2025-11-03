import {Header} from "@/components/layouts/Header";
import {Footer} from "@/components/layouts/Footer";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex-1 w-full flex flex-col gap-20 items-center">
			<Header />
			<div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
				{children}
			</div>
			<Footer />
		</div>
	);
}
