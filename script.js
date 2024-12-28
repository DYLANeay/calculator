// script.js

document.addEventListener("DOMContentLoaded", () => {
    const displayBar = document.getElementById("displayBar");
    const buttons = document.querySelectorAll(".buttonsContainer button");

    let currentInput = "";  
    let previousInput = ""; 
    let operator = null;   

    // Fonction pour addition
    const add = (a, b) => a + b;

    // Fonction pour soustraction
    const subtract = (a, b) => a - b;

    // Fonction pour multiplication
    const multiply = (a, b) => a * b;

    // Fonction pour divisions
    const divide = (a, b) => (b !== 0 ? a / b : "Erreur division par 0"); 

    // Fonction de calcul 
    const calculate = () => {
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);

        if (isNaN(num1) || isNaN(num2)) return;

        switch (operator) {
            case "+":
                return add(num1, num2);
            case "-":
                return subtract(num1, num2);
            case "x":
                return multiply(num1, num2);
            case "%":
                return divide(num1, num2);
            default:
                return num2; 
        }
    };

    // Ajout d'un event listener à chaque clic sur un bouton
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;

            //Si le nombre est valide ou bien que c'est un point 
            if (!isNaN(value) || value === ".") {
                
                if (value === "." && currentInput.includes(".")) return; //Pour ne pas avoir 2 points dans le même input
                currentInput += value; //dans le cas normal
                displayBar.value = currentInput; //affichage dans la barre
            } else if (["+", "-", "x", "%"].includes(value)) {
                
                if (currentInput === "" && previousInput !== "") { //si le bouton entré se trouve au centre des deux 
                    operator = value; 
                } else {
                    if (previousInput !== "") { //si current et previous on une valeur, alors on calcule déjà ces deux pour refaire un calcul
                        const result = calculate();
                        displayBar.value = parseFloat(result.toFixed(4));
                        previousInput = result.toString();
                    } else {
                        previousInput = currentInput;
                    }
                    currentInput = "";
                    operator = value;
                }
            } else if (value === "=") {
                
                if (operator && previousInput !== "" && currentInput !== "") { //cas normal
                    const result = calculate();
                    displayBar.value = parseFloat(result.toFixed(4));
                    currentInput = result.toString();
                    previousInput = "";
                    operator = null;
                }
            } else if (value === "C") {
                
                currentInput = "";
                previousInput = "";
                operator = null;
                displayBar.value = "";
            }
        });
    });
});
