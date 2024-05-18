console.log("todo.js");

function initToDo() {
    // DOM Refs
    const btnCreate = document.querySelector("#btnCreate");
    const btnOverview = document.querySelector("#btnOverview"); 
    const btnCreateAndOverview = document.querySelector('#btnCreateAndOverview');

    function checkFormValues() {
        const form = document.querySelector("#form"); 
        form.reportValidity();
        if (form.title.value.length === 0) {
            return false;
        } 
        return true;
    }

    function createToDo(event) {
        console.log("click");
        if (checkFormValues()) {
            if (event.target.tagName === 'BUTTON') {
                const clickedButton = event.target;
                console.log(clickedButton);
                if (clickedButton.id === "btnCreate") {
                    clickedButton.textContent = "Update";
                }                
            }
        } else {
            event.stopImmediatePropagation();
        }
    }

    function goToOverview() {
        console.log("click");
        window.location.href='index.html';
    }

    btnCreate.addEventListener("click", createToDo);
    btnCreateAndOverview.addEventListener("click", createToDo);
    btnCreateAndOverview.addEventListener("click", goToOverview);
    btnOverview.addEventListener("click", goToOverview);    
    
}

initToDo();