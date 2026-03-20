import { useState } from 'react';
import { useHexaStore } from '../../../store/useHexaStore';

export function DatabasePage(): JSX.Element {
  const profiles = useHexaStore((state) => state.dbProfiles);
  const appendLog = useHexaStore((state) => state.appendLog);
  const [sql, setSql] = useState('SELECT NOW();');
  const [result, setResult] = useState('');

  const runSql = (profileId: string) => {
    const isDangerous = /(drop|truncate|delete\s+from)/i.test(sql);
    if (isDangerous) {
      const ok = window.confirm('Requête potentiellement destructive. Confirmer exécution ?');
      if (!ok) return;
    }
    setResult(`[MOCK:${profileId}] ${sql}\nrows: 1`);
    appendLog({
      id: crypto.randomUUID(),
      category: 'database',
      action: 'run-query',
      status: isDangerous ? 'warning' : 'success',
      message: sql,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <section>
      <h2>Base de données</h2>
      <div className="inline-form">
        <input value={sql} onChange={(event) => setSql(event.target.value)} placeholder="Requête SQL" />
      </div>
      <div className="grid cards">
        {profiles.map((profile) => (
          <article className="card" key={profile.id}>
            <h3>{profile.engine.toUpperCase()}</h3>
            <p>{profile.database}</p>
            <p>{profile.user}@{profile.host}:{profile.port}</p>
            <button type="button">Tester connexion</button>
            <button type="button" onClick={() => runSql(profile.id)}>Exécuter requête SQL</button>
          </article>
        ))}
      </div>
      <pre>{result || 'Aucun résultat.'}</pre>
    </section>
  );
}
