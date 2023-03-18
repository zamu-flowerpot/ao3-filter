function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
    console.log("style added")
}

function hideWorksByRegex(selector='li.work') {
    function _hideWorksByRegex(pattern,elems) {
        if (pattern.length < 1) {
            return
        }
        let re = new RegExp(pattern, 'i');
        elems = elems
            .filter(x=>x.innerHTML.match(re));
        elems
            .map(x=>x.classList.toggle("ao3-filter-hidden"));
        console.log("pattern:", pattern ,"selector:", selector,"elems:", elems, "summary", elems.map(
            x=>{
                return {
                    "title": x.querySelector('div.header.module h4.heading').innerText.replace(/\s\s+/g, ' ').trim(),
                    "summary": x.querySelector('blockquote.userstuff.summary').innerText.replace(/\s\s+/g,' ').trim(),
                }
            }));
    }
    
    chrome.storage.sync.get(["patterns", "active"], record=>{
        console.log(record)
        let elems = Array.from(document.querySelectorAll(selector));
        elems.map(x=>x.classList.remove('ao3-filter-hidden'));
        if (record.active && record.patterns) {
            _hideWorksByRegex(record.patterns.join("|"), elems);
        }
    })
}



addStyle(`
.ao3-filter-hidden {
    display: none !important;
}
`)
hideWorksByRegex()

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.settings_changed) {
            case 'saved':
                hideWorksByRegex();
                break;
            case 'toggled':
                hideWorksByRegex();
                break;
            default:
                ()=>{}
        }
    }
)
