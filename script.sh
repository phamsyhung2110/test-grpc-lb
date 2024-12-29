#! /bin/bash

kubectl apply -f deploy/* -n grpc
sleep 3
kubectl cp ./k6/*  k6-load-test:/home/k6 -n grpc