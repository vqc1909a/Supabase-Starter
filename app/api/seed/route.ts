import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import { users as usersDB, notes as notesDB} from "@/lib/seed";
export async function GET() {

  const supabaseAdmin = createAdminClient();
  //Recover all authenticated users
  // {
  //   data: {
  //     users: [],
  //     aud: 'authenticated',
  //     nextPage: null,
  //     lastPage: 0,
  //     total: 0
  //   },
  //   error: null
  // }
  const { data: { users }, error: usersError} = await supabaseAdmin.auth.admin.listUsers();
  
  if(usersError){
    return NextResponse.json({msg: usersError.message, stack: usersError.stack}, {status: usersError.status});
  }

  //Delete all authenticated users
  for(const user of users){
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);
    if(deleteError){
      return NextResponse.json({msg: deleteError.message, stack: deleteError.stack}, {status: deleteError.status});
    }
  }

  //Recover all the notes
  // { error: null, data: [], count: null, status: 200, statusText: 'OK' }
  const { data: notes, error: notesError, status: notesStatus, statusText: notesStatusText } = await supabaseAdmin.from("notes").select();

  if(notesError){
    return NextResponse.json({msg: notesStatusText}, {status: notesStatus});
  }

  //Delete all the notes
  if(notes.length !== 0){
    const { error, status, statusText } = await supabaseAdmin.from("notes").delete().in("id", notes.map(note => note.id));
    if(error){
      return NextResponse.json({msg: statusText}, {status});
    }
  }

  usersDB.forEach(async (user, id) => {
    //Populate Users
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: { name: user.name }
    })
  
    if(userError){
      return NextResponse.json({msg: userError.message, stack: userError.stack}, {status: userError.status});
    }
    
    //Populate Notes
    const { data: notesData, error: notesDataError, status: notesDataStatus, statusText: notesDataStatusText} = await supabaseAdmin.from("notes").insert(notesDB.slice(id * 3, id * 3 + 3).map(note => ({
      title: note.title,
      user_id: userData.user.id,
    })));
    if(notesDataError){
      return NextResponse.json({msg: notesDataStatusText}, {status: notesDataStatus});
    }
    console.log({
      userData: userData,
      notesData: notesData
    });
  });

  return NextResponse.json({msg: "Seed executed"});
}