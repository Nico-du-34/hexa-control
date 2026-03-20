import { useHexaStore } from '../../../store/useHexaStore';

export function DatabasePage(): JSX.Element {
  const profiles = useHexaStore((state) => state.dbProfiles);

  return (
    <section>
      <h2>Base de données</h2>
      <div className="grid cards">
        {profiles.map((profile) => (
          <article className="card" key={profile.id}>
            <h3>{profile.engine.toUpperCase()}</h3>
            <p>{profile.database}</p>
            <p>{profile.user}@{profile.host}:{profile.port}</p>
            <button type="button">Tester connexion</button>
            <button type="button">Exécuter requête SQL</button>
          </article>
        ))}
      </div>
    </section>
  );
}
