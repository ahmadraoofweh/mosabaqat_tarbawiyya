let tickSound;
const timer = document.getElementsByClassName("time")[0];
const questionsContainer = document.getElementsByClassName("questions")[0].children;
const teamNameInputs = document.getElementsByClassName("name");
const questionPage = document.getElementsByClassName("questionPage")[0];
const choicesContainerElement = (document.getElementsByClassName("choices")[0]);
let choicesContainer = Array.from(choicesContainerElement.children);
let turn = sessionStorage.getItem("turn") ? sessionStorage.getItem("turn") : (() => { sessionStorage.setItem("turn", 0); return 0; })();

for (let i = 0; i < teamNameInputs.length; i++) {
    teamNameInputs.item(i).onchange = () => {
        sessionStorage.setItem(`team${i + 1 % teamNameInputs.length}`, JSON.stringify({ name: teamNameInputs.item(i).value, points: parseInt(document.getElementsByClassName(`points`)[i].value ?? 0) }));
    }
    document.getElementsByClassName("points").item(i).onchange = () => {
        sessionStorage.setItem(`team${i + 1 % teamNameInputs.length}`, JSON.stringify({ name: teamNameInputs.item(i).value, points: parseInt(document.getElementsByClassName(`points`)[i].value ?? 0) }));
    }
}
window.onresize = () => {
    window.state == true ? questionPage.scrollIntoView({behavior: "smooth", block:"center"}) : questionsContainer[0].parentElement.parentElement.scrollIntoView({behavior: "smooth", block:"center"}) 
}
window.onload = () => {
    let team1Data = JSON.parse(sessionStorage.getItem("team1")) ?? {"name": "", "points":"0"};
    document.getElementsByClassName("name")[0].value = team1Data.name;
    document.getElementsByClassName("points")[0].value = team1Data.points;
    let team2Data = JSON.parse(sessionStorage.getItem("team2")) ?? {"name": "", "points":"0"};
    document.getElementsByClassName("name")[1].value = team2Data.name;
    document.getElementsByClassName("points")[1].value = team2Data.points;
    let savedChosen = sessionStorage.getItem("chosenQuestions") ?? "";
    let chosen = savedChosen.split(",");
    window.addEventListener("configLoaded", () => {
        if (savedChosen.length == 0) return;
        chosen.forEach((item) => {          
            questionsContainer.item(item).setAttribute("chosen", true);
        })
    })
}

for (let i = 0; i < (questionsContainer.length); i++) {
    questionsContainer.item(i).onclick = () => {
        processQuestion(i);
    }
}
