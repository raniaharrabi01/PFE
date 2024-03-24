import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import grapesjs from "grapesjs";
import './CreateTemplate.css'
import "grapesjs/dist/css/grapes.min.css";
import '../Report/CreateTemplate.css';
import AddButtons from '../Report/GérerTemplate/AddButtons';
import AddTableau from '../Report/GérerTemplate/AddTableau';

import gjsPrestWebpage from "grapesjs-preset-webpage";
import grapesjsPluginForms from "grapesjs-plugin-forms";
import grapesjsPluginCkeditor from "grapesjs-plugin-ckeditor";
import grapesjsTuiImageEditor from "grapesjs-tui-image-editor";
import grapesjsBlocksBasic from "grapesjs-blocks-basic";
import grapesjsComponentCountdown from "grapesjs-component-countdown";
import grapesjsStyleGradient from "grapesjs-style-gradient";
import grapesjsStyleFilter from "grapesjs-style-filter";
import grapesjsStyleBg from "grapesjs-style-bg";
import gjsBlocksFlexbox from "grapesjs-blocks-flexbox";
import grapesjsTooltip from "grapesjs-tooltip";
import grapesjsCustomCode from "grapesjs-custom-code";
import grapesjsIndexeddb from "grapesjs-indexeddb";
import grapesjsTyped from "grapesjs-typed";

const CreateTemplate = () => {


    const [editor,setEditor] = useState(null);

    useEffect (() => {
       const newEditor = grapesjs.init({
      container: "#editor",
      plugins: [gjsPrestWebpage, grapesjsPluginForms, AddTableau, AddButtons, grapesjsPluginCkeditor, grapesjsTuiImageEditor, 
                gjsBlocksFlexbox, grapesjsCustomCode, grapesjsIndexeddb, grapesjsTyped,
                grapesjsBlocksBasic, grapesjsComponentCountdown, grapesjsStyleGradient, grapesjsStyleFilter, grapesjsStyleBg, 
                grapesjsTooltip],
      pluginsOpts:{
      },
      });
      setEditor(newEditor);
    }, []);
        return (
            <div className='App'>
              <div id='editor'></div>
          </div>
        );
    }

export default CreateTemplate;