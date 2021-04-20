import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as route53 from '@aws-cdk/aws-route53';

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Lookup the zone based on domain name
    const zone = route53.HostedZone.fromLookup(this, 'baseZone', {
      domainName: 'odinandbrokk.com',
    });

    const bucket = new s3.Bucket(this, 'BrokkAndOdinBucket', {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
    });

    // Deployment
    const src = new s3Deploy.BucketDeployment(this, 'DeployBandO', {
      sources: [s3Deploy.Source.asset('../build')],
      destinationBucket: bucket,
    });

    // Cloudfront
    const cf = new cloudfront.CloudFrontWebDistribution(this, 'BandODistro', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });

    const cName = new route53.CnameRecord(this, 'BAndORecord', {
      zone: zone,
      recordName: 'alpha',
      domainName: bucket.bucketWebsiteDomainName,
    });
  }
}
