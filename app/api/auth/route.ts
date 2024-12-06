import { users } from "@/db/db";
import { NextResponse } from "next/server";

// Mocked Users Data (use `users` from `db.js`)
const generateToken = (username: string) => {
  return Buffer.from(`${username}:${Date.now()}`).toString("base64");
};

// Store logged-in user sessions (temporary in-memory store)
const sessions: { [key: string]: string } = {};

export async function POST(req: Request) {
  const { username, password, type } = await req.json();

  if (type === "login") {
    const user = users.find((user) => user.username === username);
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate a token for the user
    const token = generateToken(username);
    sessions[token] = username; // Store the session

    // Send the token back to the client
    return NextResponse.json({ success: true, token });
  }

  if (type === "signup") {
    if (users.some((user) => user.username === username)) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }
    users.push({ username, password });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
