import './App.css'
import Counter from './Counter'
import ProductDetails from './ProductDetails'
import Timer from './Timer'
import WindowWidth from './WindowWidth'
import PreferencesForm from './Preferences'
import FilterableScrollableList from './FilterableScrollableList'

function App() {

  return (
    <>
     <Counter></Counter>

     <br></br>

     <Timer></Timer>

     <br></br>
     
     <div>
      <h1>Monitor larghezza finestra</h1>
      <WindowWidth />
    </div>

    <br></br>

    <ProductDetails></ProductDetails>

    <br></br>

    <PreferencesForm></PreferencesForm>

    <br></br>

    <FilterableScrollableList></FilterableScrollableList>


    </>
  )
}

export default App
