import React, { useState } from "react";
import { FaDatabase } from 'react-icons/fa'; 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../DataBase/DataBase.css'


const DataBase = () => {
    const [showSubButtons, setShowSubButtons] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [Tables_Name, setTables_Name] = useState([]);
    const [selectedTable_Name, setselectedTable_Name] = useState(null);
    const [buttonClicked , setButtonClicked] = useState(false);
    const [SQLRequete,setSQLRequete] = useState('');
    const [DataBaseConnexion, setDataBaseConnexion] = useState({
           username:"",
           base_name:"",
           password:"",
           host:"",
           port:""
});

  const handleChangeDataBase = (event) => {
     const { name, value } = event.target;
     setDataBaseConnexion(prevState => ({
       ...prevState,
       [name]: value
     }));
     if (value.trim() !== "") {
        setDataBaseConnexion(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
   };

  const handleSubmit1 = (event) => {
    event.preventDefault();
    sendDataConnexion(DataBaseConnexion);
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
  };

const handleChange = (e) => {
    const sqlQuery = e.target.value;
    setSQLRequete(sqlQuery);
};

const [Valide,setValide] = useState(false);

const validerSQLRequete = () => {
    const sqlQuery = SQLRequete.trim();
    const sqlRegex = /^(SELECT[ \t]+(?:\*|[\w\d_]+(?:,[ \t]*[\w\d_]+)*)[ \t]+FROM[ \t]+[\w\d_`"'\(\)]+(?:[ \t]+WHERE[ \t]+[\w\d_`"'\(\)=]+)?)$/;

    // Vérifier si la requête SQL correspond au motif
    const isValidSql = sqlRegex.test(sqlQuery);
    
    if (isValidSql) {
        // Si la requête est valide, effectuez une action ici, par exemple, envoyez la requête au serveur
        alert('Requête SQL valide', sqlQuery);
        setValide(true);
    } else {
        // Sinon, affichez un message d'erreur ou effectuez une autre action appropriée
        alert('Requête SQL invalide', sqlQuery);
    }
};


      const [showMOdal1, setShowModal1] = useState(false);
      const [showMOdal2, setShowModal2] = useState(false);
      const handleClose1 = () => setShowModal1(false);
      const handleShow1 = () => setShowModal1(true);
      const handleClose2 = () => setShowModal2(false);
      const handleShow2 = () => setShowModal2(true);


      const sendDataConnexion = (DataBaseConnexion) => {
        console.log(DataBaseConnexion);
        fetch('http://localhost:8080/createDataSource', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DataBaseConnexion),
        })
        .then(response => {
            if (response.ok) {
                alert('Connexion etablie avec succées');
            } else {
                throw new Error('Erreur lors de la connexion');
            }
        })
        .catch(error => {
            console.error('Erreur :', error);
            alert('Une erreur se produit');
        });
    }

    const Avoir_les_Nom_des_Tableaux = () => {
       const basename=(DataBaseConnexion.base_name)
        fetch(`http://localhost:8080/tables_Names/${basename}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des noms de tableaux");
                }
                return response.json();
            })
            .then(Tables_Name => {
                console.log("Noms des tableaux:", Tables_Name);
                setTables_Name(Tables_Name);
                setShowSubButtons(true);
            })
            .catch(error => {
                console.error("Erreur:", error.message);
            });
    };

    const Avoir_les_Nom_des_colonnes = (Tables_Name) => {
        fetch(`http://localhost:8080/columns_Name/${Tables_Name}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des noms de colonnes");
                }
                return response.json();
            })
            .then(data => {
                console.log("Noms des colonnes:", data);
                setSelectedData(data);
                setselectedTable_Name(Tables_Name);
            })
            .catch(error => {
                console.error("Erreur:", error.message);
            });
    };

    const GénererRapport = (selectedColumns) => {
        fetch("http://localhost:8080/generate_report_columns", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                columns: selectedColumns
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la génération du rapport");
            }
            return response.json();
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error("Erreur:", error.message);
        });
    };

    const GénererRapport2 = (SQLRequete) =>{
        fetch("http://localhost:8080/generate_report_SQLRequete", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(SQLRequete)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la génération du rapport");
            }
            return response.json();
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error("Erreur:", error.message);
        });
    };
    

    return (
        <div className='wrapper'>
            <h1>~ Les Bases de données disponibles ~</h1>
            <div className='select_box'>
                <p>Choisissez la base de données :</p>
                <button className="button" onClick={handleShow1}>MySQL <FaDatabase className='icon'/></button>
                <Modal show={showMOdal1} onHide={handleClose1}>
                  <Modal.Header closeButton>
                  <Modal.Title>Connection base de données</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                   <form onSubmit={handleSubmit1}>
                      <div className="form-group">
                      <label htmlFor="base_name">Donner le nom de la base de données :</label>
                      <input type="text" className="form-control" id="base_name" name="base_name" value={DataBaseConnexion.base_name} onChange={handleChangeDataBase}/>
                      </div>
                      <div className="form-group">
                      <label htmlFor="username">Donner le nom d'utilisateur de la base de données :</label>
                      <input type="text" className="form-control" id="username" name="username" value={DataBaseConnexion.username} onChange={handleChangeDataBase}/>
                      </div>
                      <div className="form-group">
                      <label htmlFor="password">Donner le mot de passe de la base de données :</label>
                      <input type="password" className="form-control" id="password" name="password" value={DataBaseConnexion.password} onChange={handleChangeDataBase}/>
                      </div>
                      <div className="form-group">
                      <label htmlFor="driverClassName">Donner le host de la base de données :</label>
                      <input type="text" className="form-control" id="host" name="host" value={DataBaseConnexion.host} onChange={handleChangeDataBase}/>
                      </div>
                      <div className="form-group">
                      <label htmlFor="driverClassName">Donner le Port de la base de données :</label>
                      <input type="text" className="form-control" id="port" name="port" value={DataBaseConnexion.port} onChange={handleChangeDataBase}/>
                      </div>
                      <div className="form-group">
                      <Button variant="primary" type="submit" style={{margin: "10px"}} onClick={Avoir_les_Nom_des_Tableaux}>
                          Envoyer
                       </Button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
                {/* Afficher les sous-boutons si showSubButtons est vrai */}
                {showSubButtons && (
                    <div>
                    <div className="sousbutton">
                        {Tables_Name.map((Tables_Name, index) => (
                            <button className="Format_Button" key={index} onClick={() => Avoir_les_Nom_des_colonnes(Tables_Name)}>{Tables_Name}</button>
                        ))}
                    </div>
                    <div className="sousbutton2">
                    <button className="Format_Button2" onClick={handleShow2}>Requéte SQL</button>
                    </div>
                    <Modal show={showMOdal2} onHide={handleClose2}>
                  <Modal.Header closeButton>
                  <Modal.Title>Intégrer données par une requéte SQL</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <form onSubmit={handleSubmit2}>
                      <div className="form-group">
                      <label htmlFor="base_name">ecrire une requéte SQL :</label>
                      <input type="text" className="form-control" value={SQLRequete} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                      <Button variant="primary" type="submit" style={{margin: "10px"}} onClick={validerSQLRequete}>
                            valider
                       </Button>
                       {Valide && (
                           <Button variant="primary" type="submit" style={{margin: "10px"}} onClick={GénererRapport2}>
                              générer 
                          </Button>
                       )}
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
                    {/* <div className="sousbutton2">
                    <button className="Format_Button2" onClick={handleShow2}>Requéte SQL</button>
                    {buttonClicked && (
                   <div className='sousbutton'>
                        <input className="SQLRequete" placeholder="ecrire une requéte SQL" value={SQLRequete} onChange={handleChange} />
                    </div>
                            )}
                    </div>*/}
                    </div>
                )}
                {/* Afficher des cases à cocher si une source est sélectionnée */}
                {selectedTable_Name && (
                    <div>
                        <p className="parag">Choisissez les données à utiliser pour {selectedTable_Name}</p>
                    <div className="checkboxes">
                        {selectedData.map((data, index) => (
                            <div key={index}>
                                <input type="checkbox" id={`data${index + 1}`} name={`data${index + 1}`}/>
                                <label htmlFor={`data${index + 1}`}>{data}</label>
                            </div>
                        ))}
                    </div>
                    <button className={buttonClicked ? 'Générer_Button_Clicked' : 'button'} onClick={() => {GénererRapport(selectedData); setButtonClicked(true);}}>Générer</button>
                {buttonClicked && (
                   <div className='sousbutton'>
                          <button className='Format_Button'>Format PDF</button>
                          <button className='Format_Button'>Format HTML</button>
                          <button className='Format_Button'>Format Excel</button>
                    </div>
                            )}
                    </div>
                )}
            </div>
        </div>
    );
};


export default DataBase;
