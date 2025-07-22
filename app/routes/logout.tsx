import { redirect } from "react-router";
import type { Route } from "./+types/logout";
import { getSessionFromCookie, deleteSession, createLogoutCookie } from "~/lib/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const sessionToken = getSessionFromCookie(cookieHeader);
  
  if (sessionToken) {
    deleteSession(sessionToken);
  }
  
  return redirect("/", {
    headers: {
      "Set-Cookie": createLogoutCookie(),
    },
  });
}