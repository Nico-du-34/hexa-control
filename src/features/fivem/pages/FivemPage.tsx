import { useHexaStore } from '../../../store/useHexaStore';

export function FivemPage(): JSX.Element {
  const states = useHexaStore((state) => state.fivemStates);
  const applyFivemUpdate = useHexaStore((state) => state.applyFivemUpdate);

  const onUpdate = (serverId: string) => {
    const ok = window.confirm('Confirmer: backup + update artifacts + restart service FiveM ?');
    if (!ok) return;
    applyFivemUpdate(serverId);
  };

  return (
    <section>
      <h2>Gestion FiveM</h2>
      {states.map((state) => (
        <article className="card" key={state.serverId}>
          <h3>Serveur: {state.serverId}</h3>
          <p>Artifacts version: {state.artifactsVersion}</p>
          <p>Mise à jour: {state.updateAvailable ? 'Disponible' : 'À jour'}</p>
          <button type="button" disabled={!state.updateAvailable} onClick={() => onUpdate(state.serverId)}>
            Sauvegarder et mettre à jour
          </button>
          <h4>Ressources</h4>
          <ul>
            {state.resources.map((resource) => (
              <li key={resource.name}>{resource.name} — {resource.enabled ? 'ON' : 'OFF'}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}
