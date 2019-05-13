/*
Author: Jianshi Shen
The following class will be used by handler.js 
to retrieve security groups from AWS.
*/
const AWS = require("aws-sdk");
const ec2 = new AWS.EC2({ apiVersion: "2016-11-15", region: "us-east-1" });
class utils {
  /**
   * Retrieve all regions that work with EC2
   * @returns Promise
   */
  getRegions() {
    return ec2
      .describeRegions()
      .promise()
      .then(data => {
        let regions = [];
        for (let i = 0; i < data.Regions.length; i++) {
          regions.push(data.Regions[i].RegionName);
        }
        return regions;
      });
  }

  /**
   * Retrieve security group descriptions in the given region
   * @returns Promise
   */
  getGroupsByRegion(region) {
    return new AWS.EC2({ apiVersion: "2016-11-15", region })
      .describeSecurityGroups()
      .promise()
      .then(data => {
        return { region, groups: data.SecurityGroups };
      });
  }

  /**
   * Retrieve security group descriptions in all regions
   * @returns Promise
   */
  getGroupsInAllRegions(regions) {
    let regionsRequests = [];
    regions.forEach(region =>
      regionsRequests.push(this.getGroupsByRegion(region))
    );
    return Promise.all(regionsRequests);
  }
}
module.exports = new utils();
