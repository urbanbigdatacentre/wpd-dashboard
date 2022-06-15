// File used to store different functions that filter data


import * as d3 from "d3";

export const filterPluviometerData = (inputDataArray, toggleDate) => {

    if (!inputDataArray.length) {return {}}

    const filteredDataObject = {
        ...inputDataArray[0]
    }

    let temporaryArray = [];

    inputDataArray[0]['pluviometerData'].forEach(function(item) {
        let validPluviometerRecords = item.records.filter(function(record) {
            return (new Date(d3.timeFormat("%B %d, %Y")(toggleDate.startDate)) < new Date(record.timestamp)) && (new Date(d3.timeFormat("%B %d, %Y")(toggleDate.endDate)) > new Date(record.timestamp))
        })
        if(validPluviometerRecords.length) {temporaryArray.push({...item, "records": validPluviometerRecords})}
    })

    filteredDataObject['pluviometerData'] = temporaryArray
    return filteredDataObject;
}

export const filterCitizenEventDataByDate = (inputDataArray, dataType, toggleDate) => {

    // console.log(inputDataArray)

    if (!inputDataArray.length) {return {}}

    const filteredDataObject = {
        ...inputDataArray[0]
    }

    let temporaryArray = [];

    filteredDataObject[dataType].forEach(function(item) {

        if (new Date(d3.timeFormat("%B %d, %Y")(toggleDate.startDate)) < new Date(item.submissiontimestamp) && (new Date(d3.timeFormat("%B %d, %Y")(toggleDate.endDate)) > new Date(item.submissiontimestamp))) {
            temporaryArray.push(item)
        }
    })

    filteredDataObject[dataType] = temporaryArray;

    return filteredDataObject
}