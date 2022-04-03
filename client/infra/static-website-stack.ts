import { SecurityPolicyProtocol } from '@aws-cdk/aws-cloudfront';
import { StringParameter } from '@aws-cdk/aws-ssm';
import { Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';
import { StaticWebsite } from '@cloudcomponents/cdk-static-website';

export class StaticWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const certificateArn = StringParameter.valueFromLookup(this, '/certificate/e-commerce.org');

    new StaticWebsite(this, 'StaticWebsite', {
      bucketConfiguration: {
        source: '../app/dist',
        removalPolicy: RemovalPolicy.DESTROY,
      },
      aliasConfiguration: {
        domainName: 'e-commerce.org',
        names: ['www.e-commerce.org', 'e-commerce.org'],
        acmCertRef: certificateArn,
        securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2018,
      },
    });
  }
}