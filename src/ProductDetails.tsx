import { useState, useEffect } from 'react';

// Definiamo l'interfaccia Product per tipare i dati del prodotto
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  // altri campi se necessari
}

export default function ProductDetails() {
  // Stato per il productId, inizializzato a 1
  const [productId, setProductId] = useState<number>(1);

  // Stato per i dati del prodotto, può essere un Product oppure null (inizialmente null)
  const [data, setData] = useState<Product | null>(null);

  // Stato che indica se la fetch è in corso
  const [loading, setLoading] = useState<boolean>(false);

  // Stato per eventuali errori (stringa o null)
  const [error, setError] = useState<string | null>(null);

  // useEffect viene eseguito ogni volta che cambia productId
  useEffect(() => {
    // Se productId è falsy (es. zero), non facciamo fetch e cancelliamo i dati precedenti
    if (!productId) {
      setData(null);
      return;
    }

    // Creiamo un AbortController per poter abortire la fetch se necessario
    const controller = new AbortController();
    const signal = controller.signal;

    // Impostiamo loading a true perché stiamo per fare una fetch
    setLoading(true);
    // Resettiamo l'eventuale errore precedente
    setError(null);

    // Effettuiamo la fetch con l'URL costruito usando productId
    // Passiamo signal per poter abortire la fetch se cambia productId o si smonta il componente
    fetch(`https://fakestoreapi.com/products/${productId}`, { signal })
      .then(res => {
        // Se lo stato HTTP non è OK, generiamo un errore che verrà catturato nel catch
        if (!res.ok) throw new Error(`Errore HTTP: ${res.status}`);
        // Se va bene, convertiamo la risposta in JSON
        return res.json();
      })
      .then((json: Product) => {
        // Impostiamo i dati ricevuti nello stato
        setData(json);
        // Disabilitiamo il loading perché la fetch è terminata
        setLoading(false);
      })
      .catch(err => {
        // Se la fetch è stata abortita, ignoriamo l'errore
        if (err.name === 'AbortError') {
          console.log('Fetch abortita');
        } else {
          // Altrimenti salviamo l'errore e fermiamo il loading
          setError(err.message);
          setLoading(false);
        }
      });

    // Cleanup: questa funzione viene eseguita quando productId cambia o il componente si smonta
    // Serve per abortire la fetch in corso e evitare aggiornamenti di stato su componenti non montati
    return () => {
      controller.abort();
    };
  }, [productId]); // dipendenza productId: esegue l'effetto ad ogni cambio di productId

  return (
    <div>
      <h2>Dettagli Prodotto</h2>
      {/* Input numerico per cambiare il productId */}
      <input
        type="number"
        value={productId}
        onChange={e => setProductId(Number(e.target.value))}
        min={1}
      />
      {/* Messaggi di stato: caricamento o errore */}
      {loading && <p>Caricamento...</p>}
      {error && <p style={{ color: 'red' }}>Errore: {error}</p>}
      {/* Se abbiamo dati, mostriamo i dettagli */}
      {data && (
        <div>
          <h3>{data.title}</h3>
          <p>{data.description}</p>
          <p>Prezzo: €{data.price}</p>
        </div>
      )}
    </div>
  );
}