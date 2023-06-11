var data = [
    {
        empcode: "A102",
        name: "James",
        age: 37,
        gender: "Male",
        department: "Finance",
        designation: "Manager",
        salary: 65000,
    },
    {
        empcode: "A106",
        name: "Mary",
        age: 24,
        gender: "Female",
        department: "Technology",
        designation: "Vice-President",
        salary: 68000,
    },
    {
        empcode: "A122",
        name: "Bob",
        age: 23,
        gender: "Male",
        department: "Marketing",
        designation: "Manager",
        salary: 51000,
    },
    {
        empcode: "A088",
        name: "Julia",
        age: 33,
        gender: "Female",
        department: "Finance",
        designation: "Vice-President",
        salary: 70000,
    },
    {
        empcode: "A055",
        name: "Steve",
        age: 27,
        gender: "Male",
        department: "Technology",
        designation: "Manager",
        salary: 53000,
    },
    {
        empcode: "A208",
        name: "Katherine",
        age: 29,
        gender: "Female",
        department: "Marketing",
        designation: "Manager",
        salary: 61000,
    },
    {
        empcode: "A181",
        name: "Edwards",
        age: 31,
        gender: "Male",
        department: "Finance",
        designation: "Trainee",
        salary: 49000,
    },
    {
        empcode: "A029",
        name: "Margaret",
        age: 32,
        gender: "Female",
        department: "Technology",
        designation: "President",
        salary: 53000,
    },
    {
        empcode: "A029",
        name: "Bill",
        age: 27,
        gender: "Male",
        department: "Operations",
        designation: "Manager",
        salary: 58000,
    },
];

function showTable() {
    document.getElementById("table-container").style.display = "block";
    document.getElementById("form-container").style.display = "none";

    var tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = "";

    var table = document.createElement("table");
    table.classList.add("table");

    var tableHeading = document.createElement("tr");
    tableHeading.classList.add("table-heading");

    for (var key in data[0]) {
        var th = document.createElement("th");
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        tableHeading.appendChild(th);
    }
    var editTh = document.createElement("th");
    editTh.textContent = "Edit";
    tableHeading.appendChild(editTh);

    table.appendChild(tableHeading);

    data.forEach(function (employee) {
        var tableRow = document.createElement("tr");
        tableRow.classList.add("table-row");
        for (var key in employee) {
            var td = document.createElement("td");
            td.textContent = employee[key];
            tableRow.appendChild(td);
        }
        var editButtonCell = document.createElement("td");
        var editButton = document.createElement("button");
        editButton.classList.add("edit-button");
        editButton.textContent = "Edit";
        editButton.setAttribute("onclick", "editEmployee('" + employee.empcode + "')");
        editButtonCell.appendChild(editButton);
        tableRow.appendChild(editButtonCell);

        table.appendChild(tableRow);
    });

    tableContainer.appendChild(table);
}

function showNewEmployeeForm() {
    document.getElementById("table-container").style.display = "none";
    document.getElementById("form-container").style.display = "block";
}

function addNewEmployee() {
    var empcode = document.getElementById("empcode").value;
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var departmentDropdown = document.getElementById("department-select");
    var department = departmentDropdown.options[departmentDropdown.selectedIndex].value;
    var designationDropdown = document.getElementById("designation-select");
    var designation = designationDropdown.options[designationDropdown.selectedIndex].value;
    var salary = document.getElementById("salary").value;

    var newEmployee = {
        empcode: empcode,
        name: name,
        age: age,
        gender: gender,
        department: department,
        designation: designation,
        salary: salary,
    };

    data.push(newEmployee);

    document.getElementById("empcode").value = "";
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("department-select").selectedIndex = 0;
    document.getElementById("designation-select").selectedIndex = 0;
    document.getElementById("salary").value = "";

    showTable();
}

function editEmployee(empcode) {
    var employee = data.find(function (emp) {
        return emp.empcode === empcode;
    });

    document.getElementById("table-container").style.display = "none";
    document.getElementById("form-container").style.display = "block";

    document.getElementById("empcode").value = employee.empcode;
    document.getElementById("name").value = employee.name;
    document.getElementById("age").value = employee.age;
    document.querySelector('input[name="gender"][value="' + employee.gender + '"]').checked = true;
    document.getElementById("department-select").value = employee.department;
    document.getElementById("designation-select").value = employee.designation;
    document.getElementById("salary").value = employee.salary;
}

function updateEmployee() {
    var empcode = document.getElementById("empcode").value;
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var departmentDropdown = document.getElementById("department-select");
    var department = departmentDropdown.options[departmentDropdown.selectedIndex].value;
    var designationDropdown = document.getElementById("designation-select");
    var designation = designationDropdown.options[designationDropdown.selectedIndex].value;
    var salary = document.getElementById("salary").value;

    var updatedEmployee = {
        empcode: empcode,
        name: name,
        age: age,
        gender: gender,
        department: department,
        designation: designation,
        salary: salary,
    };

    var index = data.findIndex(function (emp) {
        return emp.empcode === empcode;
    });

    if (index !== -1) {
        data[index] = updatedEmployee;
        showTable();
    }

    document.getElementById("empcode").value = "";
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("department-select").selectedIndex = 0;
    document.getElementById("designation-select").selectedIndex = 0;
    document.getElementById("salary").value = "";

    showTable();
}

function filterTable() {
    var departmentFilter = document.getElementById("filter-department").value;
    var designationFilter = document.getElementById("filter-designation").value;

    var filteredData = data.filter(function (employee) {
        var departmentMatch = departmentFilter === "All" || employee.department === departmentFilter;
        var designationMatch = designationFilter === "All" || employee.designation === designationFilter;

        return departmentMatch && designationMatch;
    });

    renderFilteredTable(filteredData);
}

function renderFilteredTable(filteredData) {
    var tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = "";

    var table = document.createElement("table");
    table.classList.add("table");

    var tableHeading = document.createElement("tr");
    tableHeading.classList.add("table-heading");

    for (var key in filteredData[0]) {
        var th = document.createElement("th");
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        tableHeading.appendChild(th);
    }
    var editTh = document.createElement("th");
    editTh.textContent = "    ";
    tableHeading.appendChild(editTh);

    table.appendChild(tableHeading);

    filteredData.forEach(function (employee) {
        var tableRow = document.createElement("tr");
        tableRow.classList.add("table-row");
        for (var key in employee) {
            var td = document.createElement("td");
            td.textContent = employee[key];
            tableRow.appendChild(td);
        }
        var editButtonCell = document.createElement("td");
        var editButton = document.createElement("button");
        editButton.classList.add("edit-button");
        editButton.textContent = "Edit";
        editButton.setAttribute("onclick", "editEmployee('" + employee.empcode + "')");
        editButtonCell.appendChild(editButton);
        tableRow.appendChild(editButtonCell);

        table.appendChild(tableRow);
    });

    tableContainer.appendChild(table);
}

// Initial table display
showTable();
