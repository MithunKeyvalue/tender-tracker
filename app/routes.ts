import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("signup", "routes/signup.tsx"),
  route("logout", "routes/logout.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("tender-details/:id", "routes/tender-details.$id.tsx"),
  route("admin", "routes/admin.tsx", [
    index("routes/admin.dashboard.tsx"),
    route("contractors", "routes/admin.contractors.tsx"),
    route("active-tenders", "routes/admin.active-tenders.tsx"),
    route("messages-sent", "routes/admin.messages-sent.tsx"),
    route("templates", "routes/admin.templates.tsx"),
    route("settings", "routes/admin.settings.tsx"),
  ]),
] satisfies RouteConfig;
