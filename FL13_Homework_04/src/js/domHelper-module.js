export function createElem(tag, root, prop, text) {
    const name = document.createElement(tag);
    if (typeof prop !== 'undefined' && prop) {
        for (let key in prop) {
            if (key) {
                name.setAttribute(key, prop[key])
            }
        }
    }
    if (text) {
        name.innerHTML = text
    }
    root.appendChild(name);
    return name
}