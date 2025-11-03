import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import { users as usersDB, notes as notesDB} from "@/lib/seed";
import { SupabaseClient } from "@supabase/supabase-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function cleanupDatabase(supabaseAdmin: SupabaseClient<any>) {
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
  const { data: { users }, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
  if (usersError) {
    throw new Error(`Failed to list users: ${usersError.message}`);
  }

  // Delete all users
  for (const user of users) {
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);
    if (deleteError) {
      throw new Error(`Failed to delete user ${user.id}: ${deleteError.message}`);
    }
  }

  // Cleanup any remaining notes
  const { error: cleanupError } = await supabaseAdmin
    .from("notes")
    .delete()
    .neq("id", 0);
  
  if (cleanupError) {
    throw new Error(`Failed to cleanup notes: ${cleanupError.message}`);
  }

  return users.length;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function seedDatabase(supabaseAdmin: SupabaseClient<any>) {
  const createdUsers = [];

  for (let i = 0; i < usersDB.length; i++) {
    const user = usersDB[i];
    
    // Create user
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: { name: user.name }
    });

    if (userError) {
      throw new Error(`Failed to create user ${user.email}: ${userError.message}`);
    }

    createdUsers.push(userData.user);

    // Create notes for this user
    const userNotes = notesDB.slice(i * 3, i * 3 + 3).map(note => ({
      title: note.title,
      user_id: userData.user.id,
    }));

    const { error: notesError } = await supabaseAdmin
      .from("notes")
      .insert(userNotes);

    if (notesError) {
      throw new Error(`Failed to create notes for user ${user.email}: ${notesError.message}`);
    }
  }

  return createdUsers;
}

export async function GET() {

  try{
    const supabaseAdmin = createAdminClient();
  
    // Clean up existing data
    const deletedUsersCount = await cleanupDatabase(supabaseAdmin);
  
    // Seed new data
    const createdUsers = await seedDatabase(supabaseAdmin);
  
    return NextResponse.json({
      success: true,
      message: "Seed executed successfully",
      data: {
        deletedUsers: deletedUsersCount,
        createdUsers: createdUsers.length,
        createdNotes: createdUsers.length * 3
      }
    });

  }catch(error: unknown){
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        message
      },
      {status: 500}
    );
  }

}