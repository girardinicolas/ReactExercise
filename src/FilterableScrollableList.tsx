import { useState, useRef, useLayoutEffect } from 'react';

// Definizione del tipo Item con id, nome e categoria
interface Item {
  id: number;
  name: string;
  category: string;
}

// Dati sample di esempio: lista di oggetti con categoria
const items: Item[] = [
  { id: 1, name: 'Elemento 1', category: 'A' },
  { id: 2, name: 'Elemento 2', category: 'B' },
  { id: 3, name: 'Elemento 3', category: 'A' },
  { id: 4, name: 'Elemento 4', category: 'C' },
  { id: 5, name: 'Elemento 5', category: 'B' },
];

// Possibili categorie (All per mostrare tutti)
const categories = ['All', 'A', 'B', 'C'];

const FilterableScrollableList: React.FC = () => {
  // Stato per tenere il filtro categoria selezionato, default 'All'
  const [filter, setFilter] = useState<string>('All');
  // Ref al contenitore scrollabile
  const containerRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect serve per eseguire codice subito dopo i cambiamenti di DOM,
  // ma PRIMA che il browser esegua il paint. Qui serve per resettare lo scrollTop a 0
  // così da non vedere flicker di scroll quando cambia il filtro.
  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0; // porta scroll all'inizio
    }
  }, [filter]); // si esegue ogni volta che cambia il filtro

  // Calcola la lista filtrata in base al filtro selezionato
  const filteredItems = filter === 'All'
    ? items
    : items.filter(item => item.category === filter);

  return (
    <>
      {/* Selettore per scegliere la categoria filtro */}
      <label>
        Categoria:
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      {/* Contenitore scrollabile con altezza fissa e overflow verticale */}
      <div
        ref={containerRef}
        style={{
          marginTop: 10,
          height: 150,
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: 10,
        }}>
        {/* Mappa gli elementi filtrati in singoli div */}
        {filteredItems.map(item => (
          <div key={item.id} style={{ padding: '5px 0' }}>
            {item.name} (Categoria: {item.category})
          </div>
        ))}
        {/* Messaggio quando non ci sono elementi */}
        {filteredItems.length === 0 && <div>Nessun elemento</div>}
      </div>
    </>
  );
};

export default FilterableScrollableList;
