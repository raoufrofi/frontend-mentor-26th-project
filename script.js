const ulList = document.querySelector(".main-list");

// CALLING FUNCTION
creatingLi();
let objectOfData;


// Intersection Observer
let option = {

}

let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            console.log(index);
            let graphGraph = entry.target;

            setTimeout(async () => {
                graphGraph.style.height = `calc(${objectOfData[index].amount}px * 3)`;
            }, index * 150);
            observer.unobserve(entry.target);
        }
    })
}, option)


// Element Creating
async function creatingLi() {
    // Fetching
    await fetch("data.json").then(res => {
        return res.json();
    }).then(data => {
        objectOfData = data
    });

    creatingChilds(objectOfData);
}


function creatingChilds(objectOfData) {
    for (let i = 0; i < objectOfData.length; i++) {
        let li = document.createElement("li");
        li.classList.add("main-list__item", "list-item");

        // GRAPH DATA
        let graphData = document.createElement("p");
        graphData.classList.add("list-item__data")
        graphData.innerHTML = `$${objectOfData[i].amount}`;

        // GRAPH
        let graphGraph = document.createElement("div");
        graphGraph.classList.add("list-item__graph")
        graphGraph.style.height = `calc(${objectOfData[i].amount}px * 0)`;

        // GRAPH DAY
        let graphDay = document.createElement("p");
        graphDay.classList.add("list-item__day")
        graphDay.innerHTML = `${objectOfData[i].day}`;




        // APPENDING
        li.append(graphData, graphGraph, graphDay);

        ulList.appendChild(li);

        // OBSERVING
        observer.observe(graphGraph);
        events(graphGraph, graphData);
    }
}


function events(item, dependant) {
    item.addEventListener('mouseover', () => {
        dependant.style.opacity = 1;
    })
    item.addEventListener('mouseout', () => {
        dependant.style.opacity = 0;
    })
}
