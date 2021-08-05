export const formatDate = (date) => {
    var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString("id-ID", options)
}
export const getDateNow = () => {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var dd = String(today.getDate()).padStart(2, '0');
    var hour = String(today.getHours());
    var minute = String(today.getMinutes());
    var second = String(today.getSeconds());

    today = yyyy + '-' + mm + '-' + dd + ' ' + hour + ':' + minute + ':' + second;
    return today;
}