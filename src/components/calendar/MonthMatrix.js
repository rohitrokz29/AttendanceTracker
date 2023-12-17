export const months = ["January", "February", "March", "April",
    "May", "June", "July", "August", "September", "October",
    "November", "December"];
export const weekDays = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];
export const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function generateMatrix(currentDate) {

    let matrix = [];

    matrix[0] = weekDays;

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();

    let firstDay = new Date(year, month, 1).getDay();
    let maxDays = daysInEachMonth[month];
    if (month == 1) {
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            maxDays += 1;
        }
    }

    let counter = 1;
    for (let row = 1; row < 7; row++) {
        matrix[row] = [];
        for (let col = 0; col < 7; col++) {
            matrix[row][col] = -1;

            if (row == 1 && col >= firstDay) {
                // in first row the date should start from the from day of the week
                matrix[row][col] = counter++;
            } else if (row > 1 && counter <= maxDays) {
                matrix[row][col] = counter++;
            }
        }
    }
    console.log(matrix)
    return matrix;
}
