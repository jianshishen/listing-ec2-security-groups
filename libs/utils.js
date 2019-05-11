const AWS = require("aws-sdk");
const ec2 = new AWS.EC2({ apiVersion: "2016-11-15", region: "us-east-1" });
class utils {
  // Retrieve all regions that work with EC2
  getRegions() {
    return new Promise((resolve, reject) => {
      ec2.describeRegions(null, function(err, data) {
        var regions = [];
        if (err) {
          reject(err);
        } else {
          for (let i = 0; i < data.Regions.length; i++) {
            regions.push(data.Regions[i].RegionName);
          }
          resolve(regions);
        }
      });
    });
  }

  // Retrieve security group descriptions in the given region
  getGroups(region) {
    const regionEC2 = new AWS.EC2({ apiVersion: "2016-11-15", region });
    return new Promise((resolve, reject) => {
      regionEC2.describeSecurityGroups(null, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data.SecurityGroups);
        }
      });
    });
  }
}
module.exports = new utils();
