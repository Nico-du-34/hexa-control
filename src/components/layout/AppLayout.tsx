import type { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/servers', label: 'Serveurs' },
  { to: '/ssh', label: 'SSH' },
  { to: '/screen', label: 'Screen' },
  { to: '/fivem', label: 'FiveM' },
  { to: '/ufw', label: 'Firewall' },
  { to: '/database', label: 'Base de données' },
  { to: '/logs', label: 'Audit logs' }
];

export function AppLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>Hexa-Control</h1>
        <nav>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}
