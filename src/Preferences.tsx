import { useState, useEffect } from 'react';

// Definisce i possibili valori del tema
type Theme = 'light' | 'dark';
// Definisce i possibili valori della lingua
type Language = 'it' | 'en';

// Interfaccia che descrive la forma dell'oggetto preferenze
interface Preferences {
  theme: Theme;
  language: Language;
}

// Chiave usata per salvare e recuperare dati da localStorage
const PREFERENCES_KEY = 'user-preferences';

const PreferencesForm: React.FC = () => {
  // Stato locale per tenere traccia delle preferenze utente (tema e lingua)
  const [preferences, setPreferences] = useState<Preferences>({
    theme: 'light',      // valore di default tema
    language: 'it',      // valore di default lingua
  });

  // Primo useEffect: esegue il codice solo al montaggio del componente ([])
  // Serve a caricare eventuali preferenze salvate in precedenza da localStorage
  useEffect(() => {
    const saved = localStorage.getItem(PREFERENCES_KEY); // legge da localStorage
    if (saved) {
      try {
        const parsed: Preferences = JSON.parse(saved); // converte da stringa a oggetto
        setPreferences(parsed); // aggiorna lo stato con valori caricati
      } catch {
        // In caso di errore nel parsing JSON, ignora e mantiene i valori di default
      }
    }
  }, []);

  // Secondo useEffect: si attiva ogni volta che lo stato delle preferenze cambia ([preferences])
  // Serve a salvare automaticamente le preferenze aggiornate su localStorage
  useEffect(() => {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  }, [preferences]);

  // Funzione chiamata al cambio di valore del selettore tema
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPreferences(prev => ({
      ...prev,                 // copia lo stato precedente
      theme: e.target.value as Theme, // aggiorna solo il tema con il nuovo valore selezionato
    }));
  };

  // Funzione chiamata al cambio di valore del selettore lingua
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPreferences(prev => ({
      ...prev,                      // copia stato precedente
      language: e.target.value as Language, // aggiorna solo la lingua
    }));
  };

  return (
    // Form per modificare le preferenze utente
    <form>
      <label>
        Tema:
        {/* Select per scegliere tra 'light' e 'dark' */}
        <select value={preferences.theme} onChange={handleThemeChange}>
          <option value="light">Chiaro</option>
          <option value="dark">Scuro</option>
        </select>
      </label>
      <br />
      <label>
        Lingua:
        {/* Select per scegliere tra 'it' e 'en' */}
        <select value={preferences.language} onChange={handleLanguageChange}>
          <option value="it">Italiano</option>
          <option value="en">Inglese</option>
        </select>
      </label>
    </form>
  );
};

export default PreferencesForm;
