import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const destination = new URL("/subscribe/success", request.url);

  return NextResponse.redirect(destination, 303);
}
