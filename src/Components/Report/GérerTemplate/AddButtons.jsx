import SaveTemplate from './SaveTemplate';

function AddButtons({ editor }) {
    editor.Panels.addPanel({
        buttons: [
          {
            id: 'return-button',
            className: 'btn-return',
            label: 'Retour',
            command() {
              window.location.href = '/WelcomePage';       
            },
          },
          {
            id: 'save-button',
            className: 'btn-save',
            label: 'Enregistrer le modéle',
            command(editor) {
              SaveTemplate(editor);

           },
          },
          {
            id: 'open-button',
            className: 'btn-open',
            label: 'Récupérer un modéle',
            command(editor) {
              window.location.href = '/RetrieveModel';
            },
          },
          {
            id: 'specifie-button',
            className: 'btn-specifie',
            label: 'Spécifier la source de données',
            command(editor) {
              const default_Html = "<body id='ij2x'></body>";
             const RegulierExp = /\${[A-Za-z][a-z0-9_]+}/g;
              // Expression régulière pour rechercher "${une_chaine_au_milieu}"
              // Vérifier si le contenu de editor.getHtml() contient l'expression régulière
              if (editor.getHtml() === default_Html || !editor.getHtml().match(RegulierExp)) {
                  alert("Vous devez remplir les champs par les noms spécifiques.");
              } else {
                  window.location.href = '/SpecifyDataSource';
              }
          }
          },
        ],
      }); 
    }

export default AddButtons;