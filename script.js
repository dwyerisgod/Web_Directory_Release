document.addEventListener("DOMContentLoaded", function () {
    const tableSelect = document.getElementById("tableSelect");
    const dataTable = document.getElementById("data-table");

    tableSelect.addEventListener("change", function () {
        const selectedTable = tableSelect.value;
        fetchData(selectedTable);
    });

    function fetchData(tableName) {
        fetch("fetch_data.php?table=" + tableName) // Передайте имя таблицы на сервер
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // Очищаем существующие данные
                while (dataTable.firstChild) {
                    dataTable.removeChild(dataTable.firstChild);
                }

                // Создаем заголовок таблицы
                const thead = document.createElement("thead");
                const tr = document.createElement("tr");
                Object.keys(data[0]).forEach(function (key) {
                    const th = document.createElement("th");
                    th.textContent = key;
                    tr.appendChild(th);
                });
                thead.appendChild(tr);
                dataTable.appendChild(thead);

                // Заполняем таблицу данными
                const tbody = document.createElement("tbody");
                data.forEach(function (row) {
                    const tr = document.createElement("tr");
                    Object.values(row).forEach(function (value) {
                        const td = document.createElement("td");
                        td.textContent = value;
                        tr.appendChild(td);
                    });
                    tbody.appendChild(tr);
                });
                dataTable.appendChild(tbody);
            })
            .catch(function (error) {
                console.log("Ошибка: " + error);
            });
    }
});
