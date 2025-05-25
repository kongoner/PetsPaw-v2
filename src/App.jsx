import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
	return (
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<Layout />
		</BrowserRouter>
	);
}

export default App;
