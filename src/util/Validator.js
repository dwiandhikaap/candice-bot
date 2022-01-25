function isInvalidYear(year) {
    return !(
        /^\d{4}\/\d{4}$/i.test(year) &&
        parseInt(year.split("/")[1]) - parseInt(year.split("/")[0]) === 1 &&
        parseInt(year.split("/")[0]) <= new Date().getFullYear()
    );
}

function isInvalidToken(token) {
    return token.length != 5;
}

module.exports = {
    isInvalidYear: isInvalidYear,
    isInvalidToken: isInvalidToken,
};
