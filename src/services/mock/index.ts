type ApiResponse = { ok: boolean; data?: any; error?: string };

const MOCK_DELAY = 600;

function delay(ms = MOCK_DELAY) {
  return new Promise((r) => setTimeout(r, ms));
}

function getTokenFromHeaders(headers?: Record<string, string>): string | null {
  const authHeader = headers?.authorization ?? headers?.Authorization;
  return authHeader &&
    typeof authHeader === "string" &&
    authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;
}

function handleLogin(body?: any): ApiResponse {
  if (body?.email === "user@example.com" && body?.password === "password") {
    return {
      ok: true,
      data: {
        token: "mock-token",
        user: { email: body.email, name: "Mock User" },
      },
    };
  }
  return { ok: false, error: "Invalid credentials (mock)" };
}

function handleRegister(body?: any): ApiResponse {
  return {
    ok: true,
    data: { message: "Registered (mock)", email: body?.email },
  };
}

function handleForgot(): ApiResponse {
  return { ok: true, data: { message: "Reset email (mock)" } };
}

function handleAuth(token: string | null): ApiResponse {
  if (token === "mock-token") {
    return {
      ok: true,
      data: { user: { email: "user@example.com", name: "Mock User" } },
    };
  }
  return { ok: false, error: "Unauthorized (mock)" };
}

function handleReset(token: string | null): ApiResponse {
  if (token === "mock-token") {
    return { ok: true, data: { message: "Password reset (mock)" } };
  }
  return { ok: false, error: "Invalid reset token (mock)" };
}

export async function handleMockRequest(
  path: string,
  method = "GET",
  body?: any,
  headers?: Record<string, string>
): Promise<ApiResponse> {
  await delay();

  const token = getTokenFromHeaders(headers);

  if (path === "/auth/login" && method === "POST") return handleLogin(body);
  if (path === "/auth/register" && method === "POST")
    return handleRegister(body);
  if (path === "/auth/forgot" && method === "POST") return handleForgot();
  if (path === "/auth" && (method === "GET" || method === "POST"))
    return handleAuth(token);
  if (path === "/auth/reset" && method === "POST") return handleReset(token);

  return { ok: false, error: "Not found (mock)" };
}

export default { handleMockRequest };
