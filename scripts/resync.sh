#!/bin/bash

rm data/database
python manage.py syncdb
python manage.py loaddata app/fixtures/basic_data.json
python manage.py loaddata app/fixtures/organizations.json
