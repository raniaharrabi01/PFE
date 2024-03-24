import './App.css';
import Authentification from'./Components/Authentification';
import WelcomePage from './Components/WelcomePage';
import CreateTemplate from './Components/Report/CreateTemplate';
import SpecifyDataSource from './Components/Report/GérerTemplate/SpecifyDataSource';
import DataBase from './Components/Report/GérerTemplate/DataSource/DataBase/DataBase';
import CSVFile from './Components/Report/GérerTemplate/DataSource/CSVFile';
import RetrieveModel from './Components/Report/GérerTemplate/RetrieveModel';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentification />} />
        <Route path="/WelcomePage" element={<WelcomePage />} />
        <Route path="/CreateTemplate" element={<CreateTemplate />} />
        <Route path="/SpecifyDataSource" element={<SpecifyDataSource />} />
        <Route path="/DataBase" element={<DataBase />} />
        <Route path="/CSVFile" element={<CSVFile />} />
        <Route path="/RetrieveModel" element={<RetrieveModel />} />



      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
