import { useHexaStore } from '../../../store/useHexaStore';

export function UfwPage(): JSX.Element {
  const rules = useHexaStore((state) => state.ufwRules);

  return (
    <section>
      <h2>Firewall UFW</h2>
      <p className="muted">Toute action sensible doit être confirmée avant application.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Port</th>
              <th>Proto</th>
              <th>Source</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr key={rule.id}>
                <td>{rule.port}</td>
                <td>{rule.protocol}</td>
                <td>{rule.source}</td>
                <td>{rule.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button">Ajouter règle (avec confirmation)</button>
    </section>
  );
}
