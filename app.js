'use strict';
let divEl = document.getElementById('container');
let tableEl = document.createElement('table');
divEl.appendChild(tableEl)
let studentID = 0;
let objectArr = [];
let total = 0;
let para = document.createElement('p');
divEl.appendChild(para);
function tableHeader() {
    let trEl = document.createElement('tr');
    tableEl.appendChild(trEl);
    let headerArr = ['ID', 'NAME', 'EMAIL', 'MOBILE', 'AGE', 'TUITION']
    for (let i = 0; i < headerArr.length; i++) {
        let thEl = document.createElement('th');
        trEl.appendChild(thEl);
        thEl.textContent = headerArr[i];
    }
}
tableHeader()

function Student(e, p, t) {
    this.email = e;
    this.phone = p;
    this.tuition = t;
    this.age = 0;
    this.total = 0;
    objectArr.push(this);
}
Student.prototype.newAge = function () {
    this.age = Math.floor(Math.random() * (25 - 18) + 18);
}
Student.prototype.render = function () {
    studentID++
    let tr2El = document.createElement('tr');
    tableEl.appendChild(tr2El);
    let td1El = document.createElement('td');
    let td2El = document.createElement('td');
    let td3El = document.createElement('td');
    let td4El = document.createElement('td');
    let td5El = document.createElement('td');
    let td6El = document.createElement('td');
    tr2El.appendChild(td1El);
    tr2El.appendChild(td2El);
    tr2El.appendChild(td3El);
    tr2El.appendChild(td4El);
    tr2El.appendChild(td5El);
    tr2El.appendChild(td6El);
    td1El.textContent = studentID;
    td2El.textContent = this.email.substring(0, this.email.lastIndexOf("@"));
    td3El.textContent = this.email;
    td4El.textContent = this.phone;
    td5El.textContent = this.age;
    td6El.textContent = this.tuition;
    
    para.textContent = `total: ${total} jd`;
}
let myForm = document.getElementById('form');
myForm.addEventListener('submit', addToTable);
function addToTable(event) {
    event.preventDefault();
    let sEmail = event.target.one.value;
    let sPhone = event.target.two.value;
    let sTuition = event.target.three.value;
    let newStudent = new Student(sEmail, sPhone, sTuition);
    if (event.target.three.value === '100jd') {
        total += 100;
    } else if (event.target.three.value === '500jd') {
        total += 500;
    } else if (event.target.three.value === '1000jd') {
        total += 1000;
    }
    newStudent.newAge();
    newStudent.render();
    saveData()
}
function saveData() {
    let data = JSON.stringify(objectArr);
    localStorage.setItem('Students', data);
}
let localeArr = [];
function getData() {
    let data = JSON.parse(localStorage.getItem('Students'));
    if (data) {
        localeArr = data;
        fixRender();
    }
}
getData();
function fixRender() {
    for (let i = 0; i < localeArr.length; i++) {
        studentID++
        let tr3El = document.createElement('tr');
        tableEl.appendChild(tr3El);
        let td1El = document.createElement('td');
        let td2El = document.createElement('td');
        let td3El = document.createElement('td');
        let td4El = document.createElement('td');
        let td5El = document.createElement('td');
        let td6El = document.createElement('td');
        tr3El.appendChild(td1El);
        tr3El.appendChild(td2El);
        tr3El.appendChild(td3El);
        tr3El.appendChild(td4El);
        tr3El.appendChild(td5El);
        tr3El.appendChild(td6El);
        td1El.textContent = studentID;
        td2El.textContent = localeArr[i].email.substring(0, localeArr[i].email.lastIndexOf("@"));;
        td3El.textContent = localeArr[i].email;
        td4El.textContent = localeArr[i].phone;
        td5El.textContent = localeArr[i].age;
        td6El.textContent = localeArr[i].tuition;
        if (localeArr[i].tuition === '100jd') {
            total += 100;
        } else if (localeArr[i].tuition === '500jd') {
            total += 500;
        } else if (localeArr[i].tuition === '1000jd') {
            total += 1000;
        }
        para.textContent = `total: ${total} jd`;
    }
}