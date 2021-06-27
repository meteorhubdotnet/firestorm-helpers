import { Template } from 'meteor/templating';
import { format, isValid } from 'date-fns';
// const {format} = Npm.require('date-fns');
// ===================================================
// HELPER: eq
// Checks for equality between 2 provided variables
// @arg Mixed: value1
// @arg Mixed: value2
// @return Boolean: whether the 2 values are equal or not
// ===================================================

UI.registerHelper('eq', function(value1, value2) {

    // do it
    return value1 === value2;

});

// ===================================================
// HELPER: or
// Checks for presence of either value
// @arg Mixed: value1
// @arg Mixed: value2
// @return Boolean: whether either value is present
// ===================================================
UI.registerHelper('or', function(value1, value2) {

    // do it
    return value1 || value2;

});

// ===================================================
// HELPER: inc
// Checks inf value2 is in value1
// @arg Mixed: value1
// @arg Mixed: value2
// @return Boolean whether value2 is in value1
// ===================================================
UI.registerHelper('inc', function(value1, value2) {

    // do it
    return value1?.includes(value2);

});

// ===================================================
// HELPER: activeRoute
// Get name of current Iron Router route
// @return String name of route
// ===================================================
UI.registerHelper('activeRoute', function() {

    return Router.current().route.getName();

});

// ===================================================
// HELPER: humanReadableDate
// Takes a date string in yyyy-MM-DD format and formats it to make sense to humans
// @args dateData: how to format the date
// @return String: the formatted date
// ===================================================
Template.registerHelper('humanReadableDate', function(dateData) {

    // console.log(dateData);

    // If date has been provided
    if (dateData && dateData.hash && dateData.hash.date) {

        // Get date from arguments
        let date = dateData.hash.date

        // If date value is string, cast it into Date
        if ($.type(date) === "string") {
            date = new Date(dateData.hash.date);
        }

        // Return false if date isn't valid
        if (!isValid(date)) {
            return false;
        }

        // Format example: Dec 31st '18
        if (dateData.hash.format === 'short') {
            return format(date, "MMM do ''yy");
        }

        // Format example: Dec 31st
        if (dateData.hash.format === 'shorter') {
            return format(date, "MMM do");
        }

        // Format example: December 31, 2018
        if (dateData.hash.format === 'long') {
            return format(date, 'MMMM do, yyyy');
        }

        // Format example: December 31st 2018 - 9:12AM
        if (dateData.hash.format === 'timestamp') {
            return format(date, "MMMM do yyyy @ h:mma");
        }

        // Format example: 9:12AM
        if (dateData.hash.format === 'time') {
            return format(date, 'h:mma');
        }

        // Custom format
        if (dateData.hash.format) {
            return format(date, dateData.hash.format);
        }

        // If no formation was provided
        // Format example: December 31st 2018
        return format(date , 'MMMM do, yyyy');

    }

    // Return empty string when no date is provided.
    return '';

});

// ===================================================
// HELPER: cardinality
// Takes a 0-index value and returns cardinality (adds 1)
// @return Number zero-index value plus 1
// ===================================================
UI.registerHelper('cardinality', function(index) {

    return index + 1;

});

// ===================================================
// HELPER: toCurrency
// Converts number into float with 2 decimals
// @arg mixed the number
// @return String the value with 2 decimals
// ===================================================
UI.registerHelper('toCurrency', function(num) {

    return parseFloat(num).toFixed(2).toString();

});

// ===================================================
// HELPER: formatNumber
// Returns a string with a language-sensitive representation of this number.
// @arg mixed the number
// @return String the value, or 0 if no value was provided
// ===================================================
UI.registerHelper('formatNumber', function(numberData) {

    if (numberData?.hash?.num) {
        return parseFloat(numberData.hash.num).toLocaleString();
    }

    return "0";

});

// ===================================================
// HELPER: substring
// Truncate a string
// @arg Object: { string, maxLength }
// @return String: The truncated string
// ===================================================
UI.registerHelper('substr', function(data) {

    // The string to truncate
    const text = data.hash.string;

    // Maximum number of characters to extract
    const maxLength = data.hash.maxLength;

    // Trim the string to the maximum length
    const trimmedString = text.substr(0, maxLength);

    return trimmedString;

});

// ===================================================
// HELPER: truncate
// Truncate a string
// @arg Object: { string, maxLength }
// @return String: The truncated string
// ===================================================
UI.registerHelper('truncate', function(data) {

    // The string to truncate
    const text = data.hash.string;

    // Maximum number of characters to extract
    const maxLength = data.hash.maxLength || 70;

    // Prep var for truncated string
    let trimmedString = '';

    // If string to truncate is provided
    if (text && text !== '') {

        // Trim the string to the maximum length
        trimmedString = text.substr(0, maxLength);

        // If trimming actually happened, we may have truncated the string in the middle of a word
        // We don't want that because it looks stupid
        if (trimmedString.length < text.length) {

            // Re-trim if we are in the middle of a word
            trimmedString = text.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));

            // And add an ellipsis (or whatever 3 dots is called -- why don't we just call it 3-dots?)
            trimmedString += ' ...';

        }

    }

    return trimmedString;

});