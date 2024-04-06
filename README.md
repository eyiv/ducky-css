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



**Note**: All the CSS values you use are the same as in normal CSS

---
#### Setup
<sub> **Note**: If you don't want to read all this, there's an Example folder in the repository that has the setup and example usage there for you </sub>

Add a script module to your HTML file:
```html
<script src="index.js" type="module"></script>
```

Then create a file you will write the CSS in (You can write the CSS in basically any type of file as the quackparser merely takes in the text content of whatever file you link, but if you'd like to stay on the theme of ducks (🦆), then feel free to use file extensions such as .quack or .duck to keep it organized in your project.)

Then in the JS file you linked in your HTML file, send the file content you'll write the CSS in to the quackparser:

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

#### Usage/Syntax

CSS groups are still started using .class or #id, but rather than using curly braces, simply add a colon at the end,
```
.class:
```
```
#id:
```

You don't have to worry about any ending symbols to mark the end of a group, the parser knows when a group ends, but if you want to visually keep it organized simply add an empty line or two between each group.

Most CSS properties have their same JS version,
e.g.,
```
.class:
alignItems = center
justifyContent = center
```
 But some also have shorter alternatives you can use; as a rule of thumb, any properties with the words background, image, or bottom all have shortend versions of those words within the property name

e.g., bg, img, btm

This is in the early stages and I plan on adding shorthand versions of combinations of commonly used CSS.

(Not yet implemented)
For example, something like:
```
centered
```
Will result in the following being applied to the element:
```css
display: flex;
justify-content: center;
align-items: center;
```
Documentation comes soon, but if you're not familiar with the JS css syntax it's basically the same names as the CSS version but camelCased and without the hyphens such as:
```js
alignItems
```

Styles are applied to elements inline, and there are still a few kinks I need to iron out. 
