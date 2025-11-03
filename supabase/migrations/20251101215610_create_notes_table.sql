create sequence "public"."notes_id_seq";


  create table "public"."notes" (
    "id" bigint not null default nextval('public.notes_id_seq'::regclass),
    "title" text,
    "user_id" uuid
      );


alter table "public"."notes" enable row level security;

alter sequence "public"."notes_id_seq" owned by "public"."notes"."id";

CREATE UNIQUE INDEX notes_pkey ON public.notes USING btree (id);

alter table "public"."notes" add constraint "notes_pkey" PRIMARY KEY using index "notes_pkey";

alter table "public"."notes" add constraint "notes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."notes" validate constraint "notes_user_id_fkey";

grant delete on table "public"."notes" to "anon";

grant insert on table "public"."notes" to "anon";

grant references on table "public"."notes" to "anon";

grant select on table "public"."notes" to "anon";

grant trigger on table "public"."notes" to "anon";

grant truncate on table "public"."notes" to "anon";

grant update on table "public"."notes" to "anon";

grant delete on table "public"."notes" to "authenticated";

grant insert on table "public"."notes" to "authenticated";

grant references on table "public"."notes" to "authenticated";

grant select on table "public"."notes" to "authenticated";

grant trigger on table "public"."notes" to "authenticated";

grant truncate on table "public"."notes" to "authenticated";

grant update on table "public"."notes" to "authenticated";

grant delete on table "public"."notes" to "service_role";

grant insert on table "public"."notes" to "service_role";

grant references on table "public"."notes" to "service_role";

grant select on table "public"."notes" to "service_role";

grant trigger on table "public"."notes" to "service_role";

grant truncate on table "public"."notes" to "service_role";

grant update on table "public"."notes" to "service_role";


  create policy "Enable delete for users based on user_id"
  on "public"."notes"
  as permissive
  for delete
  to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Enable insert for users based on user_id"
  on "public"."notes"
  as permissive
  for insert
  to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Enable update for users based on user_id"
  on "public"."notes"
  as permissive
  for update
  to authenticated
using (( SELECT (auth.uid() = notes.user_id)));



  create policy "Enable users to view their own data only"
  on "public"."notes"
  as permissive
  for select
  to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



