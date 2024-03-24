import React from 'react';
import { FaDatabase } from 'react-icons/fa';
import { FaFileCsv } from 'react-icons/fa6';
import { TbApi } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import '../GérerTemplate/SpecifyDataSource.css'

const SpecifyDataSource = () => {
  const navigate1 = useNavigate();
  const navigate2 = useNavigate();
  const navigate3 = useNavigate();

  const handleNavigationF = () => {
    navigate1('/CSVFile');
  };

  const handleNavigationB = () => {
    navigate2('/DataBase');
  };

  const handleNavigationA = () => {
    navigate3('/APIData');
  };

  return (
    <div className='wrapper'>
          <h1>~ Intégration de Données ~</h1>
          <div className='select_box'>
              <p>Quelle est votre source de données ?</p>
              <button className="button" onClick={handleNavigationB}>Database <FaDatabase className='icon'/></button>
              <button className="button" onClick={handleNavigationF}>fichier.CSV <FaFileCsv className='icon'/></button>
              <button className="button" onClick={handleNavigationA}>API <TbApi className='icon'/></button>
              <div>
              <img className='img' src="./images/img3.png" alt="" />
              </div>
          </div>
    </div>
  );
};

export default SpecifyDataSource;
