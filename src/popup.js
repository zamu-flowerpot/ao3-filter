
const termElem = document.getElementById("terms");
const stateElem = document.getElementById("toggle_activity");
function loadPopup() {
    chrome.storage.sync.get(["patterns", "active"], record => {
        record.patterns = record.patterns || [];
        termElem.value = record.patterns.join("\n");
        stateElem.innerText = record.active ? "✅": "❌";
    })
}
loadPopup()
document.getElementById("savebtn").addEventListener("click",(_ev)=>{
    let patterns = termElem.value;
    chrome.storage.sync.set(
        {
            ["patterns"]: patterns.split('\n').filter(x=>x!==""),
        }, 
        (_res) => (_res)
    )

    chrome.tabs.query({active:true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {settings_changed: "saved"})
    })
    loadPopup()
})

stateElem.addEventListener("click", (_ev)=>{
    let state = stateElem.innerText;
    chrome.storage.sync.set(
        {
            ["active"]: state == "✅" ? false : true,
        },
        (_res)=>_res
    )    
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {settings_changed: "toggled"})
    })
    loadPopup()
})

