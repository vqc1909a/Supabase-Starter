import {createClient} from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// "use client";

// import {createClient} from "@/lib/supabase/client";
// import {useEffect, useState} from "react";

// export default function Page() {
// 	const [notes, setNotes] = useState<any[] | null>(null);
// 	const supabase = createClient();

// 	useEffect(() => {
// 		const getData = async () => {
// 			const {data} = await supabase.from("notes").select();
// 			setNotes(data);
// 		};
// 		getData();
// 	}, []);

// 	return <pre>{JSON.stringify(notes, null, 2)}</pre>;
// }


export default async function Page() {

  const supabase = await createClient();
  const {data: auth, error: errorAuth} = await supabase.auth.getClaims();
  if (errorAuth || !auth?.claims) {
		redirect("/auth/login");
	}

  const {data: notes, error} = await supabase.from("notes").select().eq("user_id", auth.claims.sub);

  if(error){
    throw new Error(error.message);
  }
  if(!notes.length){
    return <p>No notes found</p>;
  }
	return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
