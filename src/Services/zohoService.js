export const getZohoQueryParams = async () => {
  await window.ZOHO.CREATOR.init();
  const queryParams = await window.ZOHO.CREATOR.UTIL.getQueryParams();
  return queryParams;
};

export const getZohoRecord = async (reportName, id) => {
  const recordConfig = {
    reportName: reportName,
    id: id,
  };
  try {
    const response = await window.ZOHO.CREATOR.API.getRecordById(recordConfig);
    console.log(response);
    const record = response.data;
    return record;
  } catch (error) {
    throw new Error(
      `Could not fetch Record. Contact administrator for assistance. ERROR: ${error.responseText}`
    );
  }
};

export const getZohoRecords = async (reportName, criteria) => {
  try {
    const config = {
      reportName: reportName,
      criteria: criteria,
      page: 1,
      pageSize: 150,
    };
    const records = await window.ZOHO.CREATOR.API.getAllRecords(config);
    console.log(records);
    return records.data;
  } catch (error) {
    if (JSON.parse(error.responseText).code === 3100) {
      return [];
    }
    throw new Error(
      `Could not fetch records from ${reportName} with criteria ${criteria}. ERROR: ${error.responseText}`
    );
  }
};

export const updateZohoRecord = async (reportName, id, data) => {
  try {
    const config = {
      reportName: reportName,
      id: id,
      data: {
        data: data,
      },
    };
    const response = await window.ZOHO.CREATOR.API.updateRecord(config);
    if (response.code === 3000) {
      const vial = await window.ZOHO.CREATOR.API.getRecordById({
        reportName,
        id,
      });
      return vial.data;
    }
  } catch (error) {
    throw new Error(
      `Could not update record in the report ${reportName} with id of ${id}. ERROR: ${error.responseText}`
    );
  }
};
