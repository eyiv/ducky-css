//Start a map for already parsed lines of quack; ensures whenever a group 
//is pushed to mapToCss it doesn't needlessly reparse/analyze already parsed lines
let checked = new Map();

class QuackParser {
    constructor() {
        this.patterns = [];
        this.quackMap = new Map();
        this.setPatterns();
        this.setRules();
    }

    setPatterns() {
        this.patterns.push(/^.+?\s*=\s*.+$/);
    }

    //Map shortened syntax to its JS equivalent
    setRules() {
        this.quackMap.set('bg', 'background');
        this.quackMap.set('bgAttachment', 'backgroundAttachment');
        this.quackMap.set('bgBlend', 'backgroundBlendMode');
        this.quackMap.set('bgClip', 'backgroundClip');
        this.quackMap.set('bgColor', 'backgroundColor');
        this.quackMap.set('bgImage', 'backgroundImage');
        this.quackMap.set('bgOrigin', 'backgroundOrigin');
        this.quackMap.set('bgPosition', 'backgroundPosition');
        this.quackMap.set('bgRepeat', 'backgroundRepeat');
        this.quackMap.set('bgSize', 'backgroundSize');
        this.quackMap.set('borderBtm', 'borderBottom');
        this.quackMap.set('borderBtmColor', 'borderBottomColor');
        this.quackMap.set('borderBtmLeftRadius', 'borderBottomLeftRadius');
        this.quackMap.set('borderBtmRightRadius', 'borderBottomRightRadius');
        this.quackMap.set('borderBtmStyle', 'borderBottomStyle');
        this.quackMap.set('borderBtmWidth', 'borderBottomWidth');
        this.quackMap.set('borderImg', 'borderImage');
        this.quackMap.set('borderImgOutset', 'borderImageOutset');
        this.quackMap.set('borderImgRepeat', 'borderImageRepeat');
        this.quackMap.set('borderImgSlice', 'borderImageSlice');
        this.quackMap.set('borderImgSource', 'borderImageSource');
        this.quackMap.set('borderImgWidth', 'borderImageWidth');
        this.quackMap.set('btm', 'bottom');
        this.quackMap.set('listStyleImg', 'listStyleImage');
        this.quackMap.set('marginBtm', 'marginBottom');
        this.quackMap.set('paddingBtm', 'paddingBottom');
        this.quackMap.set('zindex', 'zIndex');   
    }

    //Match each line provided (other than comments or blank ones) against patterns
    //Determine if its valid syntax
    quack(inputString) {
        const lines = inputString.split('\r\n');
        let group = null; //Holds groups of quack statements
        let startPattern = /^[.#]\w+:+$/;
        lines.forEach(line => {
            if (!line.startsWith('//') && line.length !== 0) {
                //Start a new group if the line matches the selector rule property
                //e.g., .class:
                if (startPattern.test(line)) {
                    group = [line];
                } else {
                    //Otherwise if it matches a property/value pattern, push it to the
                    //existing group
                    this.patterns.forEach(pattern => {
                        if (pattern.test(line.trim()) && group !== null) {
                            group.push(line);
                            this.updateDOM(group);
                        }
                    });
                }
            }
        });
    }


    updateDOM(group) {
        //Add a new entry to the map for the element of the group
        if (!checked.has(group[0])) {
            checked.set(group[0], []);
        }
        let querySelector = group[0]; //Element idenfifier (e.g., .class/#id)
        querySelector = querySelector.split(':');
        querySelector = querySelector[0].trim();

        //Parse the line of quack if it has not already been done so
        for (let i = 1; i < group.length; i++) {
            if (!checked.get(group[0]).includes(group[i])) {
                let property = group[i].split('=');
                let value = property[1].trim();
                property = property[0].trim();

                const targetElement = document.querySelectorAll(querySelector);
                targetElement.forEach(element => {
                    this.mapToCss(element, property, value);
                });
                checked.get(group[0]).push(group[i]); //Add the line so it doesn't get checked again
            } else {
            }
        }
    }
    mapToCss(target, property, value) {
        //True represents a shortened version of the JS syntax being used
        if (this.quackMap.has(property)) {
            let _css = this.quackMap.get(property);
            target.style[_css] = value;
        } else {
            //If it doesn't, assume a JS syntax is attempted to be used and set
            //that style
            target.style[property] = value;
        }
    }
}

export default QuackParser;
