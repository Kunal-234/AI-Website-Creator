import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log('Users API GET called');
    const user = await currentUser();
    console.log('User from Clerk:', user ? 'authenticated' : 'not authenticated');

    // For development testing - creating a mock user if not authenticated
    // if (!user) {
    //   console.log('No user found, returning mock user for testing');
    //   return NextResponse.json({
    //     success: true,
    //     user: {
    //       id: 1,
    //       name: "Test User",
    //       email: "test@example.com",
    //       credits: 2
    //     },
    //     message: "Mock user for development testing"
    //   });
    // }

    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    const userResult = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (userResult.length === 0) {
      return NextResponse.json({ 
        success: true,
        user: null,
        message: "User not found in database" 
      });
    }

    return NextResponse.json({ 
      success: true,
      user: userResult[0] 
    });
  } catch (error) {
    console.error('Error in users API GET:', error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('Users API POST called');
    const user = await currentUser();
    console.log('User from Clerk:', user ? 'authenticated' : 'not authenticated');

    // For development testing - create a mock user if not authenticated
    if (!user) {
      console.log('No user found, creating mock user for testing');
      return NextResponse.json({
        success: true,
        user: {
          id: 1,
          name: "Test User",
          email: "test@example.com",
          credits: 2
        },
        message: "Mock user created for development testing"
      });
    }

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    const userResult = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (userResult.length === 0) {
      const data = {
        name: user.fullName ?? "NA",
        email: email,
        credits: 2,
      };

      const newUser = await db.insert(usersTable).values(data).returning();
      return NextResponse.json({ 
        success: true,
        user: newUser[0], 
        message: "User created successfully" 
      });
    }

    return NextResponse.json({ 
      success: true,
      user: userResult[0] 
    });
  } catch (error) {
    console.error('Error in users API POST:', error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
