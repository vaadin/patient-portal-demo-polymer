#!/usr/bin/env bash

sed -i "s@setTheUrl@$apiUrl@g" build/bundled/src/patient-portal.html
nginx