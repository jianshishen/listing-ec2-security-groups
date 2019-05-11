# Steps

1. Create a Node.js ES6 module to list all EC2 security groups in an AWS Account.
2. Use this module in an AWS Lambda function.
3. Make the Lambda function available via an AWS API Gateway endpoint.
4. Make response [JSON:API 1.0](https://jsonapi.org/format/1.0/) compatible.
5. Wrap the Lambda, API Gateway endpoint, and utility module in a Serverless application. [More info](https://serverless.com/framework/docs/providers/aws/events/apigateway#configuring-endpoint-types)

# Sample Output

Below is a snippet of the response. These security groups are extracted from my own AWS account.

```
{
  "data": [
    {
      "type": "region",
      "id": "eu-north-1",
      "relationships": {
        "SG": {
          "data": [
            {
              "id": "sg-f493709c",
              "type": "SG"
            }
          ]
        }
      }
    },
    {
      "type": "region",
      "id": "ap-south-1",
      "relationships": {
        "SG": {
          "data": [
            {
              "id": "sg-d3de94bf",
              "type": "SG"
            }
          ]
        }
      }
    }
  ],
  "included": [
    {
      "type": "SG",
      "id": "sg-f493709c",
      "attributes": {
        "Description": "default VPC security group",
        "GroupName": "default",
        "IpPermissions": [
          {
            "IpProtocol": "-1",
            "IpRanges": [],
            "Ipv6Ranges": [],
            "PrefixListIds": [],
            "UserIdGroupPairs": [
              {
                "GroupId": "sg-f493709c",
                "UserId": "700383218274"
              }
            ]
          }
        ],
        "OwnerId": "700383218274",
        "GroupId": "sg-f493709c",
        "IpPermissionsEgress": [
          {
            "IpProtocol": "-1",
            "IpRanges": [
              {
                "CidrIp": "0.0.0.0/0"
              }
            ],
            "Ipv6Ranges": [],
            "PrefixListIds": [],
            "UserIdGroupPairs": []
          }
        ],
        "Tags": [],
        "VpcId": "vpc-fdaa5094"
      }
    },
    {
      "type": "SG",
      "id": "sg-d3de94bf",
      "attributes": {
        "Description": "default VPC security group",
        "GroupName": "default",
        "IpPermissions": [
          {
            "IpProtocol": "-1",
            "IpRanges": [],
            "Ipv6Ranges": [],
            "PrefixListIds": [],
            "UserIdGroupPairs": [
              {
                "GroupId": "sg-d3de94bf",
                "UserId": "700383218274"
              }
            ]
          }
        ],
        "OwnerId": "700383218274",
        "GroupId": "sg-d3de94bf",
        "IpPermissionsEgress": [
          {
            "IpProtocol": "-1",
            "IpRanges": [
              {
                "CidrIp": "0.0.0.0/0"
              }
            ],
            "Ipv6Ranges": [],
            "PrefixListIds": [],
            "UserIdGroupPairs": []
          }
        ],
        "Tags": [],
        "VpcId": "vpc-b15364d9"
      }
    }
  ]
}
```
