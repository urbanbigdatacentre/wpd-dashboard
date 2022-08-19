// File used to control language format across D3 charts
import * as d3 from "d3";

const localePT = d3.timeFormatLocale({
    dateTime: "%A, %e %B %Y г. %X",
    date: "%d.%m.%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
    shortDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    shortMonths: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
});

const localeEN = d3.timeFormatLocale({
    dateTime: "%x, %X",
    date: "%-m/%-d/%Y",
    time: "%-I:%M:%S %p",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

const dateFormatsPT = {
    formatMillisecond: localePT.format(".%L"),
    formatSecond: localePT.format(":%S"),
    formatMinute: localePT.format("%I:%M"),
    formatHour: localePT.format("%I %p"),
    formatDay: localePT.format("%a %d"),
    formatWeek: localePT.format("%b %d"),
    formatMonth: localePT.format("%B"),
    formatYear: localePT.format("%Y")
}

const dateFormatsEN = {
    formatMillisecond: localeEN.format(".%L"),
    formatSecond: localeEN.format(":%S"),
    formatMinute: localeEN.format("%I:%M"),
    formatHour: localeEN.format("%I %p"),
    formatDay: localeEN.format("%a %d"),
    formatWeek: localeEN.format("%b %d"),
    formatMonth: localeEN.format("%B"),
    formatYear: localeEN.format("%Y")
}

export function multiFormat(date, language) {

    if (language === "en") {
        return (d3.timeSecond(date) < date ? dateFormatsEN.formatMillisecond
            : d3.timeMinute(date) < date ? dateFormatsEN.formatSecond
            : d3.timeHour(date) < date ? dateFormatsEN.formatMinute
            : d3.timeDay(date) < date ? dateFormatsEN.formatHour
            : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? dateFormatsEN.formatDay : dateFormatsEN.formatWeek)
            : d3.timeYear(date) < date ? dateFormatsEN.formatMonth
            : dateFormatsEN.formatYear)(date);
    } else if (language === 'br') {
        return (d3.timeSecond(date) < date ? dateFormatsPT.formatMillisecond
            : d3.timeMinute(date) < date ? dateFormatsPT.formatSecond
            : d3.timeHour(date) < date ? dateFormatsPT.formatMinute
            : d3.timeDay(date) < date ? dateFormatsPT.formatHour
            : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? dateFormatsPT.formatDay : dateFormatsPT.formatWeek)
            : d3.timeYear(date) < date ? dateFormatsPT.formatMonth
            : dateFormatsPT.formatYear)(date);
    }
}