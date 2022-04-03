#!/bin/bash

ACTION=$1
STACK="harrison-project-eks-node-group"
TEMPLATE="eks-nodegroup.yaml"
PARAMS="parameters.json"

./run.sh $ACTION $STACK $TEMPLATE $PARAMS