import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "BrokkAndOdinBucket", {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html"
    });

    // Deployment
    const src = new s3Deploy.BucketDeployment(this, "DeployBandO", {
      sources: [s3Deploy.Source.asset("../build")],
      destinationBucket: bucket
    });

    // Cloudfront
    const cf = new cloudfront.CloudFrontWebDistribution(this, "BandODistro", {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket
          },
          behaviors: [{isDefaultBehavior: true}]
        },
      ]
    });
  }
}
