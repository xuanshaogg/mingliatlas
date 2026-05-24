import { NextResponse, type NextRequest } from "next/server";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function readFormData(request: NextRequest): Promise<FormData | null> {
  try {
    return await request.formData();
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const formData = await readFormData(request);
  const name = String(formData?.get("name") ?? "").trim();
  const email = String(formData?.get("email") ?? "").trim();
  const message = String(formData?.get("message") ?? "").trim();

  if (name.length < 2 || !isValidEmail(email) || message.length < 10) {
    const invalidDestination = new URL("/contact", request.url);
    invalidDestination.searchParams.set("error", "invalid");
    return NextResponse.redirect(invalidDestination, 303);
  }

  const destination = new URL("/contact/submit/success", request.url);

  return NextResponse.redirect(destination, 303);
}
