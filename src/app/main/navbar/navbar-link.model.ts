export class NavBarLink {
  text: string;
  type: string;
  path: string;
  loggedInRequired: boolean;
  loggedOutRequired: boolean;
  requiresRole: boolean;
  role?: string;
}
