/*
Author: Jianshi Shen
The following handler will return a response 
including all security groups in an AWS account in the form of JSON:API 1.0.
*/
const utils = require("./libs/utils");

module.exports.list = async (event, context, callback) => {
  // Make the response JSON:API 1.0 compatible
  let body = { data: [], included: [] };

  try {
    // Retrieve all regions that work with EC2
    let regions = await utils.getRegions();
    for (let i = 0; i < regions.length; i++) {
      let temp = {
        type: "region",
        id: regions[i],
        relationships: { SG: { data: [] } }
      };
      // Retrieve all security group descriptions in each region
      let groups = await utils.getGroups(regions[i]);
      // Push each group into array
      groups.forEach(group => {
        temp.relationships.SG.data.push({ id: group.GroupId, type: "SG" });
        body.included.push({
          type: "SG",
          id: group.GroupId,
          attributes: group
        });
      });
      body.data.push(temp);
    }
    let response = {
      statusCode: 200,
      body: JSON.stringify(body)
    };
    callback(null, response);
  } catch (err) {
    let response = {
      statusCode: 400,
      body: JSON.stringify(err.message)
    };
    callback(null, response);
  }
};
