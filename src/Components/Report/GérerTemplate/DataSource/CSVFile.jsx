import React from 'react';
import { useState } from 'react';
import Papa from 'papaparse';
import '../DataSource/CSVFile.css'
import { MdUploadFile } from "react-icons/md";
import { MdFileDownloadDone } from "react-icons/md";



const CSVFile = () => {
    const [data, setData] = useState([]);
    const [headers, setHeaders ] = useState([]);
    const [fileName, setFileName] = useState("");
    const [buttonClicked , setButtonClicked] = useState(false);
    
    

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                setData(results.data);
                setHeaders(Object.keys(results.data[0]));
            },
        });
        setFileName(file.name);
    }

    return (
        <div className='wrapper'>
             <h1>~ Importation d'un fichier CSV ~</h1>
            <div className='select_box'>
                <p>importer votre fichier ici : </p>
            <input type="file" accept=".csv" onChange={handleFileUpload} id="fileInput"/>
            <div className='content'>
            <label htmlFor="fileInput" className="fileLabel">
                <div className='icons'>
                    {fileName ? <MdFileDownloadDone /> : <MdUploadFile />}
                </div>
                <span className='labeler'>Charger un fichier</span>
                <span id="fileName">{fileName ? `Nom du fichier : ${fileName}` : 'Aucun fichier sélectionné !'}</span>
            </label>
            </div>
            <button className={buttonClicked ? 'Générer_Button_Clicked' : 'button'} onClick={() => setButtonClicked(true)}>Générer</button>
                {buttonClicked && (
                   <div className='sousbutton'>
                          <button className='Format_Button'>Format PDF</button>
                          <button className='Format_Button'>Format HTML</button>
                          <button className='Format_Button'>Format Excel</button>
                    </div>
                            )}
            {<div className='table'>
            {data.length ? (
                <table className='table'>
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {headers.map((header, colIndex) => (
                                    <td key={colIndex}>{row[header]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
            </div> }
            </div>
        </div>
    );
}
export default CSVFile;



/*import React, { useState } from 'react';
import { MdUploadFile, MdFileDownloadDone } from "react-icons/md";
import '../DataSource/CSVFile.css';

const CSVFile = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        setFileName(uploadedFile.name);
    }

    const Envoyer_Données = () => {
        const formData = new FormData();
        formData.append('file', file);

        fetch("http://localhost:8080/SendData", {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de l'envoi du fichier");
            }
            return response.json();
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error("Erreur:", error.message);
        });
    }

    return (
        <div className='wrapper'>
            <input type="file" accept=".csv" onChange={handleFileUpload} id="fileInput" />
            <div className='content'>
                <label htmlFor="fileInput" className="fileLabel">
                    <div className='icons'>
                        {fileName ? <MdFileDownloadDone /> : <MdUploadFile />}
                    </div>
                    <span className='labeler'>Charger un fichier</span>
                    <span id="fileName">{fileName ? `Nom du fichier : ${fileName}` : 'Aucun fichier sélectionné !'}</span>
                </label>
            </div>
              <button className={buttonClicked ? 'Générer_Button_Clicked' : 'Générer_Button'} onClick={() => setButtonClicked(true)}>Générer</button>
                {buttonClicked && (
                   <div className='sousbutton'>
                          <button onClick={Envoyer_Données} className='FormatPDF_Button'>Format PDF</button>
                          <button onClick={Envoyer_Données} className='Format_Button'>Format HTML</button>
                          <button onClick={Envoyer_Données} className='FormatHTML_Button'>Format Excel</button>
                    </div>
                )}
        </div>
    );
}

export default CSVFile;
 */