document.addEventListener("DOMContentLoaded", () => {
    const operatiorInput = document.querySelector(".operator");
    const resultInput = document.querySelector(".result");
    const buttons = document.querySelectorAll(".calculator button");

    let firstValue = ""; // 첫번째 숫자
    let operator = ""; // 연산자
    let secondValue = ""; // 두번째 숫자

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const value = btn.dataset.value;
            
            // 숫자
            if (btn.classList.contains("number")) {
                if (!operator) {
                    firstValue += value;
                    resultInput.value = firstValue;
                }
                else {
                    secondValue += value;
                    resultInput.value = secondValue;
                }
                return;
            }
            // Clear
            if (value === "c") {
                firstValue = "";
                secondValue = "";
                operator = "";
                operatiorInput.value = "";
                resultInput.value = "";
                return;
            }

            // 연산자
            if (["+", "-", "/", "x"].includes(value)) {
                operator = value === "x" ? "*" : value;
                operatiorInput.value = value;
                return;
            }

            // 계산
            if (value === "=") {
                if (firstValue && operator && secondValue) {
                    const result = eval(`${firstValue}${operator}${secondValue}`);

                    resultInput.value = result;

                    firstValue = result;
                    secondValue = "";
                    operator = "";
                    operatiorInput.value = "";
                }
            }
        });
    });
});