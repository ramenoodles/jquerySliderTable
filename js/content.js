//Copyright Ram Senthil github @ramenoodles
$(document).ready(function () {

    $.validator.addMethod("lessThanOrEqual", function(value, element, param) {
        if (value === "" || $(param).val() === "") { //https://www.geeksforgeeks.org/jquery/difference-between-html-text-and-val-methods-in-jquery/
            return true;
        }//Used link above to understand val() vs text()
        return parseInt(value) <= parseInt($(param).val());
    }, "Minimum value must be less than or equal to maximum value.");//Custom validation method to check if one value is less than or equal to another

    $("#multTable").validate({
        rules: {
            minColumnValue: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                lessThanOrEqual: "#maxColumnValue"
            },
            maxColumnValue: {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            minRowValue: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                lessThanOrEqual: "#maxRowValue"
            },
            maxRowValue: {
                required: true,
                number: true,
                min: -50,
                max: 50
            }
        },//Validation rules, including custom lessThanOrEqual method
        messages: {
            minColumnValue: {
                required: "Please enter a minimum column value.",
                number: "Please enter a valid number.",
                min: "Value must be at least -50.",
                max: "Value must be at most 50.",
                lessThanOrEqual: "Minimum column value must be less than or equal to maximum column value."
            },
            maxColumnValue: {
                required: "Please enter a maximum column value.",
                number: "Please enter a valid number.",
                min: "Value must be at least -50.",
                max: "Value must be at most 50."
            },
            minRowValue: {
                required: "Please enter a minimum row value.",
                number: "Please enter a valid number.",
                min: "Value must be at least -50.",
                max: "Value must be at most 50.",
                lessThanOrEqual: "Minimum row value must be less than or equal to maximum row value."
            },
            maxRowValue: {
                required: "Please enter a maximum row value.",
                number: "Please enter a valid number.",
                min: "Value must be at least -50.",
                max: "Value must be at most 50."
            }
        },//Custom error messages
    
        errorPlacement: function(error, element) {
            error.insertAfter(element);
            console.log("Error shown:", error.text());
        },//Custom error placement to log errors to console and display errors after input fields
    
    });

    $("input[type='number']").on("input", function () {
        const sliderId = $(this).attr("id") + "Slider";
        $(`#${sliderId}`).val($(this).val());
        
        if ($("#multTable").valid()) {
            generateTable();
        }
    });//Double binding sliders to inputs as well as validation check on input
    
    $("input[type='range']").on("input", function () {
        const numberId = $(this).attr("id").replace("Slider", "");
        $(`#${numberId}`).val($(this).val());
        
        if ($("#multTable").valid()) {
            generateTable();
        }
    });//Double binding inputs to sliders as well as validation check on input

    function generateTable() {
        const minCol = parseInt($("#minColumnValue").val());
        const maxCol = parseInt($("#maxColumnValue").val());
        const minRow = parseInt($("#minRowValue").val());
        const maxRow = parseInt($("#maxRowValue").val());
        // Get input values
        
        let table = "<table border='1'><tr><th></th>";
        for (let col = minCol; col <= maxCol; col++) {
            table += `<th>${col}</th>`;
        }
        table += "</tr>";
        // Create table header
        
        for (let row = minRow; row <= maxRow; row++) {
            table += `<tr><th>${row}</th>`;
            for (let col = minCol; col <= maxCol; col++) {
                table += `<td>${row * col}</td>`;
            }
            table += "</tr>";
        }
        table += "</table>";
        //Create table body with rows and columns using a nested for loop

        
        $("#multiplicationTable").html(table);
        // Render table
    }

});
