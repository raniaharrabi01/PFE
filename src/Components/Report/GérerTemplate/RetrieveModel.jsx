import React, { useState, useEffect } from 'react';



const RetrieveModel = () => {
  const [data, setData] = useState([]);
  const [record, setrecord] = useState(data);

   // editor.addComponents(`<p>hhhh</p>`);

  useEffect(() => {
    rechercherMedéle(); // Appel de la fonction lors du montage du composant
  }, []); // Utilisation d'un tableau vide pour déclencher l'effet une seule fois lors du montage

  const rechercherMedéle = () => {
    fetch('http://localhost:8080/Model/getModelData')
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des modéles");
        }
        return response.json();
      })
      .then(modelData => {
        setData(modelData);
        setrecord(modelData);
      })
      .catch(error => {
        console.error("Erreur:", error.message);
        // Gérer l'erreur, par exemple, afficher un message à l'utilisateur
      });
  }
      const Filter = (event) =>{
            setrecord(data.filter(f => f.modelName.toLowerCase().includes(event.target.value))); 
     }
  return (
    <div className="wrapper">
      <div className='pt-5 d-flex flex-column align-items-center'>
        <input className="form-control w-50 mb-3" type='text' placeholder='rechercher un modéle' onChange={Filter}/>
        <div className="text-center"> {/* Div pour centrer le tableau */}
        <table className="table w-40">
          <thead>
            <tr>
              <th scope="col">Nom du Modéle</th>
              <th scope="col">Date d'enregistrements</th>
            </tr>
          </thead>
          <tbody>
            {record.map((model, index) => (
              <tr key={index}>
                <td>{model.modelName}</td>
                <td>{model.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}  

export default RetrieveModel;

