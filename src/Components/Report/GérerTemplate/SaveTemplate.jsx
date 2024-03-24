{/*
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';

const SaveTemplate = ({ editor }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [htmlData, setHtmlData] = useState('');
    const [cssData, setCssData] = useState('');

    useEffect(() => {
        // This assumes editor.getHtml and editor.getCss are synchronous. If they're not, you'll need to adjust this.
        setHtmlData(editor.getHtml());
        setCssData(editor.getCss());
    }, [editor]); // Re-run if editor changes.

    const Html = htmlData.replace(/"/g, "'");
    const default_Html = "<body id='ij2x'></body>";
    const dataModel = { "htmlData": Html, "cssData": cssData };

    const handleSave = () => {
        if (Html === default_Html) {
            alert('Préparez votre modèle');
        } else {
            fetch('http://localhost:8080/Model/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataModel),
            })
            .then(response => {
                if (response.ok) {
                    alert('Modèle enregistré avec succès');
                } else {
                    throw new Error('Erreur lors de l"enregistrement du modèle');
                }
            })
            .catch(error => {
                console.error('Erreur :', error);
                alert('Une erreur s"est produite lors de l"enregistrement du modèle');
            });
        }
    }
return (
        <>
            <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Template Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalOpen(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <Button
                id="save-button"
                className="btn-save"
                label="Enregistrer le modèle"
                onClick={() => setModalOpen(true)}
            >
                Enregistrer le modèle
            </Button>
        </>
    )
}
export default SaveTemplate;
*/}

const SaveTemplate = (editor) => {
    const htmlData = editor.getHtml();
    const cssData = editor.getCss();
    const Html = htmlData.replace(/"/g, "'");
    const default_Html = "<body id='ij2x'></body>";
    const dataModel = { htmlData: Html, cssData: cssData };
    console.log(dataModel);
    // Envoyer la requête POST au backend pour enregistrer le modèle
    if (Html === default_Html) {
      alert("Préparez votre modèle");
    } else {
      fetch("http://localhost:8080/Model/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataModel),
      })
        .then((response) => {
          if (response.ok) {
            alert("Modèle enregistré avec succès");
          } else {
            throw new Error("Erreur lors de l'enregistrement du modèle");
          }
        })
        .catch((error) => {
          console.error("Erreur :", error);
          alert("Une erreur s'est produite lors de l'enregistrement du modèle");
        });
    }
  };
  
  export default SaveTemplate;