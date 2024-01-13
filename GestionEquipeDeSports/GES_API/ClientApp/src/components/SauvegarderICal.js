import { saveAs } from 'file-saver';
import React from "react";

export function SauvegarderICal(event) {

    //informations de base tirées de ces sources
    // https://datatracker.ietf.org/doc/html/rfc5545
    // https://icalendar.org/Home.html

    var evenements;
    evenements = 'BEGIN:VCALENDAR\r\n';
    evenements = evenements + 'PRODID:-GestionEquipeSportive v1.0\r\n';
    evenements = evenements + 'VERSION:2.0\r\n';
    evenements = evenements + 'CALSCALE:GREGORIAN\r\n';
    evenements = evenements + 'METHOD:PUBLISH\r\n';
    // var UID = 0;

    var dateTime = new Date();
    var isoDate = dateTime.toISOString();
    var dateTimeSansSymbols = retireSymbolsDesDate(isoDate);
    var dateTimeStamp = dateTimeSansSymbols.substring(0, 15);

    event.forEach(element => {
        evenements = evenements + 'BEGIN:VEVENT\r\n';
        // UID++;
        evenements = evenements + 'DTSTAMP:' + dateTimeStamp + 'Z\r\n';
        evenements = evenements + 'DTSTART:' + retireSymbolsDesDate(element.dateDebut) + '\r\n';
        evenements = evenements + 'DTEND:' + retireSymbolsDesDate(element.dateFin) + '\r\n';
        evenements = evenements + 'UID:' + element.id + '@gestionequipesportive.ca\r\n';
        evenements = evenements + 'SUMMARY:' + element.description + '\r\n';
        evenements = evenements + 'LOCATION:' + element.emplacement + '\r\n';
        evenements = evenements + 'URL:' + element.url + '\r\n';
        evenements = evenements + 'DESCRIPTION:' + element.url + '\r\n';
        evenements = evenements + 'END:VEVENT\r\n';
    });
    evenements = evenements + 'END:VCALENDAR\r\n';

    console.log(evenements);

    const blob = new Blob([evenements], { type: "text/plain;charset=utf-8" });
    console.log(blob);
    saveAs(blob, "event-schedule.ics");

    function retireSymbolsDesDate(dateAcorriger) {
        var data = dateAcorriger.replace(/[-:]/g, '');
        return data;
    }

    return (
        <></>
    );
}
