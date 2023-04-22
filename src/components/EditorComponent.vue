<template>
  <div class="blog">
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
  </div>
</template>

<script setup>
import { watch, computed, ref, reactive } from 'vue';
// import { component as CKEditor } from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough.js';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import ListProperties from '@ckeditor/ckeditor5-list/src/listproperties.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js';
// import Table from '@ckeditor/ckeditor5-table/src/table.js';
// import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
// import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
// import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js';

const editor = ClassicEditor;

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const editorData = ref(props.modelValue || '');

const editorConfig = {
  plugins: [
    Alignment,
    Autoformat,
    BlockQuote,
    Bold,
    Code,
    Essentials,
    FontColor,
    FontFamily,
    FontSize,
    Heading,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    ListProperties,
    Paragraph,
    PasteFromOffice,
    Strikethrough,
    Subscript,
    Superscript,
    // Table,
    // TableCellProperties,
    // TableProperties,
    // TableToolbar,
    TextTransformation,
    TodoList,
    Underline
  ],
  toolbar: {
    items: [
      'heading',
      '|',
      'fontSize',
      'fontFamily',
      '|',
      'fontColor',
      '|',
      'bold',
      'italic',
      'underline',
      '|',
      'strikethrough',
      'subscript', 
      'superscript',
      '|',
      'todoList',
      'numberedList',
      'bulletedList',
      '|',
      'alignment',
      'outdent',
      'indent',
      '|',
      'link',
      'code',
      'blockQuote',
      // 'insertTable',
      '|',
      'undo',
      'redo'
    ]
  },
  language: 'en',
  // table: {
  //   contentToolbar: [
  //     'tableColumn',
  //     'tableRow',
  //     'mergeTableCells',
  //     'tableCellProperties',
  //     'tableProperties'
  //   ]
  // },
};

watch(editorData, () => {
  emit('update:modelValue', editorData.value)
})

</script>

<style scoped></style>