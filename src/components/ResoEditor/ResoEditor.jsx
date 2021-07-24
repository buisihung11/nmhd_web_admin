import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import spinnerPath from './spinner.svg';
import 'react-quill/dist/quill.snow.css';

import ImageResize from 'quill-image-resize-module-react';
import storage from '@/services/firebase';

Quill.register('modules/imageResize', ImageResize);

// Add fonts to whitelist
// var fonts = ['sofia', 'roboto'];
// var Font = Quill.import('formats/font');
// Font.whitelist = fonts;
// Quill.register(Font, true);

// Handle Inline module Align not working
const Align = Quill.import('attributors/style/align');
Quill.register(Align, true);

function imageUpload() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();
  input.onchange = async () => {
    const file = input.files[0];

    // Save current cursor state
    const range = this.quill.getSelection(true);

    // Insert temporary loading placeholder image
    this.quill.insertEmbed(range.index, 'image', spinnerPath);

    // Move cursor to right side of image (easier to continue typing)
    this.quill.setSelection(range.index + 1);
    let imageURL;
    const metadata = {
      contentType: 'image/jpeg',
    };
    const storageRef = await storage.ref();
    const imageName = file.name ?? 'Image.png'; //a unique name for the image
    const imgFile = storageRef.child(`images/${imageName}`);
    try {
      await imgFile.put(file, metadata);
      imageURL = await imgFile.getDownloadURL();
    } catch (e) {
      console.log(`e`, e);
    }

    // Remove placeholder image
    this.quill.deleteText(range.index, 1);
    this.quill.insertEmbed(range.index, 'image', imageURL);
  };
}

const ResoEditor = (props) => {
  const [editorHtml, setEditorHtml] = useState('');
  const handleChange = (html) => setEditorHtml(html);

  const modules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ background: [] }],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
          { align: [] },
        ],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: { image: imageUpload },
    },
    clipboard: { matchVisual: false },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize'],
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'size',
    'color',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'background',
    'font',
    'width',
  ];

  //end FAKE
  return <ReactQuill modules={modules} formats={formats} {...props} onchange={handleChange} />;
};

export default ResoEditor;
