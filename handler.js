/*
Author: Jianshi Shen
The following handler will return a response 
including all security groups in an AWS account in the form of JSON:API 1.0.
*/
const utils = require("./libs/utils");

module.exports.list = async event => {
  try {
    // Retrieve all regions that work with EC2
    let regions = await utils.getRegions();
    let groupsInAllRegions = await utils.getGroupsInAllRegions(regions);
    // Make the response JSON:API 1.0 compatible
    let body = { data: [], included: [] };
    // Push groups in each region to response body
    groupsInAllRegions.forEach(groupsInOneRegion => {
      let temp = {
        type: "region",
        id: groupsInOneRegion.region,
        relationships: { SG: { data: [] } }
      };

      groupsInOneRegion.groups.forEach(group => {
        // Push each group id to the temporary array
        temp.relationships.SG.data.push({
          id: group.GroupId,
          type: "SG"
        });
        // Push attributes of each group to response body
        body.included.push({
          type: "SG",
          id: group.GroupId,
          attributes: group
        });
      });
      // Push info of a region to response body
      body.data.push(temp);
    });
    let response = {
      statusCode: 200,
      body: JSON.stringify(body)
    };
    return response;
  } catch (err) {
    let response = {
      statusCode: 400,
      body: JSON.stringify(err.message)
    };
    return response;
  }
};
