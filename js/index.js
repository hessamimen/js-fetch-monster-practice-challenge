

document.addEventListener('DOMContentLoaded', ()=>{

    const monsterForm = document.getElementsByTagName('form')[0];
    const monsterContainer = document.getElementById('monster-container');
    const backtBtn = document.getElementById('back');
    const nextBtn = document.getElementById('next');
    
    fetchMonsters()

    // Get monsters and display on the Webpage ------------
    function fetchMonsters(currentPage=1) {
        monsterContainer.innerHTML = "";
        monsterContainer.dataset.currentPage = currentPage;
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${currentPage}`)
            .then(r => r.json())
            .then(monsters => monsters.forEach(monster =>renderMonster(monster)))
    }
    
    // render monsters to the Page ---------------------
    function renderMonster(monster){
    const monsterName = document.createElement('h1')
    const monsterAge = document.createElement('p')
    const monsterDes = document.createElement('p')
    monsterName.innerHTML = monster.name
    monsterAge.innerHTML = monster.age
    monsterDes.innerHTML = monster.description
    monsterContainer.appendChild(monsterName)
    monsterContainer.appendChild(monsterAge)
    monsterContainer.appendChild(monsterDes)
    }

    //Next and Back button function ---------------------------
    let currentPage = monsterContainer.dataset.currentPage 

    nextBtn.addEventListener('click', ()=>{
        currentPage ++;
        fetchMonsters(currentPage)
        console.log(currentPage)
    })

    backtBtn.addEventListener('click', ()=>{
        if(currentPage > 1){
            currentPage --;
            fetchMonsters(currentPage)
        console.log(currentPage)
        }
    })

    // Post New Monster to the server--------------
    monsterForm.addEventListener('submit', (event)=> {
            event.preventDefault() 
            // let form = event.currentTarget
            let name = monsterForm[0].value
            let age = monsterForm[1].value
            let description = monsterForm[2].value

            fetch("http://localhost:3000/monsters", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        name,
                        age,
                        description
                    })
                }).then(r => r.json())
                .then(data => data)
            })    
 
}
)
// //-------------------------------------------------------



