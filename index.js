let myData = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const urlBtn = document.getElementById("url-btn");
const deleteBtn = document.getElementById("delete-btn");
const listEl = document.getElementById("list-el");

// Save data using input button
inputBtn.addEventListener('click', function() {
    myData.push(inputEl.value);
    //Store data in the Local Storage
    localStorage.setItem('myData', JSON.stringify(myData));
    render(myData);
})
// Save the URL Data
urlBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myData.push(tabs[0].url)
    })
    localStorage.setItem('myData',JSON.stringify(myData));
    render(myData)
})
const dataFromLocalStorage = JSON.parse(localStorage.getItem("myData"));

if (dataFromLocalStorage) {
    myData = dataFromLocalStorage;
    render(myData);
}

//Function render

function render(data) {
    let listItems = '';
    for (let i=0;i<data.length;i++) {
        listItems += `<li>
                            <a target="_blank" href="${data[i]}">${data[i]}</a>
                      </li>`;
    }
    listEl.innerHTML = listItems;
}
// Delete all the data with a double click
deleteBtn.addEventListener('dblclick', function() {
    localStorage.clear();
    myData = [];
    render(myData)
})
