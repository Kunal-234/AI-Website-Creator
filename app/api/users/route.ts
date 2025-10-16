import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const email = user.primaryEmailAddress?.emailAddress ?? "";

  const userResult = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (userResult.length === 0) {
    const data = {
      name: user.fullName ?? "NA",
      email,
      credits: 2,
    };

    await db.insert(usersTable).values(data);
    return NextResponse.json({ user: data, message: "user created successfully" });
  }

  return NextResponse.json({ user: userResult[0] });
}
