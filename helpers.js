import { Template } from 'meteor/templating';
import { format, isValid } from 'date-fns';
import { Router } from 'meteor/meteorhubdotnet:firestorm-iron-router';

// ===================================================
// HELPER: eq
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
// @arg Mixed: value1
// @arg Mixed: value2
// @return Boolean: whether either value is present
// ===================================================
UI.registerHelper('or', function(value1, value2) {
    // do it
    return value1 || value2;
});

// ===================================================
// HELPER: greater than or equal
// @arg Mixed: value1
// @arg Mixed: value2
// @return Boolean: whether value1 is gte value2
// ===================================================
UI.registerHelper('gte', function(value1, value2) {
    // do it
    return value1 >= value2;
});

// ===================================================
// HELPER: greater than
// Checks for presence of either value
// @arg Mixed: value1
// @arg Mixed: value2
// @return Boolean: whether value1 is gt value2
// ===================================================
UI.registerHelper('gt', function(value1, value2) {
    // do it
    return value1 > value2;
});

// ===================================================
// HELPER: lesser than or equal
// @arg Mixed: value1
// @arg Mixed: value2
// @return Boolean: whether value1 is lte value2
// ===================================================
UI.registerHelper('lte', function(value1, value2) {
    // do it
    return value1 <= value2;
});

// ===================================================
// HELPER: Percentage
// Get a percentage integer from 2 values
// @arg Mixed: value1
// @arg Mixed: value2
// @return Number: percentage
// ===================================================
UI.registerHelper('percentage', function(numbers) {
    if (numbers?.hash?.numerator && numbers?.hash?.numerator) {
        return Math.ceil(numbers.hash.numerator / numbers.hash.denominator * 100);
    }
    return 0;
});

// ===================================================
// HELPER: lesser than
// @arg Mixed: value1
// @arg Mixed: value2
// @return Boolean: whether value1 is lt value2
// ===================================================
UI.registerHelper('lt', function(value1, value2) {
    // do it
    return value1 < value2;
});

// ===================================================
// HELPER: inc
// Checks if value2 is in value1
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
// Takes a Date object or a date string in yyyy-MM-DD format and formats it to make sense to humans
// @args date: js Date object or date string in yyyy-MM-DD format
// @args format: string, optional, can be a preset like 'short', 'timestamp', etc, or a date format string - defaults to 'MMMM do, yyyy'
// @return String: the formatted date
// ===================================================
Template.registerHelper('humanReadableDate', function(dateData) {

    // If date has been provided
    if (dateData && dateData.hash && dateData.hash.date) {

        // Get date from arguments
        let date = dateData.hash.date

        // If date value is string, cast it into Date
        if ($.type(date) === "string") {
            // Using .split('-') forces new Date to be created with
            // GMT timezone and doesn't mess with calendar day
            date = new Date(dateData.hash.date.split('-'));
        }

        // Return false if date isn't valid
        if (!isValid(date)) {
            return false;
        }

        // If format="short" was provided
        if (dateData.hash.format === 'sql') {

            // Format example: Dec 31st '18
            return format(date, 'YYYY-MM-DD');

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

        // Format example: January 1st 2018 @ 9:12AM
        if (dateData.hash.format === 'timestamp') {
            return format(date, "MMMM do yyyy @ h:mma");
        }

        // If format="timestamp" was provided
        if (dateData.hash.format === 'datatimestamp') {

            // Format example: 2023-12-31 @ 9:12AM
            return format(date, 'YYYY-MM-DD @ HH:mm');

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
        // Format example: December 31st, 2018
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
// HELPER: cardinalityString
// Takes a 0-index value and returns cardinality (adds 1) with the counting suffix (st, nd, rd, th);
// @return Number zero-index value plus 1
// ===================================================
UI.registerHelper('cardinalityString', function(index) {
    const cardinality = index + 1;
    const cardinalityString = cardinality.toString();
    const cardinalityStringLastNumber = cardinalityString.slice(-1);
    const cardinalityStringLastTwoNumbers = cardinalityString.slice(-2);
    let suffix = 'th';
    if (cardinalityStringLastNumber === '1') {
        suffix = 'st';
        if (cardinalityStringLastTwoNumbers === '11') {
            suffix = 'th';
        }
    } else if (cardinalityStringLastNumber === '2') {
        suffix = 'nd';
        if (cardinalityStringLastTwoNumbers === '12') {
            suffix = 'th';
        }
    } else if (cardinalityStringLastNumber === '3') {
        suffix = 'rd';
        if (cardinalityStringLastTwoNumbers === '13') {
            suffix = 'th';
        }
    }
    return cardinality + suffix;
});

// ===================================================
// HELPER: toCurrency
// Converts number into float with 2 decimals
// @arg mixed the number
// @return String the value with 2 decimals
// ===================================================
UI.registerHelper('toCurrency', function(num) {

    return parseFloat(num).toFixed(2).toLocaleString('en-US');

});

// ===================================================
// HELPER: toDollarsCurrency
// Converts number into float with 2 decimals and adds a leading $
// @arg mixed the number
// @return String the value with 2 decimals and a leading $
// ===================================================
UI.registerHelper('toDollarsCurrency', function(num) {
    return '$' + parseFloat(num).toFixed(2).toLocaleString('en-US');
});

// ===================================================
// HELPER: formatNumber
// Returns a string with a language-sensitive representation of this number.
// @arg num: the number
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

UI.registerHelper('toUppercase', function(string) {
    return string.toUpperCase();

});

UI.registerHelper('toLowercase', function(string) {

    return string.toLowerCase();

});

// ===================================================
// HELPER: inc
// Checks inf value2 is in value1
// @arg Mixed: value1
// @arg Mixed: value2
// @return Boolean whether value2 is in value1
// ===================================================
UI.registerHelper('inc', function(value1, value2) {

    // Do it
    return value1?.includes(value2);

});

/**
 * HELPER: isNumber
 *
 * Checks if value is a number
 *
 * @param: Mixed : value to check
 * @returns : Boolean
 */
UI.registerHelper('isNumber', function( number ){
    return !isNaN(number);
});

UI.registerHelper('dump', function( data ){
    return "DUMP\n==================\n" + JSON.stringify(data,null,'\t');
});

UI.registerHelper('centsToDollars', function(cents) {

    return parseFloat(cents/100).toFixed(2);

});

UI.registerHelper('centsToDollarsCurrency', function( n ){
    return '$' + (parseFloat(n)/100).toFixed(2);
});

UI.registerHelper('stringifyId', function(id){
    return id && typeOf(id) == "String" ? id : id._str;
})

//Text Area to HTML Helper
UI.registerHelper('textareaToHTML', function( content ) {
    return Spacebars.SafeString( content.replace(/\n/g, '<br><br>') );
});

UI.registerHelper('isZero',function( n ){
    return parseInt(n) == 0 ? true : false;
});
