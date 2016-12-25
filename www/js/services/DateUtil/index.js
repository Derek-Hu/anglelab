module.exports = {
    name: 'DateUtil',
    fn: [function () {
        function getLastDay(pYear, pMonth) {
            var curr = new Date();

            if (pYear) {
                curr.setFullYear(parseInt(pYear, 10));
            }
            if (pMonth) {
                curr.setMonth(parseInt(pMonth, 10) - 1);
            }
            var year = curr.getFullYear();
            var month = curr.getMonth() + 1;

            if (month >= 12) {
                month -= 12;
                year++;
            }

            var nextFirstDay = new Date(year, month, 1);

            console.log(nextFirstDay);
            return (new Date(nextFirstDay.getTime() - 1000 * 60 * 60 * 24)).getDate();
        }
        return {
            getLastDay: getLastDay
        };
    }]
};
