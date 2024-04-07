# ducky-css
ducky lets you use the js version of css properties and shortens the amount you need to write, as well as providing shorter alternatives.

For example, instead of doing:
```css
.class {
    background-color: blue;
}
```
You can instead do:
```
.class:
bgColor = blue
```



**Note**: All the CSS values you use are the same as in standard CSS

---
#### Setup
<sub> **Note**: If you don't want to read all this, there's an [Example](https://github.com/eyiv/ducky-css/tree/main/Example) folder in the repository that has the setup and example usage there for you </sub>

Install ducky-css with the following command in a terminal in your project's root directory:
```
npm i ducky-css
```

Then add a script module to your HTML file just before the ending \<body> tag:
```html
...
<script src="index.js" type="module"></script>
</body>
```

Then create a file you will write ducky-css in. 
*You can write ducky-css in basically any type of file as the quack parser merely takes in the text content of whatever file you link, but if you'd like to stay on the theme of ducks (🦆), feel free to use file extensions such as .quack or .duck to keep it organized in your project.

Then, in the JS file you just linked in your HTML, send the content of the file you're writing ducky-css in:

```js
import QuackParser from './node_modules/ducky-css/quack.js';

document.addEventListener('DOMContentLoaded', function() {
    const duck = new QuackParser();
    fetch('main.quack') //file path here
    .then(response => response.text())
    .then(data => {
        duck.quack(data);
    })
    .catch(error => {
      console.error('Error fetching file:', error);
    });
});
```

 

___

#### [Usage/Syntax](https://github.com/eyiv/ducky-css/wiki/Introduction#general-syntax-rules)

CSS groups are still started using .class or #id, but rather than using curly braces, simply add a colon at the end,
```
.class:
```
```
#id:
```

You don't have to worry about any ending symbols to mark the end of a group, the parser knows when a group ends, but if you want to visually keep it organized simply add an empty line or two between each group.

ducky-css properties have their names as camelCase, just like the JS property names,
e.g.,
```
.class:
alignItems = center
justifyContent = center
```
 But I have also added [shorter alternatives](https://github.com/eyiv/ducky-css/wiki/Short%E2%80%90form-Alternatives) you can use; as a rule of thumb, any properties with the words background, image, or bottom all have shortend versions of those words within the property name

e.g., bg, img, btm

---

#### [Shorthand Properties](https://github.com/eyiv/ducky-css/wiki/Shorthand-Properties)
I have also added shorthand properties that combine commonly used groups of CSS into one line. 

For example the shorthand property `centered;;` centers an element absolutely within its parent container:
```
.parent:
positon = relative

#child:
centered;;
```
This is equivalent to the following standard CSS:
```css
.parent {
    position: relative;
}

#child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

For more detail into the syntax, short-form, and shorthand properties, visit the [Wiki](https://github.com/eyiv/ducky-css/wiki/Introduction)
