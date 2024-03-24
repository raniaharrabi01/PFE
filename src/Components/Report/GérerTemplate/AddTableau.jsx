import React from "react";

const AddTableau = (editor) => {
  // Ajoutez le bloc de tableau
  editor.Blocks.add('my-table-block', {
    label: `
     <div>
      <img src="../images/icon_table.jpg" alt="Image" style="width: 50px; height: 70px; margin-right: 5px; margin-bottom: 12px;">
      <span style="margin-top: 50px;">Table</span>
    </div>
  `,content: `
      <table  style="border-collapse: collapse; width: 100%;">
      <tbody  style="padding: 10px;">
        <tr style="border: 1px solid #000;">
          <th id="cell-1-1" style="border: 1px solid #000;">colonne 1</th>
          <th id="cell-1-2" style="border: 1px solid #000;">colonne 2</th>
        </tr>
        <!--{Data.map((data, index) => (-->
          <tr style="border: 1px solid #000;" th:each="data" : >
        <td id="cell-3-1" style="border: 1px solid #000; height: 30px;">oooo</td>
        <td id="cell-3-2" style="border: 1px solid #000; height: 30px;">oooo</td>
      </tr>
      <!--)}-->
      </tbody>
      </table>
    `,
    /*attributes: { class: "fa fa-file-image-o", src: "#" },
    category: "Media Library",*/
  });
  editor.on('component:selected', () => {   // Ajouter un événement de clic pour éditer les cellules
    const selectedComponent = editor.getSelected();
    if (selectedComponent && selectedComponent.getEl()) {
      const table = selectedComponent.getEl().querySelector('table');
      if (table) {
        table.querySelectorAll('th').forEach((cell) => {
          cell.addEventListener('click', () => {
            cell.setAttribute('contenteditable', true);
          });
        });
      }
    }
  });
}
export default AddTableau;