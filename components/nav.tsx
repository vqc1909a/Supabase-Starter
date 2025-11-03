import Link from "next/link";

export const Nav = () => {
  return (
		<div className="flex gap-5 items-center font-semibold">
			<Link href={"/"}>Next.js Supabase Starter</Link>
			<Link href={"/components"}>Components</Link>
			<Link href={"/my-notes"}>My Notes</Link>
			<Link href={"/notes"}>All Notes</Link>
		</div>
	);
}
