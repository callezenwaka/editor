<template>
  <div class="editor">
    <h2>Text Editor</h2>
    <div class="editor--header">
      <button class="editor--button" type="button"><b><strong>B</strong></b></button>
      <button class="editor--button" type="button"><b><i>I</i></b></button>
      <button class="editor--button" type="button"><b><u>U</u></b></button>
      <button class="editor--button" type="button"><b>X<sup>1</sup></b></button>
      <button class="editor--button" type="button"><b>X<sub>1</sub></b></button>
      <button class="editor--button" type="button">T</button>
    </div>
    <hr>
    <div class="body">
      <div class="form--item">
        <div class="editor--header">
          <!-- <button class="editor--button" @click.prevent="handleSelect($event)" :class="button.type" type="button" :id="button.id" :ref="el => { buttonRef[index] = el }" v-for="(button, index) in buttons" v-html="button.text"></button> -->
          <button class="editor--button format" id="bold" ref="boldButtonRef" type="button" @click.prevent="handleSelect(boldButtonRef)"><b><strong>B</strong></b></button>
          <button class="editor--button format" id="italic" ref="italicsButtonRef" type="button" @click.prevent="handleSelect(italicsButtonRef)"><b><i>I</i></b></button>
          <button class="editor--button format" id="underline" ref="underlineButtonRef" type="button" @click.prevent="handleSelect(underlineButtonRef)"><b><u>U</u></b></button>
          <button class="editor--button script" id="superscript" ref="superscriptButtonRef" type="button" @click.prevent="handleSelect(superscriptButtonRef)"><b>X<sup>1</sup></b></button>
          <button class="editor--button script" id="subscript" ref="subscriptButtonRef" type="button" @click.prevent="handleSelect(subscriptButtonRef)"><b>X<sub>1</sub></b></button>
          <!-- <button class="editor--button" type="button">T</button> -->
        </div>
        <div id="text-input" ref="contentRef" contenteditable="true">This is an equation of type \sqrt(x^2+y^2\ )=z^2</div>
        <!-- <p>This is an equation of type \sqrt(x^2+y^2\ )=z^2</p> -->
        <!-- <label class="form--label required" for="description">Desc: </label>
        <textarea class="form--input" name="description" id="description" v-model.trim="description" @change="handleAdjust($event)" @keyup="handleAdjust($event)" @focus="handleWrite($event)"></textarea>
        <label class="form--label required" for="name">Name:</label>
        <input class="form--input" type="text" name="name" v-model="name" id="name" placeholder="Exam name" aria-required="true" aria-invalid="false" required> -->
      </div>
      <!-- 𝐇𝐞𝐥𝐥𝐨 𝐭𝐞𝐱𝐭 𝐬𝐭𝐫𝐢𝐧𝐠 𝐦𝐲 𝐨𝐥𝐝 𝐟𝐫𝐢𝐞𝐧𝐝. -->
      <!-- <div id="text-input" contenteditable="true"></div> -->
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { onMounted, onBeforeUpdate, computed, ref, reactive } from 'vue';

const props = defineProps({
  // data: {
  //   type: Array,
  //   required: true
  // },
});

// const emit = defineEmits(["pagechanged"]);
var buttons = ref([
  {id: 'bold', text: `<b><strong>B</strong></b>`, type: 'format'}, 
  {id: 'italic', text: `<b><i>I</i></b>`, type: 'format'}, 
  {id: 'underline', text: `<b><u>U</u></b>`, type: 'format'}, 
  {id: 'superscript', text: `<b>X<sup>1</sup></b>`, type: 'script'}, 
  {id: 'subscript', text: `<b>X<sub>1</sub></b>`, type: 'script'}
]);
var buttonRef = ref([]);
var name = ref('');
var description = ref('');
var boldButtonRef = ref([]);
var italicsButtonRef = ref([]);
var underlineButtonRef = ref([]);
var superscriptButtonRef = ref([]);
var subscriptButtonRef = ref([]);
var contentRef = ref([]);

onMounted(async () => {
  // console.log(buttonRef.value[0].classList.contains('format'))
  // className
  // await initializer();
  // await formatter();
});

// Make sure to reset the refs before each update.
onBeforeUpdate(() => {
  buttonRef.value = [];
});

const handleSelect = (value) => {
  console.log('value: ', value.id)
  document.execCommand(value.id)
  // const userSelection = document.getSelection();
  // console.log('userSelection: ', userSelection)
  // const strongElement = document.createElement("strong");
  // const userSelection = window.getSelection();
  // const selectedTextRange = userSelection.getRangeAt(0);
  // selectedTextRange.surroundContents(strongElement);
  // console.log(userSelection)
  // buttonRef.value.forEach((button) => {
  //   console.log(button)
  //   button.addEventListener("click", () => {
  //     const strongElement = document.createElement("strong");
  //     const userSelection = window.getSelection();
  //     const selectedTextRange = userSelection.getRangeAt(0);
  //     selectedTextRange.surroundContents(strongElement);
  //     console.log('button: ', button)
  //   });
  // });
};

const initializer = async() => {
  buttonRef.value.forEach((button) => {
    if (buttonRef.value[0].classList.contains('format')) {
      highlighter(button, false);
    }
    if (buttonRef.value[0].classList.contains('script')) {
      highlighter(button, true);
    }
  });
}

const formatter = async(e) => {
  console.log(e)
  //For basic operations which don't need value parameter
  buttonRef.value.forEach((button) => {
    button.addEventListener("click", () => {
      modifyText(button.id, false, null);
    });
  });
};

//main logic
const modifyText = (command, defaultUi, value) => {
  //execCommand executes command on selected text
  document.execCommand(command, defaultUi, value);
};

//Highlight clicked button
const highlighter = (button, needsRemoval) => {
  console.log('button: ', button)
  // className.forEach((button) => {
    button.addEventListener("click", () => {
      //needsRemoval = true means only one button should be highlight and other would be normal
      if (needsRemoval) {
        let alreadyActive = false;
        //If currently clicked button is already active
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }
        //Remove highlight from other buttons
        highlighterRemover(className);
        if (!alreadyActive) {
          //highlight clicked button
          button.classList.add("active");
        }
      } else {
        //if other buttons can be highlighted
        button.classList.toggle("active");
      }
    });
  // });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

</script>

<style scoped>
.editor {
  display: flex;
  height: calc(100% - 1.25rem);
  flex-direction: column;
}
.editor--header {
  display: flex;
}
.editor--button {
  border: 1px solid silver;
  /* margin-left: 5px; */
  /* margin-right: 5px; */
}
hr {
  border: 1px solid silver;
  width: 100%;
}
/* (A) MATH SYMBOL "WRAPPER" */
.math { display: inline-block; }
 
/* (B) SMALL FONT SIZE FOR SUPER & SUB SCRIPT */
.math .smol {
  font-size: 0.9em;
  height: 0.9em;
}
 
/* (C) BIG FONT SIZE FOR SYMBOL ITSELF */
.math .big {
  font-size: 1.4em;
  height: 1.4em;
}


.form--item {
  display: flex;
  flex-direction: column;
  border: none;
  margin: 0px 0px 1.5rem;
  padding: 0px;
}

.form--label {
  color: #000;
  position: relative;
  height: 16px;
  text-align: left;
  font-size: inherit;
  font-weight: bold;
  line-height: 16px;
  letter-spacing: 0.02rem;
}

.form--input {
  height: 3rem;
  width: 100%;
  font-size: inherit;
  font-family: inherit;
  line-height: 3rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  outline: none;
  padding-left: 10px;
  margin-top: 5px;
}

h2 {
  font-size: 1.5rem;
  text-align: center;
  margin-top: 0;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background-color: #338cf4;
}
.container {
  background-color: #ffffff;
  width: 90vmin;
  padding: 50px 30px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  border-radius: 10px;
  box-shadow: 0 25px 50px rgba(7, 20, 35, 0.2);
}
.options {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
}
button {
  height: 28px;
  width: 28px;
  display: grid;
  place-items: center;
  border-radius: 3px;
  border: none;
  background-color: #ffffff;
  outline: none;
  color: #020929;
}
select {
  padding: 7px;
  border: 1px solid #020929;
  border-radius: 3px;
}
.options label,
.options select {
  font-family: "Poppins", sans-serif;
}
.input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}
input[type="color"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  width: 40px;
  height: 28px;
  border: none;
  cursor: pointer;
}
input[type="color"]::-webkit-color-swatch {
  border-radius: 15px;
  box-shadow: 0 0 0 2px #ffffff, 0 0 0 3px #020929;
}
input[type="color"]::-moz-color-swatch {
  border-radius: 15px;
  box-shadow: 0 0 0 2px #ffffff, 0 0 0 3px #020929;
}
#text-input {
  margin-top: 10px;
  border: 1px solid #dddddd;
  padding: 20px;
  height: 50vh;
}
.active {
  background-color: #e0e9ff;
}
</style>