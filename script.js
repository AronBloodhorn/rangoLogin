// const form = document.querySelector("form");
const form = document.querySelector("form");
const statusTxt = document.querySelector("#status_message");

const dataEnterField = document.querySelectorAll("input#password, input#username");
const dataEnterField_borderDefault = dataEnterField[0].style.border;
const dataEnterField_boxShadowDefault = dataEnterField[0].style.boxShadow;
// сохранение значений по умолчанию
const statusTxt_textDefault = statusTxt.innerHTML; // строка статуса
const erBorderValue = "1px solid red"; // значение границы поля ввода в случае ошибки
const erBoxShadowValue = "red 0px 0px 5px"; // значение теней поля ввода в случае ошибки

form.onsubmit = (e) => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "message.php", true);
    xhr.onload = ()=> {
        if(xhr.readyState == 4 && xhr.status == 200)
            {
                let response = xhr.response; // сохранение результата запроса
                dataEnterField.forEach(element => {
                    element.style.border = dataEnterField_borderDefault;
                    element.style.boxShadow = dataEnterField_boxShadowDefault;
                });
                // Если результат запроса равен одной из ошибок,
                // произойдёт замена текста 'строки статуса' и изменятся стили границ и теней для полей 'имени пользователя' и 'пароля'   
                dataEnterField.forEach(el => {
                    if(response.indexOf("Введите имя пользователя и пароль!") != -1 || response.indexOf("Ошибка в имени пользователя или пароле") != -1){
                        el.value = "";
                        statusTxt.innerHTML = response;
                        el.style.border = erBorderValue;
                        el.style.boxShadow = erBoxShadowValue;
                    }
                    // Если не введено имя пользователя, изменятся стили границ и теней для поля ввода input[id='username']
                    else if(el.id == "username" && response.indexOf("Введите имя пользователя") != -1){
                        statusTxt.innerHTML = response;
                        el.style.border = erBorderValue;
                        el.style.boxShadow = erBoxShadowValue;
                    }
                    // Если не введен пароль, изменятся стили границ и теней для поля ввода input[id='password']
                    else if(el.id == "password" && response.indexOf("Пароль не введён или введён не верно") != -1 || response.indexOf("Ошибка в имени пользователя или пароле") != -1){
                        statusTxt.innerHTML = response;
                        el.value = "";
                        el.style.border = erBorderValue;
                        el.style.boxShadow = erBoxShadowValue;
                    }else if(response.indexOf("Проверка данных пройдена") != -1){
                        window.location.assign("http://localhost/rango_copy/work_page.html");
                    }
                })
            }
    };
    let formData = new FormData(form);
    xhr.send(formData);
}