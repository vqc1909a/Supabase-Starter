import {Hero} from "@/components/hero";
import {ConnectSupabaseSteps} from "@/components/tutorial/connect-supabase-steps";
import {SignUpUserSteps} from "@/components/tutorial/sign-up-user-steps";
import {hasEnvVars} from "@/lib/utils";
// import { cookies } from "next/headers";
// import { createClient } from "@/lib/supabase/server";

export default async function Home() {
	// const cookieStore = await cookies();
	// const supabase = createClient(cookieStore);

	// const {data: todos} =  await supabase.from('todos').select();

	return (
		<>
			<Hero />
			<main className="flex-1 flex flex-col gap-6 px-4">
				<h2 className="font-medium text-xl mb-4">Next steps</h2>
				{hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
			</main>
		</>
	);
}
